<template>
  <!-- <div>文字</div> -->
  <div class="note-wrapper">
    <div class="note-header"></div>
    <div class="content-wrapper">
      <div class="content">
        <div v-show="!!route.query.tag" class="reset-wrapper">
          当前筛选：{{ route.query.tag }}
          <button class="reset_btn" @click="reset">
            <svg
              class="svg-icon"
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#ff342b" stroke-linecap="round" stroke-width="1.5">
                <path
                  d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"
                ></path>
                <path
                  d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"
                ></path>
              </g>
            </svg>
            <div class="lable">重置</div>
          </button>
        </div>
        <div class="main">
          <div
            v-for="(item, index) in list"
            :key="item.id"
            class="item"
            @click="router.push(`/noteInfo/${item.id}`)"
          >
            <div class="title">{{ item.title }}</div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>

        <div v-show="!list.length" class="noData-wrapper">
          <img src="/src/assets/images/no-data.svg" />
        </div>
      </div>

      <div class="aside">
        <div>
          <div class="aside_title">All Tags</div>
          <div class="tags-wrapper">
            <div
              class="tag"
              v-for="item in tagList"
              :key="item.id"
              @click="router.push(`/note?tag=${item.title}`)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { supabase } from "@/lib/supabase"; // 引入客户端
import type { noteItem } from "./noteList"; // 引入类型

const router = useRouter();
const route = useRoute();

// 这里的 tagList 如果也是动态的，也可以存数据库，暂时保持静态
const tagList = [
  { id: "tag1", title: "js" },
  { id: "tag2", title: "css" },
  { id: "tag3", title: "three" },
];

// 列表数据改为响应式空数组
const list = ref<noteItem[]>([]);
const loading = ref(false);

// --- 核心：获取数据函数 ---
const fetchNotes = async (tagName?: string) => {
  loading.value = true;
  try {
    // 1. 构建基础查询
    let query = supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false }); // 按创建时间倒序

    // 2. 如果有标签，利用 Supabase 的 "包含" 查询
    // tags 字段是数组，contains 语法检查 tags 数组里是否包含 [tagName]
    if (tagName) {
      query = query.contains("tags", [tagName]);
    }

    const { data, error } = await query;

    if (error) throw error;

    // 赋值给列表
    list.value = data as noteItem[];
  } catch (error) {
    console.error("获取笔记失败:", error);
  } finally {
    loading.value = false;
  }
};

// 重置功能
const reset = () => {
  router.push("/note");
  // 注意：路由变化会触发下面的 watch，所以这里不需要手动调 fetchNotes
};

// 监听路由 query 变化（包括首次加载）
// immediate: true 保证了页面刚进来时会执行一次
watch(
  () => route.query.tag,
  (newTag) => {
    // 这里的 newTag 可能是 string 或 undefined
    fetchNotes(newTag as string);
  },
  { immediate: true }
);
</script>



<style scoped lang="scss">
.note-wrapper {
  .content-wrapper {
    padding: 60px;
    display: flex;
    gap: 30px;

    .content {
      flex: 1;

      .reset-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        gap: 20px;

        .reset_btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 6px 12px;
          gap: 8px;
          height: 34px;
          width: 112px;
          border: none;
          background: #ff362b34;
          border-radius: 20px;
          cursor: pointer;

          .lable {
            line-height: 20px;
            font-size: 17px;
            color: var(--text-color);
            letter-spacing: 1px;
          }

          &:hover {
            background: #ff362b52;
          }

          &:hover .svg-icon {
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(-360deg);
            }
          }
        }
      }

      .item {
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 20px -8px;
        padding: 20px;
        border-radius: 8px;
        background-color: #fff;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .text {
          opacity: 0.5;
        }
      }

      .noData-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 30px;

        img {
          width: 40vw;
        }
      }
    }

    .aside {
      // background: red;
      width: 300px;

      .aside_title {
        color: var(--text-color);
      }

      .tags-wrapper {
        display: flex;
        flex-wrap: wrap;

        .tag {
          display: inline-block;
          color: #fff;
          font-size: 1.1em;
          background-color: #8cd2a8;
          padding: 6px 23px 9px;
          border-radius: 70em;
          margin: 8px 6px 8px 0;
          margin-left: 0px;
          position: relative;
          text-transform: lowercase;
          cursor: pointer;
          transition: all 0.3s ease-in-out;

          &:hover {
            transform: scale(1.1);
            background-color: #599e8d;
          }
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .content-wrapper {
    // margin: 40px;
    flex-direction: column-reverse;
  }
}
</style>