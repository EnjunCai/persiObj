<template>
  <div class="audioWrapper" :style="{
    transform: !isShow ? 'translateY(57px)' : 'translateY(0)',
    opacity: isShow ? 1 : 0.6,
  }" @mouseenter="moveEnter" @mouseleave="mouseLeave" @mousemove="handleMouseMove($event)"
    @mouseup="handleMouseUp($event)">
    <div class="active"></div>
    <div class="musicInfo">
      <p>name</p>
      <p>zuozhe</p>
    </div>
    <!-- 音乐操作栏 -->
    <div class="musicOperation">
      <div>上一首</div>
      <div>播放</div>
      <div>下一首</div>
    </div>
    <!-- 音乐进度条 -->
    <div class="musicProgress" ref="containerRect" @mousedown="handleProgressBarDown($event)"
      @click="handleProgressBarClick($event)">
      <!-- 音乐实际进度条 -->
      <div class="musicProgressBar" :style="{ width: progress + '%' }"> </div>
      <!-- 音乐缓存进度条 -->
      <div class="musicProgressCache"></div>
    </div>

    <!-- 音乐声音 -->
    <div class="musicVolume">


      <div class="musicVolumeIcon" @mouseenter="handleVolumeEnter" @mouseleave="handleVolumeLeave"
        @mousemove="handleVolumeMove">
        =
        <div class="musicVolumeBar"></div>

      </div>
    </div>
    <!-- 音乐列表 -->
    <div class="musicList">

      ===
    </div>
    <div class="closeMusic" @click="closeMusic">X</div>
    <div v-if="useMusicStoreData.currentMusic?.play" style="margin-top: 7px">
      <audio controls ref="audio" :src="CurrentMusicSrc" @pause="onPause" @play="onPlay" @loadstart="onLoadstart"
        @volumechange="volumeChange" @timeupdate="timeUpdate" @canplay="onLoadedmetadata"></audio>
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
const isDragging = ref(false)
const containerRect = ref()

const useMusicStoreData = useMusicStore();
console.log(useMusicStoreData.currentMusic);
let CurrentMusicSrc = ref("");
// // 当前时间
// let MusiccurrentTime: Ref<number> = ref();
// // 歌曲总时间
// let Musicduration: Ref<number> = ref();
// // 进度条
let progress: Ref<number> = ref(0);

// // 默认暂停状态
// let playing: Ref<boolean> = false;

// 歌曲音量
let volumes: Ref<number> = ref(70);



console.log(audio.value);
const onPause = () => { };
const onPlay = (e) => {
  console.log(e);

};
const onLoadstart = (e: Event) => {
  console.log(e);

};
// 修改音乐音量
const volumeChange = (e: Event) => {
  const audioElement = e.target as HTMLAudioElement;
  localStorage.setItem("Volume", String(audioElement.volume * 100));
};
// 音乐播放时间
const timeUpdate = (e: Event) => {
  if (isDragging.value) return
  const audioElement = e.target as HTMLAudioElement;

  if (!audioElement) return;

  // 计算当前播放进度百分比
  progress.value = Math.min((audioElement.currentTime / audioElement.duration) * 100, 100);
};

// 点击跳转指定进度
const handleProgressBarClick = (e: MouseEvent) => {
  const progressBar = e.target as HTMLElement;
  const progressBarWidth = progressBar.clientWidth;
  const offsetX = e.offsetX;
  const progress = (offsetX / progressBarWidth) * 100;
  audio.value.currentTime = (progress / 100) * audio.value.duration;
};
// 按下鼠标移动拖动进度条，松开鼠标，恢复播放
const handleProgressBarDown = (e: MouseEvent) => {
  const progressBar = e.target as HTMLElement;
  isDragging.value = true
  const progressBarWidth = progressBar.clientWidth;
  const offsetX = e.offsetX;
  const p = (offsetX / progressBarWidth) * 100;
  progress.value = p

};

// 移动鼠标改变进度条位置，需要松开再次播放
const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const containerRect1 = containerRect.value.getBoundingClientRect();
  const newProgressX = e.clientX - containerRect1.left;

  // 计算新的播放进度百分比，限制在0-100%范围内
  const newProgressPercentage = Math.min(Math.max((newProgressX / containerRect1.width) * 100, 0), 100);

  // 更新进度条宽度
  progress.value = newProgressPercentage;

};


// 松开鼠标根据当前进度位置重新开始播放
const handleMouseUp = (e: MouseEvent) => {
  if (isDragging.value) {
    isDragging.value = false

    audio.value.currentTime = (progress.value / 100) * audio.value.duration;
  }
};


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

  isShow.value = true;
  clearTimeout(timer.value);
};

const mouseLeave = () => {
  isShow.value = false;
};

const handleVolumeEnter = (e: MouseEvent) => {
  console.log("enter");
};
const handleVolumeLeave = (e: MouseEvent) => {

};
const handleVolumeMove = (e: MouseEvent) => {
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

<style scoped lang="scss">
.audioWrapper {

  user-select: none;
  background: var(--detail-color);

  padding-top: 7px;
  transition: all 0.3s;
  position: relative;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  background: rgb(26, 26, 26);
  display: flex;
  align-items: center;
  gap: 20px;

  color: #fff;

  .active {
    width: 64px;
    height: 64px;
    background: green
  }

  .musicProgress {
    flex: 1;
    position: relative;
    height: 10px;
    cursor: pointer;

    &>div {
      position: absolute;
      top: 0;
      left: 0;
      height: 10px;
      border-radius: 8px;
      width: 100%;
    }

    .musicProgressBar {
      background: rgba(255, 255, 255);
    }

    .musicProgressCache {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .musicVolume {
    .musicVolumeIcon {
      position: relative;

      .musicVolumeBar {
        height: 0px;
        width: 10px;
        background: pink;
        overflow: hidden;
        transition: all .3s;
        position: absolute;
        bottom: 0px
      }

      &:hover {
        .musicVolumeBar {
          height: 100px;

        }
      }
    }
  }


  .musicInfo {}
}

.closeMusic {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  color: #fff;
}

audio {
  /* width: 100px;
  height: 100px; */
}
</style>