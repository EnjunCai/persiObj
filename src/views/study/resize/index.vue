<template>
  <div class="resize_wrapper">
    <div class="back_class">
      <Back />
    </div>
    <div style="height: 100vh; width: 100vw; overflow: hidden">
      <Screen :width="1920" :height="1080">
        <div class="content_wrapper">
          <div class="header">可视化大屏</div>
          <div class="content">
            <div class="left">
              <div class="top">
                <SvgImg />
                <BarChart />
              </div>

              <div class="middle"><SvgImg /><BarChart /></div>

              <div class="bottom"><SvgImg /><BarChart /></div>
            </div>
            <div class="center"></div>
            <div class="right">
              <div class="top"><SvgImg /><BarChart /></div>

              <div class="middle"><SvgImg /><BarChart /></div>

              <div class="bottom"><SvgImg /><BarChart /></div>
            </div>
          </div>
        </div>
      </Screen>
    </div>
  </div>
</template>

<script setup lang="ts">
import Back from "@/components/Back.vue";
import BarChart from "./components/BarChart.vue";
import SvgImg from "./components/SvgImg.vue";
import Screen from "@/components/Screen.vue";
import StudyNavbarVue from "../../../components/StudyNavbar.vue";

import { ref, onMounted, onBeforeMount, onUnmounted } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

onBeforeMount(() => {
  document.documentElement.style.overflow = "hidden";
  console.log();
});
onMounted(() => {});
onUnmounted(() => {
  document.documentElement.style.overflow = "";
});
</script>

<style scoped lang="scss">
.resize_wrapper {
  background: url(/src/assets/images/resizeImage/pageBg.png) no-repeat;
  position: relative;
  .back_class {
    position: absolute;
    z-index: 9;
    left: 30px;
    top: 30px;
    opacity: 0.7;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}

.content_wrapper {
  width: 100%;
  height: 100%;
  .header {
    height: 64px;
    background: url(/src/assets/images/resizeImage/top.png) no-repeat;
    text-align: center;
    line-height: 64px;
    color: #fff;
    font-size: 32px;
    letter-spacing: 10px;
  }
}
.content {
  display: flex;
  width: 100%;
  height: calc(100% - 64px);
  padding: 0 20px;

  .left,
  .right {
    // width: 20vw;
    width: 540px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .top,
    .bottom,
    .middle {
      position: relative;
      height: 310px;
      width: 100%;
    }
  }

  .center {
    // width: 60%;
    flex: 1;
  }
}
</style>






