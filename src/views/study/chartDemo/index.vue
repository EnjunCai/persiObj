<template>
  <div class="chat-container">
    <header class="chat-header">
      <h1>AI 智能助手 (Stream模式)</h1>
      <span class="status-dot" :class="{ processing: isThinking }"></span>
    </header>

    <div class="messages-area" ref="messagesContainer">
      <div v-if="messages.length === 0" class="empty-state">
        👋 你好！我是你的 AI 助手，请问有什么可以帮你的？
      </div>

      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="message-row"
        :class="msg.role"
      >
        <div class="avatar">{{ msg.role === "user" ? "🧑‍💻" : "🤖" }}</div>
        <div class="bubble">
          <div
            v-if="msg.content === '' && msg.role === 'assistant'"
            class="typing-indicator"
          >
            <span></span><span></span><span></span>
          </div>
          <div
            v-else
            class="markdown-body"
            v-html="renderMarkdown(msg.content)"
          ></div>
        </div>
      </div>
    </div>

    <div class="input-area">
      <div class="input-wrapper">
        <textarea
          v-model="inputMessage"
          @keydown.enter.prevent="sendMessage"
          placeholder="输入问题，Enter 发送..."
          :disabled="isThinking"
        ></textarea>
        <button
          @click="sendMessage"
          :disabled="!inputMessage.trim() || isThinking"
        >
          {{ isThinking ? "生成中..." : "发送" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import MarkdownIt from "markdown-it";

// ================= 配置区域 =================

// 1. 设置为 true：使用模拟数据（无需 Key，直接看效果）
// 2. 设置为 false：使用真实 API（需要填写下面的 Key）
const USE_MOCK = true;

// 3. 如果 USE_MOCK = false，请在这里填入你的 DeepSeek 或 OpenAI Key
// 申请地址：https://platform.deepseek.com/
const API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxx";
const API_URL = "https://api.deepseek.com/chat/completions"; // DeepSeek 接口地址

// ===========================================

const md = new MarkdownIt();
const messages = ref([]);
const inputMessage = ref("");
const isThinking = ref(false);
const messagesContainer = ref(null);

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 渲染 Markdown
const renderMarkdown = (text) => {
  return md.render(text);
};

// 发送消息核心逻辑
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isThinking.value) return;

  const userText = inputMessage.value.trim();
  inputMessage.value = "";

  // 1. 添加用户消息
  messages.value.push({ role: "user", content: userText });
  await scrollToBottom();

  // 2. 添加一个空的 AI 消息占位 (用于流式追加)
  isThinking.value = true;
  messages.value.push({ role: "assistant", content: "" });
  const currentAiMsgIndex = messages.value.length - 1;

  try {
    if (USE_MOCK) {
      await mockStreamResponse(currentAiMsgIndex);
    } else {
      await fetchRealAI(userText, currentAiMsgIndex);
    }
  } catch (error) {
    messages.value[currentAiMsgIndex].content = `**出错啦**：${error.message}`;
  } finally {
    isThinking.value = false;
  }
};

// ==================== 方案 A: 模拟流式 (无需 Key) ====================
const mockStreamResponse = async (index) => {
  const mockText = `这是一个**模拟的流式响应**。正在模拟打字机效果。\n\n下面是一段代码示例：\n\`\`\`javascript\nconsole.log("Hello World");\n\`\`\``;

  const chars = mockText.split("");

  for (let char of chars) {
    // 模拟网络延迟
    await new Promise((r) => setTimeout(r, 30));
    messages.value[index].content += char;
    scrollToBottom();
  }
};

// ==================== 方案 B: 真实 AI 接口 (标准 SSE) ====================
const fetchRealAI = async (prompt, index) => {
  const history = messages.value.slice(0, -1).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat", // DeepSeek 模型名称
      messages: history,
      stream: true, // 核心：开启流式
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }

  // 获取 Reader
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    // 数据格式通常是: data: {...} \n\n data: {...}
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const jsonStr = line.replace("data: ", "");
        if (jsonStr.trim() === "[DONE]") break;

        try {
          const data = JSON.parse(jsonStr);
          // OpenAI 标准格式获取 content
          const content = data.choices[0]?.delta?.content || "";
          if (content) {
            messages.value[index].content += content;
            scrollToBottom(); // 实时滚动
          }
        } catch (e) {
          // 忽略解析错误
        }
      }
    }
  }
};
</script>

<style scoped>
/* 简单的样式美化 */
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  height: 90vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

.chat-header {
  padding: 15px 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px 12px 0 0;
}

.chat-header h1 {
  font-size: 18px;
  margin: 0;
  color: #333;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  transition: background 0.3s;
}

.status-dot.processing {
  background: #00b894;
  box-shadow: 0 0 8px #00b894;
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.empty-state {
  text-align: center;
  color: #999;
  margin-top: 50px;
}

.message-row {
  display: flex;
  gap: 12px;
  max-width: 85%;
}

.message-row.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.avatar {
  width: 36px;
  height: 36px;
  background: #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.message-row.user .avatar {
  background: #d1ecf1;
}

.message-row.assistant .avatar {
  background: #fff;
  border: 1px solid #eee;
}

.bubble {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.6;
  position: relative;
  word-wrap: break-word;
}

.message-row.user .bubble {
  background: #007aff;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-row.assistant .bubble {
  background: #fff;
  color: #333;
  border: 1px solid #eee;
  border-bottom-left-radius: 4px;
}

/* 输入框区域 */
.input-area {
  padding: 20px;
  background: #fff;
  border-top: 1px solid #eee;
  border-radius: 0 0 12px 12px;
}

.input-wrapper {
  display: flex;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
}

textarea {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  height: 40px;
  font-family: inherit;
  padding: 8px 0;
}

button {
  padding: 0 20px;
  border: none;
  background: #007aff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 打字中动画 */
.typing-indicator span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #999;
  border-radius: 50%;
  margin: 0 2px;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}
.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Markdown 样式微调 */
:deep(.markdown-body p) {
  margin-bottom: 0.5em;
}
:deep(.markdown-body p:last-child) {
  margin-bottom: 0;
}
:deep(.markdown-body pre) {
  background: #f4f4f4;
  padding: 10px;
  border-radius: 6px;
  overflow-x: auto;
}
</style>
