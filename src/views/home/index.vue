<template>
  <div class="home_wrapper">
    <div class="info_wrapper">
      <div class="info_text">
        <p>Hello!</p>
        我是Enjun,这是我的个人网站，里面将会包括我遇到有趣的一些问题和效果，也会有相关网站和游戏分享！
      </div>
      <div class="info_img">
        <!-- <el-image style="width: 600px" :src="infoUrl" /> -->
        <el-image src="/src/assets/images/taolun.svg" />
      </div>
    </div>
    <div class="card_wrapper1">
      <div class="w7" v-observe="{ animationName: 'activeObserve' }">
        <div class="w7_img">
          <el-image src="/src/assets/images/image1.svg" />
        </div>
        <div class="w7_text">
          <p>Title</p>
          这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
          这是一段文字这是一段文字 这是一段文字
        </div>
      </div>
      <div class="w3" v-observe="{ animationName: 'activeObserve' }">
        <div class="w3_img">
          <el-image src="/src/assets/images/image1.svg" />
        </div>
        <div class="w3_text">
          <p>Title</p>
          这是一段文字 这是一段文字 这是一段文字 这是一段文字 这是一段文字
          这是一段文字
        </div>
      </div>
    </div>
    <div class="card_wrapper1">
      <div class="w3" v-observe="{ animationName: 'activeObserve' }">
        <div class="w3_img">
          <el-image src="/src/assets/images/image1.svg" />
        </div>
        <div class="w3_text">
          <p>Title</p>
          这是一段文字 这是一段文字 这是一段文字 这是一段文字 这是一段文字
          这是一段文字
        </div>
      </div>
      <div
        class="w7"
        v-observe="{ animationName: 'activeObserve', move: 'right' }"
      >
        <div class="w7_text">
          <p>Title</p>
          这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
          这是一段文字这是一段文字 这是一段文字
        </div>
        <div class="w7_img">
          <el-image src="/src/assets/images/image1.svg" />
        </div>
      </div>
    </div>

    <div class="more_wrapper">
      <ul>
        <li v-observe="{ animationName: 'activeObserve' }">
          <el-image src="/src/assets/images/i2.svg" />
        </li>
        <li v-observe="{ animationName: 'activeObserve' }">
          <el-image src="/src/assets/images/i3.svg" />
        </li>
        <li v-observe="{ animationName: 'activeObserve' }">
          <el-image src="/src/assets/images/i1.svg" />
        </li>
        <li v-observe="{ animationName: 'activeObserve', move: 'right' }">
          <el-image src="/src/assets/images/i4.svg" />
        </li>
        <li v-observe="{ animationName: 'activeObserve', move: 'right' }">
          <el-image src="/src/assets/images/i5.svg" />
        </li>
        <li v-observe="{ animationName: 'activeObserve', move: 'right' }">
          <el-image src="/src/assets/images/i2.svg" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";

import { useRouter, useRoute } from "vue-router";

const infoUrl = ref();
infoUrl.value = new URL(
  "../../assets/images/taolun.svg",
  import.meta.url
).pathname;
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
  padding: 100px 100px 0 100px;

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
      img {
        width: 100%;
      }
    }
    .w3_text {
      padding: 0 30px;
      line-height: 1.2;
      p {
        font-size: 28px;
      }
      text-align: center;
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
    padding: 40px 40px 0 40px;
  }

  .more_wrapper {
    padding: 40px;
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
    padding: 40px 40px 0 40px;

    flex-direction: column;
    .w3,
    .w7 {
      flex: 1;
      width: 100%;
    }
  }
  .more_wrapper {
    padding: 40px;
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
    padding: 20px 20px 0 20px;

    flex-direction: column;
    .w3,
    .w7 {
      flex: 1;
      width: 100%;
    }
  }
  .more_wrapper {
    padding: 20px;
    ul {
      column-count: 1;
    }
  }
}
</style>