<template>
  <div class="wrapper">
    <div
      class="card-wrapper"
      v-for="item in list"
      :key="item.id"
      @click="navClick(item.router)"
    >
      <div class="card">
        <div class="title">{{ item.title }}</div>
        <div class="card__content">
          <p class="card__title">{{ item.title }}</p>
          <p class="card__description">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const list = reactive([
  {
    id: "list1",
    title: "树结构+手风琴",
    router: "/tree",
    text: "一个树结构的展开，主要展示的是高度不确定，从0到自适应高度让transition生效",
  },
  {
    id: "list2",
    title: "大屏响应式，使用scale实现，简化版本",
    router: "/resize",
  },
  {
    id: "list3",
    title: "音乐",
    router: "/music",
    text: "自定义音乐播放器（进行中）",
  },
  {
    id: "list4",
    title: "右键菜单组件",
    router: "/rightClick",
    text: "右键菜单组件",
  },

  {
    id: "list5",
    title: "抽奖",
    router: "/lotteryDraw",
    text: "几种抽奖模式",
  },
  {
    id: "list6",
    title: "移入到图片让背景颜色改变",
    router: "/imagesChangeBg",
    text: "用到color-thief这个组件库获取这个图片的所有主要颜色，然后取前几个进行渐变效果设置",
  },
  {
    id: "list7",
    title: "瀑布流",
    router: "/waterFullPage",
    text: "封装瀑布流",
  },
  {
    id: "list8",
    title: "卡片点击放大效果",
    router: "/CardExpansion",
    text: "卡片点击放大效果",
  },

  // {
  //   id: "list9",
  //   title: "哔哩哔哩首页中鼠标移动背景移动的效果(不支持移动端)",
  //   router: "/bilibiliMouseMove",
  //   text: "哔哩哔哩首页中鼠标移动背景移动的效果(不支持移动端)",
  // },
  {
    id: "list10",
    title: "自定义视频组件(开发中)",
    router: "/video",
    text: "自定义视频组件",
  },
  {
    id: "list14",
    title: "地图",
    router: "/map",
    text: "地图",
  },
  {
    id: "list11",
    title: "markDown编辑器",
    router: "/markDown",
    text: "markDown编辑器(采用组件)",
  },
  {
    id: "list12",
    title: "three的一些案例",
    router: "/three",
    text: "three基础案例",
  },
  // {
  //   id: "list13",
  //   title: "扫描二维码(手机)",
  //   router: "/scanCode",
  //   text: "扫描二维码",
  // },
  {
    id: "list15",
    title: "二次封装表格",
    router: "/MyTable",
    text: "二次封装表格",
  },
]);
const msg = ref("study");

const navClick = function (link: string) {
  router.push(link);
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  padding: 50px;
  // gap: 30px;
  flex-wrap: wrap;
  // justify-content: space-around;
  // width: calc(100vw - 350px);
}

.card-wrapper {
  padding: 20px;

  width: 33.333%;
}
.card {
  position: relative;

  height: 200px;
  background: linear-gradient(-45deg, #bce0c9 0%, #599e8d 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;

  .title {
    font-size: 24px;
    color: #333;
    padding: 0 20px;
    font-weight: 700;
  }
}

.card:hover {
  // transform: rotate(-5deg) scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card__content {
  position: absolute;
  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%) rotate(-45deg);
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.card:hover .card__content {
  transform: translate(-50%, -50%) rotate(0deg);
  opacity: 1;
}

.card__title {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}

.card__description {
  margin: 10px 0 0;
  font-size: 14px;
  color: #777;
  line-height: 1.4;
}

@media (max-width: 730px) {
  .card-wrapper {
    width: 100%;
  }
}
</style>
