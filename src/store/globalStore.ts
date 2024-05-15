import { defineStore } from "pinia";



const useGlobalStore = defineStore("globalStore", {
  state: () => ({
    themeCheckBox: true as Boolean,
  }),

  actions: {
    setThemeCheckBox(value:Boolean) {
      this.themeCheckBox = value;
    },
 
  },
});
export default useGlobalStore;
