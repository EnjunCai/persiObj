<template>
  <!-- <h1>{{ msg }}</h1> -->
  <div class="nav_wrapper">
    <NavBar />
  </div>
  <div class="content_wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
</script>
<style scoped lang="scss">
.content_wrapper {
  padding-top: 130px;
}
</style>
