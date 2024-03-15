<template>
  <!-- <div class="header" @click="back">返回</div> -->
  <div class="main">
    <slot name="main"> </slot>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const back = () => {
  router.push("/study");
};
</script>

<style scoped lang="scss">
.header {
  margin-top: 20px;
  margin-left: 40px;
  display: inline-block;
  // position: fixed;
  // left: 20px;
  // top: 20px;
  border-radius: 9.69px;
  // z-index: 999;
  box-shadow: 0px 3.88px 9.69px 0px rgba(0, 0, 0, 0.02);
  background: #ccc;
  padding: 20px 30px;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.3s;
  font-weight: 600;
  &:hover {
    background-color: var(--text-color);
    box-shadow: 0px 15px 20px var(--text-color);
    color: var(--text-AColor);
    transform: translateY(-7px);
    opacity: 1;
  }
  &:active {
    transform: translateY(-1px);
  }
}
.main {
  background: var(--bg-color);
  // padding: 100px 50px;
  // height: 100vh;
  // height: 100vh;
}
</style>