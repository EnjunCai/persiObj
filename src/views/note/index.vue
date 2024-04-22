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
          <div>All Tags</div>
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
import { noteList } from "./noteList";
import { reactive, ref, watch } from "vue";

const tagList = [
  {
    id: "tag1",
    title: "js",
  },
  {
    id: "tag2",
    title: "css",
  },
  {
    id: "tag3",
    title: "three",
  },
];
const router = useRouter();
const route = useRoute();
console.log(route);

let list = ref(noteList);

const reset = () => {
  router.push("/note");
};

watch(
  () => route.query.tag,
  (val) => {
    if (val) {
      let arr = noteList.filter((item) =>
        item.tag.find((item1) => item1 === val)
      );
      console.log(arr);

      list.value = arr;
    } else {
      list.value = noteList;
    }
  }
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
</style>