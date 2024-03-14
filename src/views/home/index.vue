<template>
  <div class="home_wrapper">
    <div class="info_wrapper">
      <div class="info_text">
        Hello!
        我是休息休息嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻我是休息休息嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻
      </div>
      <div class="info_img">
        <el-image style="width: 600px" :src="infoUrl" />
      </div>
    </div>

    <div class="info_wrapper">
      <div class="info_text">
        Hello!
        我是休息休息嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻我是休息休息嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻
      </div>
      <div class="info_img">
        <el-image style="width: 600px" :src="infoUrl" />
      </div>
    </div>
    <div class="info_wrapper">
      <div class="info_text">
        Hello!
        我是休息休息嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻我是休息休息嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻
      </div>
      <div class="info_img">
        <el-image style="width: 600px" :src="infoUrl" />
      </div>
    </div>
    <p class="wow animate__flipInX">animate.css</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";

import { useRouter, useRoute } from "vue-router";
const infoUrl = ref();
infoUrl.value = new URL(
  "../../assets/images/taolun.svg",
  import.meta.url
).pathname;
</script>

<style scoped lang="scss">
.info_wrapper {
  height: 750px;
  display: flex;
  align-items: center;
  & > div {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info_text {
    padding: 0 100px;
    width: 40%;
  }
  .info_img {
    flex: 1;
  }
}
</style>