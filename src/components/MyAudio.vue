<template>
  <audio
    controls
    ref="audio"
    src="https://music.163.com/song/media/outer/url?id=2108599194"
    @pause="onPause"
    @play="onPlay"
    @loadstart="onLoadstart"
    @timeupdate="getCurr"
    @canplay="onLoadedmetadata"
  ></audio>
  123213
</template>

<script setup lang="ts">
import { ref, Ref, reactive } from "vue";
const audio = ref();

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
</script>

<style scoped>
audio {
  /* width: 100px;
  height: 100px; */
}
</style>