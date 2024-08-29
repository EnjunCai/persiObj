import { defineStore } from "pinia";

interface UserState {
  token: string | null;
  userInfo: Record<string, any> | null;
}



const useUserStore = defineStore("user", {
    state: (): UserState => ({
        token: null,
        userInfo: null,
      }),
      actions: {
        setUser(token: string, userInfo: Record<string, any>) {
          this.token = token;
          this.userInfo = userInfo;
        },
        clearUser() {
          this.token = null;
          this.userInfo = null;
        },
      },
      persist: true,
  });
  export default useUserStore;