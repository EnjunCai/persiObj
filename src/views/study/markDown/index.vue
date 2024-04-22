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

    <MdPreview :editorId="id" :modelValue="text1" />
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

const text = ref(`# Hello Editor

![图片](/src/assets/images/kaifa.svg)`);

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