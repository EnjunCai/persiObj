import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  createWebHistory,
} from "vue-router";

import useUserStore from "@/store/user";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Root.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "/study",
        name: "study",
        component: () => import("../views/study/index.vue"),
      },

      {
        path: "/music",
        name: "music",
        component: () => import("../views/study/music/index.vue"),
      },
      {
        path: "/tree",
        name: "tree",
        component: () => import("../views/study/Tree/index.vue"),
      },
      {
        path: "/navigation",
        name: "navigation",
        component: () => import("../views/navigation/index.vue"),
      },
      {
        path: "/game",
        name: "game",
        component: () => import("../views/game/index.vue"),
      },
      {
        path: "/rightClick",
        name: "rightClick",
        component: () => import("../views/study/rightClick/index.vue"),
      },
      {
        path: "/lotteryDraw",
        name: "lotteryDraw",
        component: () => import("../views/study/lotteryDraw/index.vue"),
      },
      {
        path: "/imagesChangeBg",
        name: "imagesChangeBg",
        component: () => import("../views/study/imagesChangeBg/index.vue"),
      },
      {
        path: "/waterFullPage",
        name: "waterFullPage",
        component: () => import("../views/study/waterFullPage/index.vue"),
      },
      {
        path: "/CardExpansion",
        name: "CardExpansion",
        component: () => import("../views/study/CardExpansionPage/index.vue"),
      },
      {
        path: "/bilibiliMouseMove",
        name: "bilibiliMouseMove",
        component: () => import("../views/study/bilibiliMouseMove/index.vue"),
      },
      {
        path: "/video",
        name: "video",
        component: () => import("../views/study/video/index.vue"),
      }, {
        path: "/other",
        name: "other",
        component: () => import("../views/study/other/index.vue"),
      },
      {
        path: "/markDown",
        name: "markDown",
        component: () => import("../views/study/markDown/index.vue"),
      },
      {
        path: "/note",
        name: "note",
        component: () => import("../views/note/index.vue"),
      },
      {
        path: "/noteInfo/:id",
        name: "noteInfo",
        component: () => import("../views/noteInfo/index.vue"),
      },
      {
        path: "/fullPage",
        name: "fullPage",
        component: () => import("../views/study/fullPage/index.vue"),
      },
      {
        path: "/three",
        name: "three",
        component: () => import("../views/study/threeStudy/index.vue"),
      },
      {
        path: "/scanCode",
        name: "scanCode",
        component: () => import("../views/study/scanCode/index.vue"),
      },
      {
        path: "/map",
        name: "map",
        component: () => import("../views/study/map/index.vue"),
      },  {
        path: "/MyTable",
        name: "MyTable",
        component: () => import("../views/study/MyTable/index.vue"),
      },{
        path: "/webIDE",
        name: "webIDE",
        component: () => import("../views/study/webIDE/index.vue"),
      },
    ],
  },
  {
    path: "/resize",
    name: "resize",
    component: () => import("../views/study/resize/index.vue"),
  },
  {
    path: '/admin',
    component: () => import("@/views/admin/index.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("../views/404.vue"),
  },
];




const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  if (to.meta.requiresAdmin && userStore.userInfo?.role !== 'admin') {
    // 如果用户没有 admin 权限，阻止导航到 /admin
    next({ path: '/' });
  } else {
    next(); // 允许访问
  }
});

export default router;
