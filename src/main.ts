import { createApp } from "vue";
// import "./style.css";
import "./styles/global.scss";
import App from "./App.vue";

import i18n from "./i18n/index";

import router from "./router";


// pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js";

import Icon from "@/components/Icon.vue";
import IconTagI from "@/components/IconTagI.vue";

import { setupRouterGuard } from "./router/guard/index";

// import ElementPlus from "element-plusasd";
import "element-plus/dist/index.css";

import { observe } from "./directives/observe";
import { scrollReveal } from "./directives/scrollReveal";
import imgLazy from "./directives/imgLazy";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";


/* 引入aos动画库相关文件 */
import AOS from 'aos'
import 'aos/dist/aos.css'
 
 
/* aos动画初始化 */
AOS.init({
    duration: 1000,
    easing:"ease-in-out-back"
});




const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 切换路由顶部进度条
setupRouterGuard(router);


app.use(i18n);
app.use(router);
app.use(pinia);
// app.use(ElementPlus);
app.directive("observe", observe);
app.directive("scrollReveal", scrollReveal);
app.directive("lazyLoad", imgLazy);

app.component("Icon", Icon);
app.component("IconTagI", IconTagI);

document.addEventListener;
app.mount("#app");

// const getQueryParams = () => {
//   // @return obj // 所有query组成的对象
//   let url = window.location.href;
//   let params = url.split("?")[1].split("&");
//   let obj = {};
//   for (let i = 0; i < params.length; i++) {
//     let item = params[i].split("=");
//     obj[item[0]] = item[1];
//   }

//   return obj;
// };

// console.log(getQueryParams());
