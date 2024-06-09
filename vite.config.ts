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
