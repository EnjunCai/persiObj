<template>
  <router-view />

  <!-- <div class="audio-wrapper">
    <MyAudio />
  </div> -->
</template>

<script setup lang="ts">
import MyAudio from "@/components/MyAudio.vue";
</script>

<style scoped lang="scss">
.audio-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  background: red;
  width: 100%;
}
</style>
