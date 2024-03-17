<template>
  <div v-bind:style="styleObject" class="scale-box">
    <slot></slot>
  </div>
</template>
 
<script setup lang="ts">
import debounce from "lodash/debounce";
import { computed, reactive, onMounted, onUnmounted, defineProps } from "vue";

const { height, width } = defineProps({
  height: {
    type: Number,
    default: 1080,
  },
  width: {
    type: Number,
    default: 1920,
  },
});
console.log(height, width);

interface Scale {
  scaleX: number | null;
  scaleY: number | null;
  width: number;
  height: number;
}

let that: Scale = reactive({
  width: 1920,
  height: 1080,
  scaleX: null,
  scaleY: null,
});
let styleObject = computed(() => {
  let obj = {
    transform: `scale(${that.scaleX},${that.scaleY}) translate(-50%, -50%)`,
    WebkitTransform: `scale(${that.scaleX},${that.scaleY}) translate(-50%, -50%)`,
    width: width + "px",
    height: height + "px",
  };
  return obj;
});

const getScale = () => {
  // 分别计算X轴和Y轴的缩放比例
  that.scaleX = window.innerWidth / width;
  that.scaleY = window.innerHeight / height;
};

const setScale = debounce(() => {
  // 获取到缩放比，设置它
  getScale();
}, 500);

onMounted(() => {
  getScale();
  window.addEventListener("resize", setScale);
});

onUnmounted(() => {
  window.addEventListener("resize", setScale);
});
</script>
 
<style lang="scss" scoped>
.scale-box {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
}
</style>
 