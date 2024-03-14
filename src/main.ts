import { createApp } from "vue";
// import "./style.css";
import "./styles/global.scss";
import App from "./App.vue";

import router from "./router";

import pinia from "./store";

import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js";

import Icon from "@/components/Icon.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.component("Icon", Icon);

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
