import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  createWebHistory,
} from "vue-router";

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
        path: "/resize",
        name: "resize",
        component: () => import("../views/study/resize/index.vue"),
      },
      {
        path: "/music",
        name: "music",
        component: () => import("../views/study/music/index.vue"),
      },
      {
        path: "/tree",
        name: "tree",
        component: () => import("../views/study/tree/index.vue"),
      },
      {
        path: "/rightClick",
        name: "rightClick",
        component: () => import("../views/study/rightClick/index.vue"),
      },
      {
        path: "/fullPage",
        name: "fullPage",
        component: () => import("../views/study/fullPage/index.vue"),
      },
    ],
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

export default router;
