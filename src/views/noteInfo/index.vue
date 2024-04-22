<template>
  <div class="wrapper">
    <MdPreview :editorId="ID" :modelValue="noteInfo" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { noteList } from "../note/noteList";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
const route = useRoute();

let noteInfo = ref();
const ID = "preview-" + route.params.id;

console.log(route.params.id);
onMounted(() => {
  const id = route.params.id;
  let detail = noteList.find((note) => note.id === id)?.detail;
  console.log(detail);

  let info = detail?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.raw;
  }, "");
  noteInfo.value = detail;
  console.log(info);
  noteInfo.value = info;
});
</script>

<style scoped lang="scss">
.wrapper {
  padding: 30px;
}

@media (max-width: 450px) {
  .wrapper {
    padding: 0px;
  }
}
</style>