<template>
  <div 
    class="navbar-wrapper" 
    :class="{ scrolled: isScrolled }"
    v-motion
    :initial="{ y: -100, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { duration: 800, type: 'spring', stiffness: 250, damping: 25 } }"
  >
    <div class="navbar-content">
      
      <div class="logo" @click="router.push('/')">
        <img 
          src="@/assets/vue.svg" 
          alt="Logo" 
          class="logo-img" 
          v-motion
          :hover="{ rotate: 360, transition: { duration: 800 } }"
        />
        <span class="logo-text">Enjun's Space</span>
      </div>

      <div class="menu">
        <div
          v-for="(item, index) in menuList"
          :key="item.path"
          class="menu-item"
          :class="{ active: isActive(item.path) }"
          @click="handleNavigate(item)"
      
          v-motion
          :initial="{ opacity: 0, y: -20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 + index * 100, duration: 500, type: 'spring' } }"
        >
          <span class="menu-text">{{ item.label }}</span>
          <div class="active-glow"></div>
        </div>
      </div>

      <div class="actions">
        <div v-if="!userStore.userInfo">
          <el-button
            type="primary"
            class="login-btn"
            round
            @click="router.push('/login')"
            v-motion
            :hover="{ scale: 1.05 }"
            :tap="{ scale: 0.95 }"
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
              <el-dropdown-item command="admin" icon="Setting">管理中心</el-dropdown-item>
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
import { ArrowDown, Setting, SwitchButton } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 滚动监听状态
const isScrolled = ref(false);

const menuList = [
  { label: "首页", path: "/home", name: "home" },
  { label: "笔记", path: "/note", name: "note" },
  { label: "学习", path: "/study", name: "study" },
  { label: "导航", path: "/navigation", name: "navigation" },
  { label: "娱乐", path: "/game", name: "game" },
];

const isActive = (path: string) => {
  if (path === "/" && route.path === "/") return true;
  if (path === "/") return false;
  return (
    route.path.startsWith(path) ||
    (path === "/note" && route.path.includes("note"))
  );
};

const handleNavigate = (item: any) => {
  router.push(item.path);
};

const handleCommand = async (command: string) => {
  if (command === "logout") {
    try {
      await userStore.logout();
      ElMessage.success("已退出登录");
      router.push("/login");
    } catch (error) {
      ElMessage.error("退出失败");
    }
  } else if (command === "admin") {
    router.push("/admin");
  }
};

const handleScroll = () => {
  // 阈值设为 50，滚动一点点就开始变化
  isScrolled.value = window.scrollY > 50;
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
  height: 70px; /* 稍微加高一点，显得大气 */
  z-index: 999;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 初始状态：完全透明，靠内容撑起视觉 */
  background: transparent;
  
  /* 滚动后的状态：变为磨砂白 */
  &.scrolled {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    height: 60px; /* 滚动后稍微变窄一点，节省空间 */
  }

  .navbar-content {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;

      .logo-img {
        width: 32px;
        height: 32px;
        transition: transform 0.3s;
      }
      .logo-text {
        font-size: 22px;
        font-weight: 800;
        color: #2c3e50;
        letter-spacing: -0.5px;
        background: linear-gradient(120deg, #2c3e50, #42b883);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .menu {
      display: flex;
      gap: 40px; /* 增加间距，更透气 */

      .menu-item {
        position: relative;
        cursor: pointer;
        font-size: 16px;
        color: #57606a;
        font-weight: 500;
        padding: 8px 0;
        transition: color 0.3s;

        /* 文字悬浮变色 */
        &:hover {
          color: #42b883;
        }
        &.active {
          color: #42b883;
          font-weight: 600;
        }

        /* 底部光晕条 (代替原来的 active-bar) */
        .active-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 24px;
          height: 4px;
          background: #42b883;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(66, 184, 131, 0.5); /* 绿色荧光 */
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性过渡 */
          opacity: 0;
        }

        /* 激活状态和悬浮状态都显示光晕 */
        &.active .active-glow {
          transform: translateX(-50%) scaleX(1);
          opacity: 1;
        }
        
        /* 鼠标移上去也显示一点点，作为提示 */
        &:hover .active-glow {
          transform: translateX(-50%) scaleX(0.5);
          opacity: 0.6;
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;
      
      .login-btn {
        background: #42b883;
        border: none;
        font-weight: 600;
        padding: 18px 24px; /* 按钮做大一点 */
        box-shadow: 0 4px 15px rgba(66, 184, 131, 0.3);
        &:hover {
          background: #3aa876;
        }
      }

      .user-avatar-trigger {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 30px;
        transition: all 0.3s;
        border: 1px solid transparent;

        &:hover {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(0,0,0,0.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .avatar-img {
          background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
          font-weight: 600;
          color: white;
          border: 2px solid white; /* 给头像加个白边 */
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .username {
          font-size: 15px;
          font-weight: 600;
          color: #333;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .navbar-wrapper .navbar-content .menu {
    display: none;
  }
}
</style>