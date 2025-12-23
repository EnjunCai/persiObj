<template>
  <div class="waterfall-wrapper">
    <div class="header">
      <h2>Vue3 瀑布流 + 滚动加载</h2>
      <p>当前数据量: {{ list.length }}</p>
    </div>

    <div
      class="waterfall-container"
      ref="containerRef"
      :style="{ height: containerHeight + 'px' }"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="waterfall-item"
        :style="{
          top: item.top + 'px',
          left: item.left + 'px',
          width: itemWidth + 'px',
          opacity: item.top !== undefined ? 1 : 0,
        }"
      >
        <div class="card-content">
          <img :src="item.img" alt="" @load="handleImgLoad" />
          <div class="info">
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="loading-sentinel" ref="sentinelRef">
      <div v-if="isLoading" class="loading-text">
        <span class="spinner">↻</span> 正在加载更多...
      </div>
      <div v-if="isFinished" class="finished-text">--- 我是有底线的 ---</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";

// --- 配置参数 ---
const gap = 20;
const itemWidth = 230;

// --- 状态数据 ---
const containerRef = ref(null);
const sentinelRef = ref(null); // 哨兵元素的引用
const containerHeight = ref(0);
const list = ref([]);
const isLoading = ref(false); // 是否正在请求中（防抖锁）
const isFinished = ref(false); // 是否所有数据加载完毕

let columnHeights = [];
let observer = null; // 观察者实例

// --- 模拟异步数据请求 ---
const fetchData = async (count = 10) => {
  // 模拟网络延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      const newData = [];
      for (let i = 0; i < count; i++) {
        const id = Date.now() + i + Math.random();
        const height = Math.floor(Math.random() * (400 - 200) + 200);
        newData.push({
          id,
          img: `https://picsum.photos/${itemWidth}/${height}?random=${id}`,
          title: `笔记 ${Math.floor(id % 1000)}`,
          desc: `高度 ${height}px`,
          top: undefined,
          left: undefined,
        });
      }
      resolve(newData);
    }, 500); // 延迟 500ms
  });
};

// --- 核心算法：布局计算 (保持不变) ---
const layout = () => {
  if (!containerRef.value) return;
  const containerWidth = containerRef.value.clientWidth;
  const columnCount = Math.floor(containerWidth / (itemWidth + gap));
  if (columnCount === 0) return;

  // 这里为了简单，每次都重算。生产环境如果是追加数据，应该只计算新追加的部分。
  columnHeights = new Array(columnCount).fill(0);

  list.value.forEach((item) => {
    const minHeight = Math.min(...columnHeights);
    const minIndex = columnHeights.indexOf(minHeight);
    item.left = minIndex * (itemWidth + gap);
    item.top = minHeight;

    // 简单预估高度：图片高度 + 底部文字高度(80)
    // 实际项目中建议后端返回宽高，或者等图片加载完获取 dom.clientHeight
    const imgH = parseInt(item.img.split("/").pop().split("?")[0]);
    columnHeights[minIndex] += imgH + 80 + gap;
  });

  containerHeight.value = Math.max(...columnHeights);
};

// --- 加载更多逻辑 ---
const loadMore = async () => {
  // 1. 如果正在加载或已结束，直接退出
  if (isLoading.value || isFinished.value) return;

  // 2. 上锁
  isLoading.value = true;

  try {
    // 3. 请求数据
    const newItems = await fetchData(10);

    // 模拟数据耗尽的情况 (比如总共只给 50 条)
    if (list.value.length > 50) {
      isFinished.value = true;
      return;
    }

    // 4. 追加数据
    list.value = [...list.value, ...newItems];

    // 5. 等待 DOM 更新后重新计算布局
    await nextTick();
    layout();
  } finally {
    // 6. 解锁
    isLoading.value = false;
  }
};

// --- 监听图片加载 ---
let timer = null;
const handleImgLoad = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    layout();
  }, 200);
};
const handleResize = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    layout();
  }, 300);
};

// --- 生命周期 ---
onMounted(async () => {
  // 1. 初始数据加载
  await loadMore();

  window.addEventListener("resize", handleResize);

  // 2. 设置 IntersectionObserver (滚动监听核心)
  if (sentinelRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        // entries[0] 就是我们的哨兵元素
        // isIntersecting 为 true 表示进入视口
        if (entries[0].isIntersecting) {
          console.log("触底了，开始加载...");
          loadMore();
        }
      },
      {
        root: null, // 监听视口
        rootMargin: "0px 0px 200px 0px", // 关键优化：距离底部还有 200px 时就提前触发，体验更丝滑
        threshold: 0, // 只要露出一像素就触发
      }
    );

    // 开始观察哨兵
    observer.observe(sentinelRef.value);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  // 销毁观察者，防止内存泄漏
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.waterfall-wrapper {
  padding: 20px;
}
.header {
  text-align: center;
  margin-bottom: 20px;
}

.waterfall-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.waterfall-item {
  position: absolute;
  transition: all 0.3s;
  box-sizing: border-box;
}

.card-content {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.card-content img {
  width: 100%;
  display: block;
}
.info {
  padding: 10px;
}

/* 底部 Loading 样式 */
.loading-sentinel {
  width: 100%;
  height: 60px; /* 必须给一定高度，否则可能一开始就在视口内导致死循环 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  color: #666;
}

.spinner {
  display: inline-block;
  margin-right: 8px;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.finished-text {
  color: #999;
  font-size: 14px;
}
</style>
