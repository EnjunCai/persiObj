<template>
  <div class="navbar-wrapper" :class="{ scrolled: isScrolled }">
    <div class="navbar-content">
      <div class="logo" @click="router.push('/')">
        <img src="@/assets/vue.svg" alt="Logo" class="logo-img" />
        <span class="logo-text">Enjun's Space</span>
      </div>

      <div class="menu">
        <div
          v-for="item in menuList"
          :key="item.path"
          class="menu-item"
          :class="{ active: isActive(item.path) }"
          @click="handleNavigate(item)"
        >
          <span>{{ item.label }}</span>
          <div class="active-bar"></div>
        </div>
      </div>

      <div class="actions">
        <el-button
          v-if="!userStore.userInfo"
          size="small"
          round
          @click="router.push('/login')"
        >
          登录
        </el-button>
        <div v-else class="user-avatar" @click="router.push('/admin')">
          <span>{{ userStore.userInfo.email?.charAt(0).toUpperCase() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/user";
// 如果你需要图标，可以引入 element-plus 的图标，这里作为示例
// import { House, Notebook, Compass, ... } from '@element-plus/icons-vue'

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 滚动监听状态
const isScrolled = ref(false);

// 菜单配置
const menuList = [
  { label: "首页", path: "/home", name: "home" },
  { label: "学习", path: "/study", name: "study" },
  { label: "笔记", path: "/note", name: "note" }, // 笔记列表
  { label: "导航", path: "/navigation", name: "navigation" }, // 导航合集
  { label: "娱乐", path: "/game", name: "game" },
  // { label: "关于", path: "/about", name: "about" },
];

// 判断当前路由是否激活
const isActive = (path: string) => {
  // 特殊处理：如果是根路径
  if (path === "/" && route.path === "/") return true;
  if (path === "/") return false;

  // 核心逻辑：当前路由包含了菜单路径就高亮
  // 比如：当前是 /noteInfo/123，菜单是 /note，这里我们手动判断一下
  if (path === "/note" && route.path.includes("note")) return true;

  return route.path.startsWith(path);
};

const handleNavigate = (item: any) => {
  router.push(item.path);
};

// 监听滚动，改变导航栏背景
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 999;
  transition: all 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.6); // 默认半透明
  backdrop-filter: blur(8px); // 毛玻璃
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &.scrolled {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .navbar-content {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-weight: bold;
      font-size: 20px;
      color: #333;

      .logo-img {
        width: 24px;
        height: 24px;
      }
    }

    .menu {
      display: flex;
      align-items: center;
      gap: 30px;

      .menu-item {
        position: relative;
        cursor: pointer;
        padding: 8px 0;
        font-size: 16px;
        color: #666;
        transition: color 0.3s;
        font-weight: 500;

        &:hover {
          color: #42b883; // Vue Green
        }

        &.active {
          color: #42b883;
          font-weight: 600;

          .active-bar {
            width: 100%;
            opacity: 1;
          }
        }

        .active-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 3px;
          background-color: #42b883;
          border-radius: 2px;
          transition: all 0.3s ease;
          opacity: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        // Hover 时的动效
        &:hover .active-bar {
          width: 50%;
          opacity: 0.5;
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;

      .user-avatar {
        width: 32px;
        height: 32px;
        background: #42b883;
        border-radius: 50%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}

// 移动端简单适配：隐藏菜单，以后可以加汉堡按钮
@media (max-width: 768px) {
  .navbar-wrapper .navbar-content {
    .menu {
      display: none; // 或者改成底部导航栏
    }

    // 如果你想在移动端显示简版菜单，可以解开下面注释并调整样式
    /*
    .menu {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: white;
      justify-content: space-around;
      padding: 10px 0;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    }
    */
  }
}
</style>