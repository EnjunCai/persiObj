<template>
  <!-- <h1>{{ msg }}</h1> -->
  <div class="global_wrapper">
    <nav class="global_nav">
      <div class="logo">Enjun blog</div>
      <div class="nav_list">
        <ul ref="ulParent">
          <div ref="activeBgRef" class="active_bg"></div>
          <li
            v-for="(item, index) in barList"
            :key="item.id"
            :class="{
              active: navIndex == index,
            }"
            @click.stop="navClick(item.router, index, $el)"
            ref="listItem"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </nav>

    <main class="global_content">
      <router-view />
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const navIndex = ref(0);
// 控制导航背景
const listItem = ref();
const ulParent = ref();
const activeBgRef = ref();

const barList = reactive([
  { id: 1, title: "首页", router: "/" },
  { id: 3, title: "学习案例", router: "/study" },
  { id: 2, title: "其他", router: "/other" },
]);

const navClick = function (link: string, index: number, e: Event) {
  setBgPosition(index);
  navIndex.value = index;
  router.push(link);
};

const setBgPosition = (index: number) => {
  let parent = ulParent.value.getBoundingClientRect();
  let item = listItem.value[index].getBoundingClientRect();
  console.log(parent);

  let itemLeft = parent.left - item.left;

  let bg = activeBgRef.value;
  bg.style.left = Math.abs(itemLeft) + "px";
  bg.style.width = item.width + "px";
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

onMounted(() => {
  const studyIndex = barList.findIndex((item) => item.router === route.path);
  navIndex.value = studyIndex;
  setBgPosition(studyIndex);
});
// watch(
//   () => route.path,
//   (to, from) => {
//     console.log(to, from);

//     const studyIndex = barList.findIndex((item) => item.router === to);
//     navIndex.value = studyIndex;
//     setBgPosition(studyIndex);

//     console.log(studyIndex);
//   },
//   {
//     immediate: true,
//   }
// );
</script>
<style scoped lang="scss">
.global_wrapper {
  background: var(--bg-color);
  // display: flex;
}
.global_nav {
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-color);
  // height: 100vh;
  padding: 40px 40px;
  color: var(--text-color);
  box-shadow: 0 4px 8px #0000001a;

  .logo {
    font-weight: 700;
    font-size: 24px;
  }
  .nav_list {
    ul {
      display: flex;
      position: relative;

      li {
        line-height: 30px;
        cursor: pointer;
        padding: 10px 20px;
        z-index: 2;
        font-weight: 600;
      }

      .active {
        color: var(--text-AColor);
        transition: all 0.3s 0.1s;
      }

      .active_bg {
        position: absolute;
        height: 50px;
        width: 72px;
        background: var(--text-color);
        border-radius: 8px;
        transition: all 0.3s;
        // left: 0;
      }
    }
  }
}

.global_content {
  // padding: 50px;
  // width: calc(100vw - 350px);
  // min-width: 1600px;
  // flex: 1;
}
</style>

