import { defineStore } from "pinia";

import { MusicInfo } from "@/views/study/music/musicInfo";

const useMusicStore = defineStore("movie", {
  state: () => ({
    musicList: [],
    currentMusic: {} as MusicInfo,
    currentIdx: "",
  }),

  actions: {
    setMusicList(newList: MusicInfo[]) {
      this.musicList = newList;
    },
    setCurrentMusic(newData: MusicInfo) {
      console.log(123);

      this.currentMusic = newData;
    },
  },
});
export default useMusicStore;
