
<template>
  <div class="wrapper">
    <img src="/src/assets/images/404.svg" style="width: 40vw" />
    <Back />
  </div>
</template>
<script setup lang="ts">
import Back from "@/components/Back.vue";
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
</style>
