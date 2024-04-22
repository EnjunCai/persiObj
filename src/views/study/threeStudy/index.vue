<template>
  <div class="three-wrapper">
    <el-select
      v-model="value"
      placeholder="Select"
      size="large"
      style="margin-bottom: 20px; width: 300px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- <div>123</div> -->
    <component :is="selectedComponent"></component>
  </div>
</template>

<script setup lang="ts">
import ThreeStudy1 from "./components/ThreeStudy1/index.vue";
import ThreeStudy2 from "./components/ThreeStudy2/index.vue";
import { ref, computed } from "vue";

const value = ref("ThreeStudy1");

const options = [
  {
    value: "ThreeStudy1",
    label: "案例1-圆球，立方体，平面",
  },
  {
    value: "ThreeStudy2",
    label: "案例2-光照以及材质",
  },
];

const selectedComponent = computed(() => {
  switch (value.value) {
    case "ThreeStudy1":
      return ThreeStudy1;
    case "ThreeStudy2":
      return ThreeStudy2;
    default:
      return null;
  }
});
</script>

<style scoped lang="scss">
.three-wrapper {
  padding: 40px;
}
</style>