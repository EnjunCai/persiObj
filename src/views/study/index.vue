<template>
  <div class="wrapper">
    <div class="list">
      <ul>
        <li
          :class="{ activeList: route.path == item.router }"
          v-for="item in list"
          :key="item.id"
          @click="navClick(item.router)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
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
]);
const msg = ref("study");

const navClick = function (link: string) {
  router.push(link);
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  .list {
    // position: fixed;
    top: 80px;
    left: 0;
    width: 200px;
    height: calc(100vh - 80px);
    border-right: 1px solid #ccc;
    ul {
      padding: 10px;
      .activeList {
        color: blue;
      }
      li {
        padding: 10px 20px;
        cursor: pointer;
        margin-bottom: 10px;
        border: 1px solid red;
        border-radius: 50px;
      }
    }
  }

  .content {
    margin-left: 200px;
  }
}
</style>
