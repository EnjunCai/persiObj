<template>
  <div class="page-wrapper">
    
    <div class="dynamic-background" :style="bgStyle"></div>

    <div class="content-layer">
      
      <div class="home-container">
        <div class="bg-glow bg-glow-1"></div>
        <div class="bg-glow bg-glow-2"></div>

        <div class="content-wrapper">
          <div 
            class="text-section"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          >
            <div class="badge">Full Stack Developer</div>
            <h1 class="title">
              Hi, I'm <span class="highlight">Enjun</span><br />
              Building <span class="typing-effect">Digital Dreams</span>
            </h1>
            <p class="subtitle">
              热衷于 Vue生态与图形可视化的前端开发者。<br />
              向下滚动查看右上角背景变化效果 👇
            </p>
            
            <div class="btn-group">
              <el-button type="primary" size="large" class="cta-btn primary" @click="scrollToProjects">
                浏览项目 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
              </el-button>
            </div>
          </div>

          <div class="visual-section" v-motion-fade>
            <HomeRight />
          </div>
        </div>
      </div>

      <div class="projects-section" id="projects">
        <h2 class="section-title" v-motion-slide-visible-once-bottom>
          Recent <span class="highlight">Work</span>
        </h2>
        
        <div class="cards-grid">
          <div 
            v-for="(item, index) in 6" 
            :key="index"
            class="project-card"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 600 } }"
          >
            <div class="card-cover"></div>
            <div class="card-info">
              <h3>Project Name {{ index + 1 }}</h3>
              <p>这里是项目描述，向下滚动查看背景从右上角扩散的效果。</p>
            </div>
          </div>
        </div>
      </div>

      <div style="height: 500px; display: flex; align-items: center; justify-content: center; opacity: 0.5;">
        <p>Keep Scrolling...</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useScroll } from "@vueuse/core"; 
import HomeRight from "./components/HomeRight/index.vue";
import { ArrowRight } from "@element-plus/icons-vue";

// 1. 获取滚动位置
const { y: scrollY } = useScroll(window);

// 2. 计算动态背景样式
const bgStyle = computed(() => {
  // 核心算法：
  // 当 scrollY = 0 时，半径约为 0% (或者给个初始值 10%)
  // 当 scrollY = 1000 时，半径增加
  // 加上 'px' 或者 '%' 都可以，这里用百分比会让效果更适应屏幕宽度
  
  // 这里的 / 10 是调节变化速度的系数。数值越小，变化越快。
  const size = Math.max(0, scrollY.value / 15); 
  
  // 透明度也可以随之增加，这里设定一个上限 0.15，避免背景太深影响文字
  const opacity = Math.min(scrollY.value / 2000, 0.15) + 0.05;

  return {
    // 径向渐变：从右上角 (100% 0%) 开始
    // 颜色从 #42b883 (Vue绿) 过渡到 透明
    backgroundImage: `radial-gradient(
      circle at 100% 0%, 
      rgba(66, 184, 131, 0.4) 0%, 
      rgba(66, 184, 131, 0.1) ${20 + size}%, 
      transparent ${60 + size}%
    )`,
    
    // 如果你想让整个背景随着滚动变暗一点点，可以在这里加背景色
    // backgroundColor: `rgba(255, 255, 255, ${1 - opacity})` 
  };
});

const scrollToProjects = () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  position: relative;
  // 不需要 overflow hidden，否则无法滚动
}

/* --- 1. 动态背景层 --- */
.dynamic-background {
  position: fixed; /* 固定在窗口，不随内容滚动走 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1; /* 放在最底层 */
  background-color: #fdfdfd; /* 默认底色 */
  transition: background-image 0.1s linear; /* 简单的平滑过渡 */
  pointer-events: none; /* 确保不影响点击 */
}

/* --- 2. 内容层 --- */
.content-layer {
  position: relative;
  z-index: 1;
}

/* --- 下面保持原有样式不变 --- */

.home-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 稍微调整一下原本的光晕，让它们不要太抢戏，配合新的右上角渐变
.bg-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.1; 
  z-index: 0;
  animation: float 10s infinite alternate ease-in-out;
}
.bg-glow-1 { top: 20%; left: 10%; background: #42b883; }
.bg-glow-2 { bottom: 10%; right: 20%; background: #35495e; }

@keyframes float {
  from { transform: translate(0, 0); }
  to { transform: translate(30px, 30px); }
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
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
    .highlight { color: #42b883; position: relative; }
  }
  .subtitle { font-size: 18px; color: #666; margin-bottom: 40px; line-height: 1.6;}
  .btn-group { display: flex; gap: 20px; }
}

/* Projects Section */
.projects-section {
  padding: 100px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 40px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 60px;
  .highlight { color: #42b883; }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.project-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(66, 184, 131, 0.15);
  }

  .card-cover {
    height: 180px;
    background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  }
  .card-info { padding: 24px; h3 { margin-bottom: 10px; } p { color: #888; font-size: 14px; } }
}

@media (max-width: 900px) {
  .content-wrapper { grid-template-columns: 1fr; text-align: center; padding-top: 80px;}
  .text-section { order: 2; display: flex; flex-direction: column; align-items: center; }
  .visual-section { order: 1; transform: scale(0.9); margin-bottom: 20px; }
  .title { font-size: 42px; }
}
</style>