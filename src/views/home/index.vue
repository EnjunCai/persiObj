<template>
  <div class="home_wrapper">
    <div class="info_wrapper">
      <div class="info_text">
        <p>Hello!</p>

        我是Enjun,这是我的个人网站，里面将会包括我遇到有趣的一些问题和效果，也会有相关网站和游戏分享！
      </div>
      <div class="info_img">
        <!-- <el-image style="width: 600px" :src="infoUrl" /> -->
        <img src="/src/assets/images/taolun.svg" v-lazyLoad> </img>
      </div>
    </div>

    <!-- <div class="info_title">开发过的项目</div> -->
    <div class="card_wrapper1">
      <a
        href="https://kira-learning.com/"
        target="_black"
        class="w7"
        v-observe="{ animationName: 'activeObserve' }"
      >
        <div class="w7_img">
          <img src="/src/assets/images/kira.jpg" v-lazyLoad />
        </div>
        <div class="w7_text">
          <p>kira learning官网</p>
          在公司中进行独立开发的一个官网
        </div>
      </a>
      <div
        class="w3"
        @click="router.push('/study')"
        v-observe="{ animationName: 'activeObserve' }"
      >
        <div class="w3_img">
          <img src="/src/assets/images/kaifa.svg" v-lazyLoad />
        </div>
        <div class="w3_text">
          <p>学习案例</p>
          遇到的一些有趣的案例记录一下
        </div>
      </div>
    </div>
    <div class="card_wrapper1">
      <div
        class="w3"
        v-observe="{ animationName: 'activeObserve' }"
        @click="router.push('/navigation')"
      >
        <div class="w3_img">
          <img src="/src/assets/images/2.5Dxuqiu.svg" v-lazyLoad />
        </div>
        <div class="w3_text">
          <p>导航</p>
          汇总一些我认为不错的一些网站
        </div>
      </div>
      <a
        href="https://kira-learning.org/"
        target="_black"
        class="w7 w7R"
        v-observe="{ animationName: 'activeObserve', move: 'right' }"
      >
        <div class="w7_text">
          <p>kira学习平台</p>
          负责大部分内容开发，包括登录、答题系统、答题创建、在线聊天、编辑器等等（目前没有账号，无法登陆）
        </div>
        <div class="w7_img">
          <img src="/src/assets/images/kirapintai.jpg" v-lazyLoad />
        </div>
      </a>
    </div>
    <div class="waterfall-container">
      <WaterFull
        :gap="20"
        :column="WaterFullColumn"
        :request="requestData"
        :page-size="9"
        :isScroll="true"
      >
        <template #item="{ item }">
          <el-image :src="item.url" alt="图片" class="image" lazy ></el-image>
        </template>
      </WaterFull>
    </div>
    <!-- <div class="more_wrapper">
      <ul>
        <li v-observe="{ animationName: 'activeObserve' }">
          <CustomImg :src="urlI3" />
        </li>
        <li v-observe="{ animationName: 'activeObserve' }">
          <CustomImg
            :src="urlI3"
            lazy
            alt="1234566"
            :preview-src-list="srcList"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :initial-index="4"
            fit="cover"
          />
        </li>
        <li v-observe="{ animationName: 'activeObserve' }">
          <el-image :src="urlI1" lazy />
        </li>
        <li v-observe="{ animationName: 'activeObserve', move: 'right' }">
          <el-image :src="urlI4" lazy />
        </li>
        <li v-observe="{ animationName: 'activeObserve', move: 'right' }">
          <el-image :src="urlI5" lazy />
        </li>
        <li v-observe="{ animationName: 'activeObserve', move: 'right' }">
          <el-image :src="urlI2" lazy />
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";

import { useRouter, useRoute } from "vue-router";

import WaterFull from "@/components/WaterFull/index.vue";
import type { IImageItem } from "@/components/WaterFull/type";

import CustomImg from "@/components/CustomImg.vue";

const router = useRouter();

const url1 = new URL("@/assets/images/image1.svg", import.meta.url).pathname;
const url2 = new URL("@/assets/images/kira.jpg", import.meta.url).pathname;
const url3 = new URL("@/assets/images/kirapintai.jpg", import.meta.url)
  .pathname;
const url4 = new URL("@/assets/images/kaifa.svg", import.meta.url).pathname;
const url5 = new URL("@/assets/images/2.5Dxuqiu.svg", import.meta.url).pathname;
const urlI1 = new URL("@/assets/images/i1.svg", import.meta.url).pathname;
const urlI2 = new URL("@/assets/images/i2.svg", import.meta.url).pathname;
const urlI3 = new URL("@/assets/images/i3.svg", import.meta.url).pathname;
const urlI4 = new URL("@/assets/images/i4.svg", import.meta.url).pathname;
const urlI5 = new URL("@/assets/images/i5.svg", import.meta.url).pathname;

const WaterFullColumn = ref(3);

const screenWidth = ref(
  window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
);

const infoUrl = ref();
infoUrl.value = new URL(
  "../../assets/images/taolun.svg",
  import.meta.url
).pathname;

const requestData = (page: number, pageSize: number): Promise<IImageItem[]> => {
  return new Promise<IImageItem[]>((resolve) => {
    fetch(
      `https://www.vilipix.com/api/v1/picture/public?limit=${pageSize}&tags=%E9%A3%8E%E6%99%AF&from=pc_web&sort=new&offset=${
        --page * pageSize
      }`
      // `https://www.vilipix.com/api/v1/picture/public?limit=${pageSize}&sort=hot&offset=${
      //   --page * pageSize
      // }`
    ).then(async (res) => {
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

function handleResize() {
  screenWidth.value =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.home_wrapper {
  background: var(--bg-color);
}
.card_wrapper1 {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 100px 40px 100px;

  gap: 20px;
  align-items: stretch;
  .w7,
  .w3 {
    background: #f8f8f8;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 14px 40px 0px rgba(109, 141, 173, 0.25);
      background: rgb(255, 255, 255);
    }
  }

  .w7 {
    width: 70%;
    display: flex;
    align-items: center;
    gap: 20px;
    .w7_text {
      flex: 1;
      line-height: 1.8;
      p {
        font-size: 28px;
      }
    }
    .w7_img {
      width: 200px;
      img {
        width: 100%;
      }
    }
  }

  .w3 {
    width: 30%;
    display: flex;
    flex-direction: column;
    // align-content: center;
    align-items: center;
    justify-content: center;
    .w3_img {
      width: 150px;
      transform: translateY(0);
      img {
        width: 100%;
        transition: transform 0.2s ease-in-out;
      }
    }
    .w3_text {
      padding: 0 30px;
      line-height: 1.5;
      p {
        font-size: 28px;
      }

      text-align: center;
    }

    &:hover .w3_img {
      transition: all 0.3s;
      animation: shake 2s cubic-bezier(0.42, 0, 0.58, 1) infinite;
    }
  }

  @keyframes shake {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
}
.info_wrapper {
  height: 750px;
  display: flex;
  align-items: center;
  color: var(--text-color);

  & > div {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info_text {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0 0px 0 100px;
    width: 50%;
    font-size: 32px;
    line-height: 1.6;
    p {
      font-size: 52px;
    }
  }
  .info_img {
    flex: 1;
    img {
      width: 600px;
    }
  }
}

// .info_title {
//   margin: 70px 0;
//   text-align: center;
//   font-size: 38px;
//   color: var(--text-color);
// }

.more_wrapper {
  padding: 100px;
  overflow: hidden;

  ul {
    column-count: 3;
    li {
      break-inside: avoid-column; /* 防止li元素被分割到不同列 */
      margin-bottom: 10px; /* 设置li元素之间的下边距 */
      background-color: #f0f0f0; /* 设置背景颜色 */
      padding: 10px; /* 设置内边距 */

      img {
        width: 100%;
      }
    }
  }
}

.waterfall-container {
  margin: 100px;
  // width: 100vw;
  height: 500px;
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.wrapper_bg {
  background: url(/src/assets/images/cool-background.png) no-repeat 100% 100%;
  background-size: cover;
}

@media (max-width: 1080px) {
  .info_wrapper {
    height: 650px;
    .info_text {
      font-size: 22px;
      p {
        font-size: 42px;
      }
    }
    .info_img {
      img {
        width: 400px;
      }
    }
  }
}

@media (max-width: 768px) {
  .info_wrapper {
    height: 450px;

    .info_text {
      padding-left: 60px;

      p {
        font-size: 32px;
      }
      font-size: 18px;
    }
    .info_img {
      img {
        width: 300px;
      }
    }
  }

  .card_wrapper1 {
    // padding: 40px;
    padding: 20px 40px 30px 40px;
  }

  .waterfall-container {
    margin: 40px;
  }
}

@media (max-width: 668px) {
  .info_wrapper {
    .info_text {
      padding-left: 40px;
    }
  }

  .card_wrapper1 {
    // padding: 40px;
    padding: 20px 40px 30px 40px;

    flex-direction: column;
    .w3,
    .w7 {
      flex: 1;
      width: 100%;
    }

    .w7 {
      flex-direction: column;
    }

    .w7R {
      flex-direction: column-reverse;
    }
  }
  .waterfall-container {
    margin: 40px;
  }
}

@media (max-width: 450px) {
  .info_wrapper {
    flex-direction: column;
    .info_text {
      padding-left: 20px;
      width: 100%;
    }
  }

  .card_wrapper1 {
    // padding: 40px;
    padding: 10px 20px 20px 20px;

    flex-direction: column;
    .w3,
    .w7 {
      flex: 1;
      width: 100%;
    }
  }
  .waterfall-container {
    margin: 20px;
    // ul {
    //   column-count: 1;
    // }
  }
}
</style>