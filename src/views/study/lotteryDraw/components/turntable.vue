<template>
  <div class="container">
    <div
      class="wheel"
      v-for="(item, index) in items"
      :key="index"
      :style="{
        transform:
          'rotate(' +
          (360 / items.length) * index +
          `deg) skewY(-${360 / items.length}deg)`,
      }"
    >
      <div class="section">
        {{ item }}
      </div>
    </div>
    <div class="pointer"></div>
  </div>
  <button @click="rotateWheel">抽奖</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
const items = ["奖品1", "奖品2", "奖品3", "奖品4", "奖品5", "奖品6", "奖品7"];
const rotation = ref(0);
let isRotating = false;

const rotateWheel = () => {
  if (!isRotating) {
    isRotating = true;
    const rotationAngle = Math.random() * 360 + 1800;
    rotation.value += rotationAngle;
    isRotating = false;
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 300px;
  height: 300px;
  background-color: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  .wheel {
    width: 300px;
    height: 300px;
    background-color: bisque;
    position: absolute;
    left: 50%;
    top: -50%;
    /*600-280/2,将prize正方形左下角点对准圆心*/
    border: 1px solid red;
    /*以正方形左下角为中心旋转，0% 100%即左下角的坐标*/
    transform-origin: 0% 100%;
  }
}
</style>