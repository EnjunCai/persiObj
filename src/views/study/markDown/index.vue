<template>
  <div class="markDown-wrapper">
    <a
      target="_black"
      href="https://github.com/imzbf/md-editor-v3/blob/develop/README-CN.md"
      >文档</a
    >
    <a target="_black" href="https://marked.js.org/demo/"
      >配合Marked转换为html</a
    >

    <MdEditor v-model="text" />

    <MdPreview :editorId="id" :modelValue="text" />
  </div>
  <!-- <MdCatalog :editorId="id1" :scrollElement="scrollElement" /> -->
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

const id = "preview-only";
const id1 = "preview-only1";
const text1 = ref("# Hello Editor");
const scrollElement = document.documentElement;
const infoUrl = ref();
infoUrl.value = new URL("@/assets/images/kaifa.svg", import.meta.url).pathname;
const text = ref(`# Hello Editor

![图片](${infoUrl.value})`);

// # 通过vercel发布静态页面
// 前提：需要一个域名

// 进入[vercel](https://vercel.com/)

// 登录绑定你项目
// t1

// 进入后点击Project绑定项目
// t2

// 里面选择你需要发布的项目
// t3

// 导入成功后会在你的主界面看到这个项目，到这里已经发布上去，但是国内无法访问，需要进行额外配置
// t4

// ![图片](/src/assets/images/kaifa.svg)

watch(
  () => text.value,
  (val) => {
    console.log(val);
  }
);
</script>

<style scoped lang="scss">
.markDown-wrapper {
  padding: 40px;
}
</style>
