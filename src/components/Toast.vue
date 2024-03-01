
<template>
  <div v-if="visible" class="toast">
    {{ message }}
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

const visible = ref(false);
const message = ref("");

const show = (msg) => {
  message.value = msg;
  visible.value = true;
  setTimeout(() => {
    hide();
  }, 3000);
};

const hide = () => {
  visible.value = false;
};
</script>
  
  <style>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
  