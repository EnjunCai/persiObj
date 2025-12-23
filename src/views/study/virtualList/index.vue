<template>
  <div class="viewport" ref="viewportRef" @scroll="handleScroll">
    <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>

    <div
      class="render-list"
      :style="{ transform: `translate3d(0, ${offsetY}px, 0)` }"
    >
      <div
        class="list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >
        Row {{ item.id }} - {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// --- 配置项 ---
const itemSize = 50; // 每一项固定的高度 (px)
const buffer = 5; // 缓冲区大小 (防止滚动太快白屏，上下多渲染5个)

// --- 数据生成 (模拟 10万条) ---
const allData = Array.from({ length: 100000 }).map((_, i) => ({
  id: i,
  value: `Data Item ${i}`,
}));

// --- 状态 ---
const viewportRef = ref(null);
const containerHeight = ref(0); // 容器高度
const scrollTop = ref(0); // 当前滚动距离

// --- 核心计算 ---

// 1. 总高度 (撑开滚动条用)
const totalHeight = computed(() => allData.length * itemSize);

// 2. 计算可视区域能放下多少条
const visibleCount = computed(() =>
  Math.ceil(containerHeight.value / itemSize)
);

// 3. 计算起始索引 (核心算法)
const startIndex = computed(() => {
  const start = Math.floor(scrollTop.value / itemSize);
  // 减去缓冲区，但不能小于 0
  return Math.max(0, start - buffer);
});

// 4. 计算结束索引
const endIndex = computed(() => {
  const end = startIndex.value + visibleCount.value + buffer * 2;
  // 不能超过数据总长度
  return Math.min(allData.length, end);
});

// 5. 截取当前需要渲染的数据
const visibleData = computed(() => {
  return allData.slice(startIndex.value, endIndex.value);
});

// 6. 计算偏移量 (让渲染列表始终待在可视区)
// 注意：这里是 startIndex * itemSize，而不是 scrollTop
const offsetY = computed(() => {
  return startIndex.value * itemSize;
});

// --- 事件处理 ---
const handleScroll = (e) => {
  // 利用 requestAnimationFrame 优化滚动帧率
  // 但在简单场景下，直接赋值也很快
  scrollTop.value = e.target.scrollTop;
};

onMounted(() => {
  // 初始化获取容器高度
  if (viewportRef.value) {
    containerHeight.value = viewportRef.value.clientHeight;
  }
});
</script>

<style scoped>
.viewport {
  height: 500px; /* 必须限制高度 */
  overflow-y: scroll;
  position: relative;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.render-list {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  /* 这里的 transform 由 JS 动态控制 */
}

.list-item {
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  padding: 0 20px;
  background-color: #fff;
  /* 偶数行变色，方便看滚动效果 */
}
.list-item:nth-child(even) {
  background-color: #fafafa;
}
</style>
