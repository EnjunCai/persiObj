<template>
  <div class="global_wrapper">
    <nav class="global_nav">
      <div class="logo" @click="router.push('/home')">Enjun blog</div>
      <div v-if="screenWidth <= 780" class="mobileBtn" @click="checkMobileOpen">
        <!-- <input type="checkbox" id="checkbox" /> -->
        <div :class="{ toggle: true, toggleActive: isOpenMobileBar }">
          <div class="bar bar--top"></div>
          <div class="bar bar--middle"></div>
          <div class="bar bar--bottom"></div>
        </div>
      </div>
      <div v-else class="nav_list">
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
        <CheckTheme />
      </div>
    </nav>
  </div>
  <div
    v-if="screenWidth <= 780"
    :class="{ navMobileList: true, openMobileList: isOpenMobileBar }"
  >
    <!-- 123 -->
    <ul class="mobileListUl">
      <li
        :key="item.id"
        v-for="(item, index) in barList"
        @click.stop="navClick(item.router, index, $el)"
      >
        {{ item.title }}
      </li>

      <CheckTheme />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, nextTick, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import CheckTheme from "./CheckTheme.vue";

interface barList {
  id?: number;
  title: string;
  router: string;
  children?: barList[];
}

const router = useRouter();
const route = useRoute();

const navIndex = ref(0);
// 控制导航背景
const listItem = ref();
const ulParent = ref();
const activeBgRef = ref();

const isOpenMobileBar = ref(false);

const screenWidth = ref(
  window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
);

const barList = reactive([
  { id: 1, title: "首页", router: "/home" },
  {
    id: 2,
    title: "案例",
    router: "/study",
    children: [
      {
        title: "11",
        router: "/resize",
      },
      {
        title: "11",
        router: "/music",
      },
      {
        title: "11",
        router: "/tree",
      },
      {
        title: "11",
        router: "/rightClick",
      },
      {
        title: "11",
        router: "/fullPage",
      },
    ],
  },
  { id: 3, title: "学习", router: "/study" },
  { id: 4, title: "导航中心", router: "/navigation" },
  { id: 5, title: "休闲", router: "/game" },
  { id: 6, title: "其他", router: "/other" },
]);

const navClick = function (link: string, index: number, e: Event) {
  if (screenWidth.value > 780) {
    setBgPosition(index);
  } else {
    isOpenMobileBar.value = false;
  }

  navIndex.value = index;
  router.push(link);
};

const setBgPosition = (index: number) => {
  if (index == -1 || !ulParent.value) {
    return;
  }
  let parent = ulParent.value.getBoundingClientRect();
  let item = listItem.value[index].getBoundingClientRect();

  let itemLeft = parent.left - item.left;

  let bg = activeBgRef.value;
  bg.style.left = Math.abs(itemLeft) + "px";
  bg.style.width = item.width + "px";
};
const checkMobileOpen = () => {
  console.log(isOpenMobileBar.value);

  isOpenMobileBar.value = !isOpenMobileBar.value;
};

const findIndexByRouter = (list: barList[], router: string) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].router === router) {
      return i;
    } else if (list[i].children) {
      const childIndex = findIndexByRouter(list[i].children!, router);
      if (childIndex !== -1) {
        return i;
      }
    }
  }
  return -1;
};

onMounted(() => {
  setBgFn();
  window.addEventListener("resize", handleResize);
});

const setBgFn = () => {
  if (screenWidth.value > 780) {
    const studyIndex = findIndexByRouter(barList, route.path);
    navIndex.value = studyIndex;

    setBgPosition(studyIndex);
  }
};
// const changeTheme = (val: string) => {
//     switch (val) {
//       case "black":
//         window.document.documentElement.setAttribute("data-theme", "light");
//         break;
//       default:
//         window.document.documentElement.removeAttribute("data-theme");

//         break;
//     }
//     // if (val=='green') {
//     //   window.document.documentElement.setAttribute("data-theme", "light");
//     // } else {
//     //   window.document.documentElement.removeAttribute("data-theme");
//     // }
//   };
function handleResize() {
  screenWidth.value =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  setBgFn();
}

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1019607843);
  width: 100%;
  z-index: 99;
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
    display: flex;
    align-items: center;
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

  .mobileBtn {
    #checkbox {
      display: none;
    }

    .toggle {
      position: relative;
      width: 30px;
      cursor: pointer;
      margin: auto;
      display: block;
      height: calc(4px * 3 + 11px * 2);
      .bar {
        position: absolute;
        left: 0;
        right: 0;
        height: 4px;
        border-radius: calc(4px / 2);
        background: var(--text-color);
        color: inherit;
        opacity: 1;
        transition: none 0.35s cubic-bezier(0.5, -0.35, 0.35, 1.5) 0s;
      }

      /***** Spin Animation *****/

      .bar--top {
        bottom: calc(50% + 6px + 4px / 2);
        transition-property: bottom, transform;
        transition-delay: calc(0s + 0.35s), 0s;
      }

      .bar--middle {
        top: calc(50% - 4px / 2);
        transition-property: opacity;
        transition-delay: calc(0s + 0.35s);
      }
      .bar--bottom {
        top: calc(50% + 6px + 4px / 2);
        transition-property: top, transform;
        transition-delay: calc(0s + 0.35s), 0s;
      }
    }

    .toggleActive {
      .bar--top {
        bottom: calc(50% - 4px / 2);
        transform: rotate(135deg);
        transition-delay: 0s, calc(0s + 0.35s);
      }

      .bar--middle {
        opacity: 0;
        transition-duration: 0s;
        transition-delay: calc(0s + 0.35s);
      }

      .bar--bottom {
        top: calc(50% - 4px / 2);
        transform: rotate(225deg);
        transition-delay: 0s, calc(0s + 0.35s);
      }
    }
  }
}
.navMobileList {
  padding: 130px 20px 0 20px;
  overflow: hidden;
  background: var(--bg-color);
  z-index: 8;
  position: fixed;
  height: 0vh;
  // transform: translateY(-100%);
  transition: all 0.5s;
  width: 100vw;

  .mobileListUl {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-color);
    // justify-content: space-around;
    gap: 50px;
    height: 100%;
    li {
      cursor: pointer;
    }
  }
}
.openMobileList {
  height: 100vh;
  // transform: translateY(0);
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

@media (max-width: 668px) {
  .global_nav {
    .logo {
      font-size: 18px;
    }
    // font-size: 12px;
    .nav_list {
      li {
        // padding: 10px !important;
      }
    }
  }
}
@media (max-width: 780px) {
  .navMobileList {
    padding: 124px 20px 0 20px;
  }
}
@media (max-width: 668px) {
  .navMobileList {
    padding: 118px 20px 0 20px;
  }
}
@media (max-width: 450px) {
  .global_nav {
    padding: 20px;
  }
  .navMobileList {
    padding: 78px 20px 0 20px;
  }
}
</style>