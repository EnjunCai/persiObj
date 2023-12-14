import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Root.vue"),
    children: [
      {
        path: "/video",
        name: "video",
        component: () => import("../views/video/index.vue"),
      },
    ],
  },
  {
    path: "/study",
    name: "study",
    component: () => import("../views/study/index.vue"),
    redirect: "/study/tree",

    children: [
      {
        path: "/study/tree",
        name: "tree",
        component: () => import("../views/study/Tree/index.vue"),
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
