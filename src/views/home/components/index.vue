<template>
  <div class="wrapper">
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        :style="getStyle(item)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const getStyle = (item: { data: string }) => {
  return {
    "-webkit-clip-path": item.data,
    "clip-path": item.data,
  };
};

let list = reactive([
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
    data: "polygon(25.95% 36.857%, 36.25% 47.714%, 27.85% 49.714%)",
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
]);
</script>

<style lang="scss">
.wrapper {
  width: 600px;
  height: 600px;
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    .item {
      position: absolute;
    }
  }
}
</style>
