<template>
  <div
    class="audioWrapper"
    :style="{
      transform: !isShow ? 'translateY(57px)' : 'translateY(0)',
      opacity: isShow ? 1 : 0.6,
    }"
    @mouseenter="moveEnter"
    @mouseleave="mouseLeave"
  >
    <div class="closeMusic" @click="closeMusic">X</div>
    <div v-if="useMusicStoreData.currentMusic?.play" style="margin-top: 7px">
      <audio
        controls
        ref="audio"
        :src="CurrentMusicSrc"
        @pause="onPause"
        @play="onPlay"
        @loadstart="onLoadstart"
        @timeupdate="getCurr"
        @canplay="onLoadedmetadata"
      ></audio>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MusicInfo } from "@/views/study/music/musicInfo";

import { ref, Ref, reactive, watch, watchEffect } from "vue";

import useMusicStore from "@/store/musicStore";

const audio = ref();

const isShow = ref(false);
const timer = ref();

const useMusicStoreData = useMusicStore();
console.log(useMusicStoreData.currentMusic);
let CurrentMusicSrc = ref("");
// // 当前时间
// let MusiccurrentTime: Ref<number> = ref();
// // 歌曲总时间
// let Musicduration: Ref<number> = ref();
// // 进度条
// let progress: Ref<number> = ref();

// // 默认暂停状态
// let playing: Ref<boolean> = false;

// 歌曲音量
let volumes: Ref<number> = ref(70);

console.log(audio.value);
const onPause = () => {};
const onPlay = () => {};
const onLoadstart = () => {};
const getCurr = () => {};
const onLoadedmetadata = () => {
  // 设置音量，如果有存储就获取，没有就设置
  let Volume = localStorage.getItem("Volume");
  console.log(Volume);
  if (Volume === null) {
    localStorage.setItem("Volume", String(volumes.value));
  } else {
    volumes.value = Number(Volume);
  }
  audio.value.volume = volumes.value / 100;
};

const closeMusic = () => {
  useMusicStoreData.currentMusic = null;
};

const moveEnter = () => {
  console.log(123);

  isShow.value = true;
  clearTimeout(timer.value);
};

const mouseLeave = () => {
  isShow.value = false;
};

watchEffect(() => {
  if (audio.value) {
    isShow.value = true;
    audio.value.src = useMusicStoreData.currentMusic?.play;
    audio.value.play();
    timer.value = setTimeout(() => {
      isShow.value = false;
    }, 3000);
  }
});
</script>

<style scoped>
.audioWrapper {
  background: var(--detail-color);

  padding-top: 7px;
  transition: all 0.3s;
  position: relative;
}

.closeMusic {
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 50%;
}
audio {
  /* width: 100px;
  height: 100px; */
}
</style>