import { createApp } from "vue";
// import "./style.css";
import "./styles/global.scss";
import App from "./App.vue";

import router from "./router";

import pinia from "./store";

import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js";

import Icon from "@/components/Icon.vue";
import IconTagI from "@/components/IconTagI.vue";

// import ElementPlus from "element-plusasd";
import "element-plus/dist/index.css";

import { observe } from "./directives/observe";
import { scrollReveal } from "./directives/scrollReveal";
import imgLazy from "./directives/imgLazy";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

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
