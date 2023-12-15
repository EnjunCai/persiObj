<template>
  <div class="wrapper">
    <div class="card-wrapper" v-for="item in list" :key="item.id">
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
    router: "/study/tree",
    text: "一个树结构的展开，主要展示的是高度不确定，从0到自适应高度让transition生效",
  },
  {
    id: "list2",
    title: "其他",
    router: "/study/1",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
  },
  {
    id: "list3",
    title: "11",
    router: "/study/2",
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
  width: calc(100vw - 350px);
}

.card-wrapper {
  padding: 20px;

  width: 20%;
}
.card {
  position: relative;

  height: 200px;
  background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100%);
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
</style>
