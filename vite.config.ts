import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import legacy from "@vitejs/plugin-legacy";

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import { autoComplete, Plugin as importToCDN } from "vite-plugin-cdn-import";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  publicDir: "public",
  cacheDir: "node_modules/.vite",

  // 构建输出配置
  build: {
    chunkSizeWarningLimit: 1000, // 单个模块文件大小限制1000KB
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 静态资源拆分
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },

    outDir: "./dist",
    target: "modules",
    assetsDir: "assets",
    assetsInlineLimit: 360000,
  },
  plugins: [
    vue(),
    legacy(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // importToCDN({
    //   // prodUrl: "https://unpkg.com/{name}@{path}",
    //   modules: [
    //     // autoComplete('vue'),
    //     // autoComplete('axios'),
    //     // {
    //     //   name: 'vue',
    //     //   var: 'Vue',
    //     //   path: 'https://unpkg.com/vue@3.3.4'
    //     // },
    //     {
    //       name: "vue",
    //       var: "Vue",
    //       path: "https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.global.min.js",
    //     },
    //     {
    //       name: "vue-demi", // vue版本选好 不然会报错
    //       var: "VueDemi",
    //       path: "https://cdn.bootcdn.net/ajax/libs/vue-demi/0.14.6/index.iife.min.js",
    //     },
    //     {
    //       name: "vue-router",
    //       var: "VueRouter",
    //       path: "https://cdn.bootcdn.net/ajax/libs/vue-router/4.2.4/vue-router.global.min.js",
    //     },
    //     {
    //       name: "element-plus",
    //       var: "ElementPlus",
    //       path: "https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.12/index.full.min.js",
    //       css: "https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.12/index.min.css",
    //     },
    //     {
    //       name: "@element-plus/icons-vue",
    //       var: "ElementPlusIconsVue", // 根据main.js中定义的来
    //       path: "https://cdn.bootcdn.net/ajax/libs/element-plus-icons-vue/2.1.0/global.iife.min.js",
    //     },
    //     {
    //       name: "pinia",
    //       var: "Pinia",
    //       path: "https://cdn.bootcdn.net/ajax/libs/pinia/2.1.6/pinia.iife.min.js",
    //     },
    //   ],
    // }),
  ],

  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
    ],
  },

  server: {
    proxy: {
      "/api": "http://mobilecdnbj.kugou.com",
    },
    cors: true,
  },
});
