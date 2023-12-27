<template>
  <!-- <h1>{{ msg }}</h1> -->
  <div class="global-wrapper">
    <div class="global-nav">
      <div class="logo">learning</div>
      <div>
        <button @click="changeTheme('green')">主题A</button>
        <button @click="changeTheme('black')">主题B</button>
      </div>
      <ul>
        <li
          v-for="(item, index) in barList"
          :key="item.id"
          @click="navClick(item.router, index)"
          :class="{
            active: route.path == item.router,
          }"
        >
          {{ item.title }}
        </li>
      </ul>

      <div class="nav-bottom-text">
        一些说明描述内容
        <Icon class="#icon-xiangsu_xiaoya" />
      </div>
    </div>
    <div class="global-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const navIndex = ref(0);

const barList = reactive([
  { id: 1, title: "首页", router: "/" },
  { id: 3, title: "学习案例", router: "/study" },
  { id: 2, title: "其他", router: "/other" },
]);

const navClick = function (link: string, index: number) {
  navIndex.value = index;
  router.push(link);
};

const changeTheme = (val: string) => {
  switch (val) {
    case "black":
      window.document.documentElement.setAttribute("data-theme", "light");
      break;
    default:
      window.document.documentElement.removeAttribute("data-theme");

      break;
  }
  // if (val=='green') {
  //   window.document.documentElement.setAttribute("data-theme", "light");
  // } else {
  //   window.document.documentElement.removeAttribute("data-theme");
  // }
};
</script>
<style scoped lang="scss">
.global-wrapper {
  background: var(--bg-color);
  display: flex;
}
.global-nav {
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  // height: 80px;
  height: 100vh;
  border-right: 3px solid rgb(241, 246, 252);
  padding: 20px 20px;
  width: 350px;
  color: var(--text-color);

  .logo {
    font-size: 46px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  ul {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 400;
    li {
      cursor: pointer;
      transition: all 0.3s;
      padding: 30px 0px 30px 50px;
      border-radius: 21px;
      // &:hover {
      //   color: var(--p-t);
      // }
    }

    .active {
      box-shadow: 4px 15px 60px 0px rgba(109, 141, 173, 0.25);
      background: linear-gradient(
        90deg,
        var(--clear-color) 43.667%,
        var(--dull-color) 97.5%
      );
      color: var(--text-AColor);

      font-size: 16px;
      font-weight: 600;
    }
  }

  .nav-bottom-text {
    margin-top: auto;
    color: var(--detail-color);
  }
}

.global-content {
  // padding: 50px;
  // width: calc(100vw - 350px);
  // min-width: 1600px;
  flex: 1;
}
</style>

