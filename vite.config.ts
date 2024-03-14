import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import legacy from "@vitejs/plugin-legacy";

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  publicDir: "public",
  cacheDir: "node_modules/.vite",
  // 构建输出配置
  build: {
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
