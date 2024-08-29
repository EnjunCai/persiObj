<template>
  <input type="file" @change="handleFileChange" />
  <img :src="imageUrl" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const imageUrl = ref<string>("");
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      console.log(e.target?.result);

      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped lang="scss"></style>
