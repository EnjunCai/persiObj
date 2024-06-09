<template>
  <StudyNavbarVue>
    <template v-slot:main>
      <div class="content">
        <div class="music-top100">
          <div
            v-for="(item, index) in musicTopList"
            :key="item.mid"
            @click="playMusic(item, index)"
          >
            <div class="music_img">
              <!-- <el-image src=""/> -->
              <Icon class="#icon-15" fontSize="38px" />
            </div>
            <div>{{ item.name }}</div>

            <div v-if="useMusicStoreData.currentMusic?.mid == item.mid">
              播放中
            </div>
          </div>
        </div>
      </div>
    </template>
  </StudyNavbarVue>
</template>

<script setup lang="ts">
import { MusicInfo } from "./musicInfo";
import StudyNavbarVue from "@/components/StudyNavbar.vue";
import { sjMusic, wytop, textC } from "@/axios/api/test";

import { ref, onMounted, reactive, inject } from "vue";

import useMusicStore from "@/store/musicStore";

const useMusicStoreData = useMusicStore();

let musicTopList = ref<MusicInfo[]>([]);
sjMusic().then((res) => {
  console.log(res);
});

textC().then((res) => {
  console.log(res, "---");
});

wytop().then((res) => {
  console.log(res);
  musicTopList.value = res.data;
  console.log(musicTopList);
});
onMounted(() => {
  console.log(musicTopList);
});

const playMusic = (item: MusicInfo, index: number) => {
  console.log(item);
  useMusicStoreData.setMusicList(musicTopList.value);
  useMusicStoreData.setCurrentMusic(item);
};
</script>

<style scoped>
.content {
  background: var(--detail-color);
  /* padding: 100px 50px;
  height: 100vh; */
  /* background-image: radial-gradient(
    circle at 10.6% 23.3%,
    rgb(186, 162, 252) 0%,
    rgb(176, 248, 242) 72.4%
  ); */
  height: 100%;
  .music-top100 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 21px;
    padding: 20px;
    box-shadow: 0px 14px 40px 0px rgba(109, 141, 173, 0.25);
    /* background: var(--text-AColor); */

    overflow: auto;
    & > div {
      padding: 20px;
      border-radius: 8px;
      transition: all 0.3s;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;

      .music_img {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        height: 40px;
        width: 40px;
        transition: all 0.3s;
        background: var(--bg-color);
        /* background-image: radial-gradient(
          circle at 10% 20%,
          rgb(222, 168, 248) 0%,
          rgb(168, 222, 248) 21.8%,
          rgb(189, 250, 205) 35.6%,
          rgb(243, 250, 189) 52.9%,
          rgb(250, 227, 189) 66.8%,
          rgb(248, 172, 172) 90%,
          rgb(254, 211, 252) 99.7%
        ); */
      }
    }

    & > div:hover {
      /* padding: 20px; */
      background: #fff;
    }
  }
}
</style>