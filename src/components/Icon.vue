<template>
  <svg class="icon" aria-hidden="true" :width="fontSize" :height="fontSize">
    <use :xlink:href="class" :fill="color"></use>
  </svg>
</template>
  
  <script setup lang="ts">
import { ref, defineProps } from "vue";
const props = defineProps({
  class: String, //需要添加的字体图标类
  color: {
    //图标颜色
    type: String,
    default: "#444",
  },
  fontSize: {
    //图标大小
    type: [String, Number],
    default: 16,
  },
});
</script>
  <style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
  
  