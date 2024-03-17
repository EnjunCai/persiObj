<template>
  <el-image v-bind="$attrs">
    <template #placeholder>
      <div class="image-slot">Loading<span class="dot">...</span></div>
    </template>
  </el-image>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
if (instance) {
  //   console.log(instance.attrs);
}
</script>

<style scoped lang="scss">
.image-slot {
  width: 200px;
  height: 200px;
  background: red;
}
</style>