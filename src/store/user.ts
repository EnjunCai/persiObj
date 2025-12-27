import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

interface UserState {
  token: string | null;
  userInfo: User | null; // 使用 Supabase 的 User 类型
  session: Session | null;
}

const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: null,
    userInfo: null,
    session: null,
  }),
  actions: {
    // 登录
    async login(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      this.setSession(data.session);
    },

    // 注册
    async register(email: string, password: string) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      // 注意：如果开启了邮箱验证，注册后 data.session 可能为 null
      if (data.session) {
        this.setSession(data.session);
      }
      return data;
    },

    // 登出
    async logout() {
      await supabase.auth.signOut();
      this.clearUser();
    },

    // 辅助函数：设置状态
    setSession(session: Session | null) {
      if (session) {
        this.token = session.access_token;
        this.userInfo = session.user;
        this.session = session;
      }
    },

    clearUser() {
      this.token = null;
      this.userInfo = null;
      this.session = null;
    },
  },
  // 保持你原有的持久化配置
  persist: true,
});

export default useUserStore;
