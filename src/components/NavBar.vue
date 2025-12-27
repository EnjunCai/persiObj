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
        <div v-if="!userStore.userInfo">
          <el-button
            type="primary"
            size="small"
            round
            @click="router.push('/login')"
          >
            登录 / 注册
          </el-button>
        </div>

        <el-dropdown v-else trigger="hover" @command="handleCommand">
          <div class="user-avatar-trigger">
            <el-avatar
              :size="36"
              class="avatar-img"
              :src="userStore.userInfo.user_metadata?.avatar_url"
            >
              {{ userStore.userInfo.email?.charAt(0).toUpperCase() }}
            </el-avatar>
            <span class="username">{{
              userStore.userInfo.email?.split("@")[0]
            }}</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </div>

          <template #dropdown>
            <el-dropdown-menu class="custom-dropdown">
              <el-dropdown-item command="admin" icon="Setting"
                >管理中心</el-dropdown-item
              >
              <el-dropdown-item
                divided
                command="logout"
                icon="SwitchButton"
                style="color: #f56c6c"
              >
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/user";
import { ArrowDown, Setting, SwitchButton } from "@element-plus/icons-vue"; // 引入图标
import { ElMessage } from "element-plus";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 滚动监听状态
const isScrolled = ref(false);

// 导航菜单配置 (按你要求的顺序)
const menuList = [
  { label: "首页", path: "/home", name: "home" },
  { label: "笔记", path: "/note", name: "note" },
  { label: "学习", path: "/study", name: "study" },
  { label: "导航", path: "/navigation", name: "navigation" },
  { label: "娱乐", path: "/game", name: "game" },
];

// 路由高亮判断
const isActive = (path: string) => {
  if (path === "/" && route.path === "/") return true;
  if (path === "/") return false;
  // 包含匹配，例如 /noteInfo/1 也会高亮 /note
  return (
    route.path.startsWith(path) ||
    (path === "/note" && route.path.includes("note"))
  );
};

const handleNavigate = (item: any) => {
  router.push(item.path);
};

// 下拉菜单指令处理
const handleCommand = async (command: string) => {
  if (command === "logout") {
    try {
      await userStore.logout();
      ElMessage.success("已退出登录");
      router.push("/login"); // 退出后跳回登录页或首页
    } catch (error) {
      ElMessage.error("退出失败");
    }
  } else if (command === "admin") {
    router.push("/admin");
  }
};

// 滚动效果
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
  background: rgba(255, 255, 255, 0.7); // 默认高透
  backdrop-filter: blur(10px); // 毛玻璃效果
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
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

      .logo-img {
        width: 28px;
        height: 28px;
      }
      .logo-text {
        font-size: 20px;
        font-weight: 700;
        color: #333;
        letter-spacing: -0.5px;
      }
    }

    .menu {
      display: flex;
      gap: 32px;

      .menu-item {
        position: relative;
        cursor: pointer;
        font-size: 16px;
        color: #555;
        font-weight: 500;
        transition: color 0.3s;
        padding: 5px 0;

        &:hover,
        &.active {
          color: #42b883;
        }

        // 底部高亮条动画
        .active-bar {
          position: absolute;
          bottom: -20px; // 距离文字的距离
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 20px;
          height: 3px;
          background: #42b883;
          border-radius: 4px;
          transition: transform 0.3s ease;
        }

        &.active .active-bar {
          bottom: -22px; // 对齐 navbar 底部
          transform: translateX(-50%) scaleX(1.5);
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;

      // 用户头像触发区样式
      .user-avatar-trigger {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 20px;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .avatar-img {
          background: #42b883;
          font-weight: 600;
          color: white;
        }

        .username {
          font-size: 14px;
          color: #333;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

// 移动端适配：隐藏中间菜单
@media (max-width: 768px) {
  .navbar-wrapper .navbar-content .menu {
    display: none;
  }
}
</style>