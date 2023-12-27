import { createApp } from "vue";
// import "./style.css";
import "./styles/global.scss";
import App from "./App.vue";
import router from "./router";

import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js";

import Icon from "@/components/Icon.vue";

const app = createApp(App);

app.use(router);
app.component("Icon", Icon);

app.mount("#app");
