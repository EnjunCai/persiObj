<template>
  <div class="navigation_wrapper" v-loading="loading">
    <div class="item_wrapper" v-for="item in navList" :key="item.id">
      <div class="label">{{ item.title }}</div>

      <div class="grid_container">
        <div
          v-for="child in item.children"
          :key="child.id"
          class="card_wrapper"
        >
          <a class="card" :href="child.link" target="_blank">
            <div class="card_content">
              <img v-if="child.img" :src="child.img" class="card_icon" />
              <div class="text_content">
                <p class="title">{{ child.title }}</p>
                <p class="desc">{{ child.text }}</p>
              </div>
            </div>

            <div class="go-corner">
              <div class="go-arrow">
                <el-icon><ArrowRightBold /></el-icon>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div v-if="!loading && navList.length === 0" class="empty">
      <img src="@/assets/images/no-data.svg" alt="No Data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";

// 定义接口类型
interface NavChild {
  id: string;
  title: string;
  text: string;
  link: string;
  img?: string;
}

interface NavCategory {
  id: number;
  title: string;
  children: NavChild[];
}

const navList = ref<NavCategory[]>([]);
const loading = ref(true);

const fetchNav = async () => {
  try {
    // 按创建时间正序排列（也就是你插入的顺序）
    const { data, error } = await supabase
      .from("nav_collection")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    navList.value = data || [];
  } catch (err) {
    console.error("获取导航失败", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNav();
});
</script>

<style scoped lang="scss">
.navigation_wrapper {
  padding: 50px;
  min-height: 100vh;

  .item_wrapper {
    margin-bottom: 40px;

    .label {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-color); // 适配暗黑模式
      margin-bottom: 20px;
      padding-left: 10px;
      border-left: 4px solid #42b883; // 加个 Vue 绿的小装饰
    }

    // --- 核心修改：使用 Grid 布局替代原本的 Flex + calc ---
    .grid_container {
      display: grid;
      // 自动填充：每列最小 260px，空间不够自动换行，空间够自动拉伸
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
    }

    .card {
      display: block;
      position: relative;
      background-color: #fff;
      border-radius: 12px;
      padding: 24px;
      height: 100%; // 保证 Grid 同一行高度一致
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
      text-decoration: none;
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      box-sizing: border-box;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
        border-color: #bcdfd7;

        // 标题变色
        .text_content .title {
          color: #42b883;
        }

        // 圆圈放大动画
        &:before {
          transform: scale(30);
        }
      }

      // 背景装饰圆圈
      &:before {
        content: "";
        position: absolute;
        z-index: 0;
        top: -16px;
        right: -16px;
        background: #bcdfd7;
        height: 32px;
        width: 32px;
        border-radius: 50%;
        transform-origin: 50% 50%;
        transition: transform 0.4s ease-out;
        opacity: 0.3; // 稍微透明一点，不挡文字
      }

      .card_content {
        position: relative;
        z-index: 1; // 保证在装饰层上面
        display: flex;
        align-items: flex-start;
        gap: 12px;

        .card_icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          object-fit: cover;
        }

        .text_content {
          .title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 6px;
            transition: color 0.3s;
          }
          .desc {
            font-size: 13px;
            color: #888;
            line-height: 1.4;
            // 限制显示两行，超出省略
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }

      // 右上角箭头区域
      .go-corner {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 32px;
        height: 32px;
        background-color: #bcdfd7;
        border-radius: 0 12px 0 12px; // 顺应卡片的圆角
        z-index: 1;

        .go-arrow {
          color: #fff;
          font-size: 14px;
          transform: rotate(-45deg); // 箭头稍微斜一点更有设计感
        }
      }
    }
  }

  .empty {
    display: flex;
    justify-content: center;
    padding-top: 100px;
    img {
      width: 200px;
      opacity: 0.5;
    }
  }
}

// 移动端适配：Grid 会自动处理，这里只需要微调边距
@media (max-width: 450px) {
  .navigation_wrapper {
    padding: 20px;

    .grid_container {
      grid-template-columns: 1fr; // 手机端强制一列
    }
  }
}
</style>