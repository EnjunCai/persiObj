<template>
  <div class="wrapper" v-loading="loading">
    <MdPreview v-if="content" :editorId="ID" :modelValue="content" />
    <div v-else-if="!loading" class="empty-tip">未找到该笔记或内容为空</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { supabase } from "@/lib/supabase"; // 引入 Supabase 客户端

const route = useRoute();
const ID = "preview-" + route.params.id;

const content = ref("");
const loading = ref(false);

onMounted(async () => {
  const id = route.params.id;
  if (!id) return;

  loading.value = true;
  try {
    // 1. 根据 ID 查询数据库
    const { data, error } = await supabase
      .from("notes")
      .select("detail") // 我们只需要 detail 字段
      .eq("id", id)
      .single(); // single() 表示期望只返回一条数据

    if (error) throw error;

    if (data && data.detail) {
      // 2. 还原 Markdown 字符串
      // 你的 detail 存的是 tokens 数组，需要把它还原成 raw string
      // 注意：数据库取出的 jsonb 已经是对象/数组了，直接用
      const rawMarkdown = Array.isArray(data.detail)
        ? data.detail.reduce(
            (acc: string, cur: any) => acc + (cur.raw || ""),
            ""
          )
        : "";

      content.value = rawMarkdown;
    }
  } catch (err) {
    console.error("获取笔记详情失败:", err);
    content.value = "> 获取内容失败，请检查网络或 ID 是否正确";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.wrapper {
  padding: 30px;
  min-height: 50vh; // 给个最小高度，配合 loading 看起来舒服点
}

.empty-tip {
  text-align: center;
  color: #999;
  margin-top: 50px;
}

@media (max-width: 450px) {
  .wrapper {
    padding: 10px; // 移动端稍微给点内边距更好看
  }
}
</style>