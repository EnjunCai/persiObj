<template>
  <div class="home_wrapper">
    <div class="hero">
      <div class="hero_wrap">
        <div class="hero_bg">
          <div class="bg bg-01"></div>
          <div class="bg bg-02"></div>
          <div class="bg bg-03"></div>
        </div>

        <div class="hero_catch">
          <div class="hero_left">
            <div class="hero_left_title">
              <div data-aos="fade-left">H</div>
              <div data-aos="fade-left" data-aos-delay="100">e</div>
              <div data-aos="fade-left" data-aos-delay="200">l</div>
              <div data-aos="fade-left" data-aos-delay="300">l</div>
              <div data-aos="fade-left" data-aos-delay="400">o</div>
            </div>
            <div class="hero_left_text">一个辣鸡前端，记录记录</div>
          </div>
          <div class="hero_right"><HomeRight /></div>
        </div>
      </div>
    </div>

    <div class="xm" data-aos="fade-up" data-aos-once="true">
      <div class="xm_header">
        案例

        <span class="deco"></span>
      </div>
      <div class="xm_content">
        <div
          class="xm_content_item"
          v-for="item in xmList.xmList"
          :key="item.id"
          @click="() => router.push(item.router)"
        >
          <div class="xm_content_item_wrap">
            <img src="/src/assets/images/bilibili/b1.webp" />
          </div>
          <div class="xm_content_item_textarea">{{ item.title }}</div>
        </div>
      </div>
    </div>

    <div style="height: 1000px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";

import { useRouter, useRoute } from "vue-router";

import WaterFull from "@/components/WaterFull/index.vue";
import type { IImageItem } from "@/components/WaterFull/type";

import HomeRight from "@/views/home/components/HomeRight/index.vue";

import { list, ListItem } from "../navList";

import useUserStore from "@/store/user";

const userStore = useUserStore();

console.log(userStore.userInfo);

const router = useRouter();

const WaterFullColumn = ref(3);

const xmList = reactive<{ xmList: ListItem[] }>({
  xmList: [],
});

const infoUrl = ref();
infoUrl.value = new URL(
  "../../assets/images/taolun.svg",
  import.meta.url
).pathname;
// 获取屏幕宽度
const screenWidth = ref(
  window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
);
// 获取滚动条位置
const scrollTop = ref(window.scrollX);

const requestData = (page: number, pageSize: number): Promise<IImageItem[]> => {
  let url = `https://www.vilipix.com/api/v1/picture/public?limit=${9}&tags=%E9%A3%8E%E6%99%AF&from=pc_web&sort=new&offset=${
    9 * 9
  }`;
  // js获取当前是在什么设备，截取出来判断是pc还是手机
  const ua = navigator.userAgent;
  if (ua.indexOf("Windows") > -1) {
    // win系统
  } else {
    url = `https://m.vilipix.com/api/v1/picture/public?limit=${9}&tags=%E9%A3%8E%E6%99%AF&sort=new&offset=${
      9 * 9
    }`;
  }

  console.log(screenWidth.value);

  return new Promise<IImageItem[]>((resolve) => {
    fetch(url).then(async (res) => {
      const result = await res.json();

      const imageList: IImageItem[] = result.data.rows.map((i: any) => ({
        id: i.picture_id,
        url: i.original_url,
        height: i.height,
        width: i.width,
      }));
      resolve(imageList);
    });
  });
};

watch(
  () => screenWidth.value,
  (val) => {
    // console.log(val);
    if (val < 1024) {
      WaterFullColumn.value = 2;
    } else if (val < 768) {
      WaterFullColumn.value = 1;
    } else {
      WaterFullColumn.value = 3;
    }
  }
);

xmList.xmList = list.slice(0, 10);

// 监听滚动条位置
function handleScroll() {
  scrollTop.value = window.scrollY;
}
function handleResize() {
  screenWidth.value =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleResize);
});
</script>

<style scoped lang="scss">
.home_wrapper {
  background: var(--bg-color);

  .hero {
    padding: 50px;
    &_wrap {
      border-radius: 20px;
      background: var(--green-color);
      // background: #d6ebd4;
      position: relative;
    }
    &_bg {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      overflow: hidden;
      z-index: 1;
      .bg-01 {
        background-image: url(/src/assets/images/home/hero-town01-1.png);
        height: 216px;
      }

      .bg-03 {
        background-image: url(/src/assets/images/home/hero-town01-1.png);
        height: 274px;
      }
      .bg {
        width: 100%;
        background-size: auto 100%;
        background-repeat: repeat-x;
        background-position: center;
        animation: bg_slide 60s linear infinite;
      }

      .bg-02 {
        height: 258px;
        margin-top: 2px;
        margin-bottom: 12px;
        background-image: url(/src/assets/images/home/hero-town01-1.png);

        animation: bg_slide-r 60s linear infinite;
      }
      @keyframes bg_slide {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: -1128px 0;
        }
      }
      @keyframes bg_slide-r {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 1128px 0;
        }
      }
    }
    &_catch {
      position: relative;
      z-index: 2;
      height: 770px;
      display: flex;
      & > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 46px;
      }
      .hero_left {
        flex-wrap: wrap;
        // color: #4e5064;
        color: var(--text-color);

        &_title {
          font-size: 45px;
          font-weight: bold;
          display: flex;
        }
        &_text {
          margin-top: 5px;
          font-size: 30px;
          line-height: 40px;
          opacity: 0.8;
        }
      }
    }
  }

  .xm {
    border-radius: 1rem;
    border: solid 4px #313131;
    background-color: #fff;
    box-shadow: 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    // height: 100px;
    &_header {
      position: relative;
      padding: 0.5em;
      font-size: 1.75rem;
      letter-spacing: 0.1em;
      text-align: center;
      color: #fff;
      background-color: #62a366;
      border-bottom: solid 4px #313131;
      border-radius: 0.7rem 0.7rem 0 0;
      .deco {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 1em;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0.75rem;
        align-items: center;

        &::after,
        &::before {
          content: "";
          display: block;
          width: 1rem;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
        }
        &::after {
          background-color: #eecb90;
        }
        &::before {
          background-color: #9dd2ed;
        }
      }
    }

    &_content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 2rem;
      gap: 2rem;
      padding: 30px;
      &_item {
        color: var(--text-color);
        border-radius: 1rem;
        border: solid 4px #313131;
        background-color: var(--bg-color);
        box-shadow: 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.1);
        transition: all 0.4s ease-out;
        cursor: pointer;
        &:hover {
          border-color: #448547;
          transform: translateY(-10px);
        }
        &_wrap {
          img {
            width: 100%;
            height: 267px;
            display: block;
            // aspect-ratio: 360 / 240;
            border-radius: 0.7rem 0.7rem 0 0;
            overflow: hidden;
            object-fit: cover;
          }
        }
      }
      &_item:nth-child(1),
      &_item:nth-child(2) {
        grid-row: 1 / 3;
      }
    }
  }
}
</style>
