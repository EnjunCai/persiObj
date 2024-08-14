<template>
  <div class="wrapper">
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in list.items"
        :key="index"
        :style="getStyle(item)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

import { useTriangles, useScaleDimensions } from "./useTriangles";

const getStyle = (item: { data?: string; color?: string; zI?: number }) => {
  return {
    "-webkit-clip-path": item.data,
    "clip-path": item.data,
    "background-color": item.color,
    "z-index": item.zI || 2,
  };
};
let listAll = reactive([
  [
    {
      data: "polygon(25.4% 30.6%, 33.5% 32.2%, 25.92% 36.857%)",
      color: "#FEDD47",
    },
    {
      data: "polygon(25.85% 36.9%, 35.25% 28.857%, 36.15% 47.714%)",
      color: "#F1C838",
    },
    {
      data: "polygon(25.45% 30.714%, 30.35% 28.286%, 32.1% 32.143%)",
      color: "#FDD24B",
    },
    {
      data: "polygon(30.3% 28.2%, 35.35% 28.857%, 31.4% 32.2%)",
      color: "#F3E567",
    },
    {
      data: "polygon(25.95% 36.857%, 37.25% 47.714%, 31.85% 46.714%)",
      color: "#CDAA25",
    },
    {
      data: "polygon(30.25% 28.4%, 35.85% 26%, 39.99% 29.686%)",
      color: "#FFF88B",
    },
    {
      data: "polygon(35% 29%, 39.85% 29.429%, 43.5% 39.4%)",
      color: "#FDD24B",
    },
    {
      data: "polygon(35.15% 29%, 43.45% 39.2%, 36.04% 47.99%)",
      color: "#E4BA2D",
    },
    {
      data: "polygon(31.25% 35.429%, 35.15% 30%, 37.45% 38%)",
      color: "#F4E281",
    },
    {
      data: "polygon(31.15% 35.571%, 34.55% 33.714%, 37.35% 38.2%)",
      color: "#3A393B",
    },
    {
      data: "polygon(31.15% 35.429%, 37.45% 38.143%, 33.15% 39.714%)",
      color: "#2B2424",
    },
    {
      data: "polygon(32.65% 35.286%, 33.55% 34.857%, 33.15% 36%)",
      color: "#fff",
    },
    {
      data: "polygon(39.75% 29.4%, 56.15% 41.857%, 43.35% 39.243%)",
      color: "#F0EA75",
    },
    {
      data: "polygon(43.35% 39%, 43.65% 51.571%, 36.15% 47.857%)",
      color: "#FAC932",
    },
    {
      data: "polygon(43.3% 38.7%, 52.55% 56.857%, 43.45% 58%)",
      color: "#FED63C",
    },
    {
      data: "polygon(43.25% 38.857%, 56.15% 41.857%, 52.45% 57%)",
      color: "#F9E049",
    },
    {
      data: "polygon(43.45% 57.857%, 52.55% 56.7%, 53.25% 70.286%)",
      color: "#E6BF2B",
    },
    {
      data: "polygon(37.45% 50.429%, 53.35% 70.286%, 43.95% 65.143%)",
      color: "#70540E",
    },
    {
      data: "polygon(36% 47.6657%, 43.75% 51.429%, 38.45% 55%)",
      color: "#FBD942",
    },
    {
      data: "polygon(43.65% 51.429%, 49.35% 63.286%, 38.35% 55%)",
      color: "#F0EA75",
    },
    {
      data: "polygon(34.35% 71.571%, 49.35% 73.429%, 41.55% 75.143%)",
      color: "#2C2924",
    },
    {
      data: "polygon(45.35% 60.286%, 49.25% 63.143%, 37.85% 73.286%)",
      color: "#D8C533",
    },
    {
      data: "polygon(37.65% 73.3%, 49.1% 63.143%, 41.75% 75.43%)",
      color: "#BDA126",
    },
    {
      data: "polygon(52.45% 56.9%, 56.05% 41.857%, 67.25% 63.4%)",
      color: "#FEEC63",
    },
    {
      data: "polygon(52.45% 56.714%, 67.15% 63.286%, 53.2% 70.3%)",
      color: "#F3CD37",
    },
    {
      data: "polygon(61.45% 66.429%, 72.85% 68.143%, 61.65% 75.857%)",
      color: "#986E19",
    },
    {
      data: "polygon(53.2% 70.1%, 67.25% 63.1%, 55.25% 81.714%)",
      color: "#F9DB35",
    },
    {
      data: "polygon(62.35% 70.571%, 75.15% 72.429%, 55.15% 81.714%)",
      color: "#FAC62D",
    },
    {
      data: "polygon(75.15% 72.429%, 65.95% 84.286%, 57.85% 83.571%)",
      color: "#FDDA54",
    },
    {
      data: "polygon(58.65% 83%, 65.85% 84.429%, 52.65% 84%)",
      color: "#180D13",
    },
    {
      data: "polygon(24.35% 68.143%, 56.65% 67.143%, 79.35% 85.714%)",
      color: "#3B6F4B",
      zI: 1,
    },
    {
      data: "polygon(24.25% 68.143%, 79.35% 85.714%, 50.35% 87.286%)",
      color: "#4E9F73",
    },
    {
      data: "polygon(24.35% 68.143%, 29.25% 71.714%, 27.25% 79%)",
      color: "#1D3246",
    },
  ],
  [
    {
      data: "polygon(7.013% 37.714%, 12.812% 34.286%, 26.012% 40%)",
      color: "#ff9763",
    },
    {
      data: "polygon(9.112% 62.286%, 28.813% 54.714%, 16.313% 63.286%)",
      color: "#d66b5b",
    },
    {
      data: "polygon(14.313% 38.5%, 22.9% 48.429%, 14.25% 60.6%)",
      color: "#e58557",
    },
    {
      data: "polygon(14.213% 38.429%, 25.912% 39.857%, 22.813% 48.429%)",
      color: "#ed8e5b",
    },
    {
      data: "polygon(14.313% 60.571%, 22.813% 48.429%, 28.813% 54.857%)",
      color: "#e37364",
    },
    {
      data: "polygon(22.712% 48.5%, 25.912% 39.714%, 28.7% 54.77%)",
      color: "#e58557",
    },
    {
      data: "polygon(25.912% 39.85%, 47.713% 44.286%, 28.75% 54.9%)",
      color: "#08da9f",
    },
    {
      data: "polygon(31.712% 41.2%, 31.813% 30.714%, 52.25% 22.8%)",
      color: "#a06891",
    },
    {
      data: "polygon(29.213% 59%, 31.212% 53.4%, 47.713% 62.3%)",
      color: "#a74876",
    },
    {
      data: "polygon(31.712% 41.2%, 47.813% 26.286%, 47.713% 44.3%)",
      color: "#5cefb2",
    },
    {
      data: "polygon(31.112% 53.429%, 47.813% 44.143%, 47.713% 62.286%)",
      color: "#00c290",
    },
    {
      data: "polygon(47.713% 26.429%, 56.112% 35.286%, 47.713% 44.286%)",
      color: "#30e5aa",
    },
    {
      data: "polygon(47.713% 44.286%, 56.3% 53.143%, 47.713% 62.35%)",
      color: "#00c794",
    },
    {
      data: "polygon(47.713% 44.286%, 56.112% 35.429%, 56.112% 53.286%)",
      color: "#00cc97",
    },
    {
      data: "polygon(47.713% 26.35%, 52.22% 22.6%, 66.112% 25.7%)",
      color: "#ffc86d",
    },
    {
      data: "polygon(47.6% 26.4%, 66.112% 25.714%, 56.012% 35.4%)",
      color: "#ffba5b",
    },
    {
      data: "polygon(56.012% 35.286%, 66.1% 25.714%, 68.212% 48%)",
      color: "#ffaa5a",
    },
    {
      data: "polygon(53.15% 38.35%, 56.012% 35.286%, 68.5% 48.3%)",
      color: "#583c3e",
    },
    {
      data: "polygon(52.812% 44.6%, 53.212% 38.286%, 68.5% 48.2%)",
      color: "#3b2e37",
    },
    {
      data: "polygon(52.812% 44.54%, 68.4% 48%, 56.112% 53.429%)",
      color: "#744f44",
    },
    {
      data: "polygon(47.7% 62.286%, 56.15% 53.2%, 65.813% 64.571%)",
      color: "#f86826",
    },
    {
      data: "polygon(56.012% 53.143%, 68.212% 48%, 65.712% 64.571%)",
      color: "#fa7637",
    },
    {
      data: "polygon(54.012% 70.143%, 57.913% 63.429%, 65.612% 64.5%)",
      color: "#f4542e",
    },
    {
      data: "polygon(66.112% 25.857%, 86.513% 43.571%, 68.112% 48.143%)",
      color: "#ff9658",
    },
    {
      data: "polygon(68.112% 47.857%, 86.513% 43.429%, 65.6% 64.62%)",
      color: "#fa8637",
    },
    {
      data: "polygon(65.712% 64.286%, 82.013% 48%, 85.513% 53.286%)",
      color: "#ba694b",
    },
    {
      data: "polygon(75.113% 43.714%, 76.712% 40.857%, 79.813% 42.571%)",
      color: "#32a4f0",
    },
    {
      data: "polygon(82% 47.9%, 86.45% 43.5%, 88.413% 47.571%)",
      color: "#32a4f0",
    },
    {
      data: "polygon(82% 48%, 87.112% 50.571%, 85.413% 53.286%)",
      color: "#0078a1",
    },
    {
      data: "polygon(95% 18.5%, 95.5% 22%, 97% 20%)",
      color: "#fff",
    },
    {
      data: "polygon(91.67% 9.5%, 92.3% 8.4%, 92.7% 9.7%)",
      color: "#fff",
    },
    {
      data: "polygon(87.75% 35.5%, 89.4% 37%, 89.1% 34.5%)",
      color: "#fff",
    },
    {
      data: "",
      color: "",
    },
  ],
]);
let list = reactive<{
  items: { data?: string; color?: string; zI?: number }[];
}>({
  items: [],
});

let currentIndex = ref(0);
let intervalId: number | undefined;

const { triangles } = useTriangles();
const { scaleDimensions } = useScaleDimensions();

const switchList = () => {
  currentIndex.value = (currentIndex.value + 1) % listAll.length;
  // 用新值替换当前 list 的内容
  list.items.splice(0, list.items.length, ...listAll[currentIndex.value]);
};

const originalWidth = 1184.04;
const originalHeight = 828.828;

// 缩放到新宽度 800px
console.log(scaleDimensions(originalWidth, originalHeight, 800));

// 缩放到新高度 600px
console.log(scaleDimensions(originalWidth, originalHeight, null, 400));

onMounted(() => {
  console.log(listAll);

  list.items = triangles.value;
  // list.items = Array.from({ 30 }, () => ({}));;
  intervalId = window.setInterval(switchList, 3000);
});

onBeforeUnmount(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId);
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  // background-color: #ccc5e3;
  width: 571.4px;
  height: 400px;
  position: relative;
  &::before {
    content: "";
    opacity: 0.34;
    -webkit-transition: 0.23s;
    -moz-transition: 0.23s;
    transition: 0.23s;
    -webkit-backface-visibility: hidden;
    width: 571.4px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;

    background: url(../../../../assets/images/home/grad-bg.png) no-repeat center
      center / cover;
    z-index: 1;
    background-size: 100% 100%;
    pointer-events: none;
  }
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    .item {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;

      -webkit-transition: 1s cubic-bezier(0.7, 0.3, 0, 1);
      -moz-transition: 1s cubic-bezier(0.7, 0.3, 0, 1);
      transition: 1s cubic-bezier(0.7, 0.3, 0, 1);
      -webkit-clip-path: polygon(50% 50%, 50% 50%, 50% 50%);
      clip-path: polygon(50% 50%, 50% 50%, 50% 50%);
      /* background-image: url(../img/transparent.png); */
      background-position: center center;
      background-color: #1a1a1d;
    }
  }
}
</style>
