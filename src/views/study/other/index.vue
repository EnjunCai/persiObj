<template>
  <div class="wrapper">
    <h1>他样式效果</h1>

    <div>
      <other1 />
      <chunksFile />
      <br />
      <w10rl />
    </div>
  </div>
</template>

<script setup lang="tsx">
import other1 from "./components/other1.vue";
import chunksFile from "./components/chunksFile.vue";
import w10rl from "./components/w10rl.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 30px;
}
</style>
