<template>
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
  123213
</template>

<script setup lang="ts">
import { MusicInfo } from "@/views/study/music/musicInfo";

import { ref, Ref, reactive, watch, watchEffect } from "vue";
const audio = ref();

import useMusicStore from "@/store/musicStore";

const useMusicStoreData = useMusicStore();
console.log(useMusicStoreData.currentMusic);
let CurrentMusicSrc = ref("");
// 当前时间
let MusiccurrentTime: Ref<number> = ref();
// 歌曲总时间
let Musicduration: Ref<number> = ref();
// 进度条
let progress: Ref<number> = ref();

// 默认暂停状态
let playing: Ref<boolean> = false;

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

watchEffect(() => {
  if (audio.value) {
    audio.value.src = useMusicStoreData.currentMusic.play;
    audio.value.play();
  }
});
// watch(
//   () => useMusicStoreData.currentMusic,
//   (newSrc: MusicInfo, oldSrc) => {
//     // 处理状态变化
//     // console.log(`Count 变化了：${oldCount} -> ${newCount}`);
//     if (audio.value) {
//       audio.value.src = newSrc.play;
//       audio.value.play();
//     }
//   },
//   {
//     deep: true,
//   }
// );
</script>

<style scoped>
audio {
  /* width: 100px;
  height: 100px; */
}
</style>