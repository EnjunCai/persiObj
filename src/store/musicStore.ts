import { defineStore } from "pinia";

import { MusicInfo } from "@/views/study/music/musicInfo";

const useMusicStore = defineStore("movie", {
  state: () => ({
    musicList: [] as MusicInfo[],
    currentMusic: {} as MusicInfo | null | undefined,
    currentIdx: "",
  }),

  actions: {
    setMusicList(newList: MusicInfo[]) {
      this.musicList = newList;
    },
    setCurrentMusic(newData: MusicInfo | null | undefined) {
      console.log(123);

      this.currentMusic = newData;
    },
  },
});
export default useMusicStore;
