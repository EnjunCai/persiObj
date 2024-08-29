<template>
  <div class="wrapperRl">
    <div class="itemWrapper">
      <div class="item" v-for="(item, index) in 30" :key="index">
        <div class="date-cell">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="mask" :style="maskStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { useMousePosition } from "./useMousePosition";
import { ref, getCurrentInstance, computed } from "vue";
import { onBeforeMount, onMounted } from "vue";

const vm = getCurrentInstance();
console.log(vm);

const { x, y, enter, height } = useMousePosition(vm);
console.log(x, y, enter, height);
const maskStyle = computed(() => {
  return {
    transform: `translate(${x.value}px, ${y.value}px)`,
    backgroundImage: enter.value
      ? `radial-gradient(transparent, #000 ${60}px)`
      : "",
    backgroundColor: enter.value ? "" : "#000",
    height: height.value + "px",
  };
});
</script>

<style lang="scss" scoped>
.wrapperRl {
  position: relative;
  user-select: none;
  overflow: hidden;
  width: 600px;
  color: #fff;
  .itemWrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    & > .item {
      width: 20%;
      background-color: #000;
      padding: 2px;

      .date-cell {
        height: 42px;
        border: 2px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          z-index: 1;
          position: relative;
        }
      }
    }
  }

  .mask {
    position: absolute;
    width: 200%;
    height: 700px;
    left: 0;
    top: 0;
    pointer-events: none;
    transform: translate(-59.5px, -312px);
  }
}
</style>
