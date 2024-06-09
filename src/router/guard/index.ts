import type { Router } from "vue-router";
import * as nProgress from "nprogress";
import "nprogress/nprogress.css";
nProgress.configure({
  easing: "ease", // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: "body", //指定进度条的父容器
});
export function setupRouterGuard(router: Router) {
  createProgressGuard(router);
}
export function createProgressGuard(router: Router) {
  console.log(router);
  router.beforeEach(async () => {
    nProgress.start();
    return true;
  });
  router.afterEach(async () => {
    nProgress.done();
    return true;
  });
}
