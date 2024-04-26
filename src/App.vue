<template>
  <div class="main_wrapper">
    <router-view />
  </div>



  <div class="audio-wrapper">

    <!-- <div href="#yolo" class="button">
      <div>Click me</div>
    </div> -->
    <MyAudio />
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import MyAudio from "@/components/MyAudio.vue";
</script>

<style scoped lang="scss">
// .button {
//   // background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
//   background-color: black;
//   border: 1px dashed #fff;
//   width: 100px;
//   height: 30px;
//   text-align: center;
//   transform: skewX(-45deg);
// }

// .button>div {
//   color: white;
//   transform: skewX(45deg);
// }

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
