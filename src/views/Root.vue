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
import NavBar from "@/components/NavBar.vue";
</script>
<style scoped lang="scss">
.content_wrapper {
  padding-top: 130px;
  // margin-top: 130px;
}
@media (max-width: 780px) {
  .content_wrapper {
    padding-top: 124px;
  }
}
@media (max-width: 668px) {
  .content_wrapper {
    padding-top: 118px;
  }
}
@media (max-width: 450px) {
  .content_wrapper {
    padding-top: 78px;
  }
}
</style>
