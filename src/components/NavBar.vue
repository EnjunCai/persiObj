<template>
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
  { id: 1, title: "首页", router: "/home" },
  { id: 3, title: "案例", router: "/study" },
  { id: 4, title: "学习", router: "/study" },
  // { id: 5, title: "休闲一下", router: "/game" },
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
</script>

<style scoped lang="scss">
.global_wrapper {
  z-index: 99;
  background: var(--bg-color);
  position: fixed;
  width: 100vw;
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
    padding: 10px;
    font-weight: 700;
    font-size: 24px;

    /* Create a conic gradient. */
    /* Double percentages to avoid blur (#000 10%, #fff 10%, #fff 20%, ...). */

    cursor: pointer;
    &:hover {
      background: #ca4246;
      background-color: #ca4246;
      background: conic-gradient(
        #ca4246 16.666%,
        #e16541 16.666%,
        #e16541 33.333%,
        #f18f43 33.333%,
        #f18f43 50%,
        #8b9862 50%,
        #8b9862 66.666%,
        #476098 66.666%,
        #476098 83.333%,
        #a7489b 83.333%
      );

      /* Set thee background size and repeat properties. */
      background-size: 57%;
      background-repeat: repeat;

      /* Use the text as a mask for the background. */
      /* This will show the gradient as a text color rather than element bg. */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      /* Animate the text when loading the element. */
      /* This animates it on page load and when hovering out. */
      animation: rainbow-text-animation-rev 5s ease forwards;
    }
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

@keyframes rainbow-text-animation-rev {
  0% {
    background-size: 300%;
    background-position: -9em 1em;
  }
  20% {
    background-size: 57%;
    background-position: 0 1em;
  }
  80% {
    background-size: 57%;
    background-position: 0 0;
  }
  100% {
    background-size: 300%;
    background-position: -9em 1em;
  }
}
</style>