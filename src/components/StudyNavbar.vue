<template>
  <div class="header" @click="back">返回</div>
  <div class="main">
    <slot name="main"> </slot>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const back = () => {
  router.back();
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  left: 20px;
  top: 20px;
  border-radius: 9.69px;
  z-index: 999;
  box-shadow: 0px 3.88px 9.69px 0px rgba(0, 0, 0, 0.02);
  background: #ccc;
  padding: 20px 40px;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
}
.main {
  background: var(--bg-color);
  // height: 100vh;
}
</style>