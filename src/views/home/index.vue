<template>
  <div class="home-container">
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>

    <div class="content-wrapper">
      <div class="text-section" v-scroll-reveal>
        <div class="badge">Full Stack Developer</div>
        <h1 class="title">
          Hi, I'm <span class="highlight">Enjun</span><br />
          Building <span class="typing-effect">Digital Dreams</span>
        </h1>
        <p class="subtitle">
          热衷于 Vue生态与图形可视化的前端开发者。<br />
          在这里记录我的学习历程、技术笔记与创意实验。
        </p>

        <div class="btn-group">
          <el-button
            type="primary"
            size="large"
            class="cta-btn primary"
            @click="router.push('/study')"
          >
            浏览项目 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
          <el-button size="large" class="cta-btn secondary" @click="openGithub">
            <template #icon>
              <img
                src="@/assets/images/home/hero-town02.png"
                style="width: 20px; filter: grayscale(1)"
              />
            </template>
            GitHub
          </el-button>
        </div>

        <div class="stats-row">
          <div class="stat-item">
            <h3>20+</h3>
            <p>Demo Projects</p>
          </div>
          <div class="stat-item">
            <h3>50+</h3>
            <p>Tech Notes</p>
          </div>
        </div>
      </div>

      <div class="visual-section">
        <HomeRight />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import HomeRight from "./components/HomeRight/index.vue";
import { ArrowRight } from "@element-plus/icons-vue"; // 确保引入图标

const router = useRouter();

const openGithub = () => {
  window.open("https://github.com/EnjunCai", "_blank");
};
</script>

<style scoped lang="scss">
.home-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #fdfdfd; // 浅色背景
  display: flex;
  align-items: center;
  justify-content: center;
}

// 背景光晕动画
.bg-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  z-index: 0;
  animation: float 10s infinite alternate ease-in-out;
}
.bg-glow-1 {
  top: -100px;
  left: -100px;
  background: #42b883;
}
.bg-glow-2 {
  bottom: -100px;
  right: -100px;
  background: #35495e;
  animation-delay: -5s;
}

@keyframes float {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(50px, 50px);
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1.2fr 1fr; // 左侧稍宽
  gap: 60px;
  align-items: center;
}

.text-section {
  .badge {
    display: inline-block;
    padding: 6px 16px;
    background: rgba(66, 184, 131, 0.1);
    color: #42b883;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 24px;
  }

  .title {
    font-size: 64px;
    line-height: 1.1;
    font-weight: 800;
    color: #2c3e50;
    margin-bottom: 24px;
    letter-spacing: -1px;

    .highlight {
      color: #42b883;
      position: relative;
      // 下划线装饰
      &::after {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 12px;
        background: rgba(66, 184, 131, 0.2);
        z-index: -1;
      }
    }
  }

  .subtitle {
    font-size: 18px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 40px;
    max-width: 500px;
  }

  .btn-group {
    display: flex;
    gap: 20px;
    margin-bottom: 60px;

    .cta-btn {
      font-weight: 600;
      padding: 22px 32px;
      border-radius: 12px;
      font-size: 16px;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-3px);
      }

      &.secondary {
        border-color: #e0e0e0;
        color: #555;
        background: white;
        &:hover {
          border-color: #42b883;
          color: #42b883;
        }
      }
    }
  }

  .stats-row {
    display: flex;
    gap: 50px;
    border-top: 1px solid #eee;
    padding-top: 30px;

    .stat-item {
      h3 {
        font-size: 32px;
        font-weight: 700;
        color: #2c3e50;
      }
      p {
        font-size: 14px;
        color: #999;
        margin-top: 5px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
}

.visual-section {
  display: flex;
  justify-content: center;
  align-items: center;
  // 给 HomeRight 加一个悬浮效果
  animation: hover-visual 6s ease-in-out infinite;
}

@keyframes hover-visual {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 900px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 100px; // 避开 Navbar
  }

  .text-section {
    order: 2; // 手机端文字在下
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 42px;
    }
    .stats-row {
      justify-content: center;
    }
  }

  .visual-section {
    order: 1;
    margin-bottom: -40px;
    transform: scale(0.8);
  }
}
</style>