<template>
  <div class="main_wrapper">
    <router-view />
  </div>

  <div class="audio-wrapper">
    <MyAudio />
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import MyAudio from "@/components/MyAudio.vue";
</script>

<style scoped lang="scss">
.audio-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.main_wrapper {
  // padding-top: 130px;
}
</style>
