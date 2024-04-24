<template>
  123

  <qrcode-stream @detect="onDetect" v-if="isScanning">123</qrcode-stream>
  <el-button @click="startScanning">点我扫码</el-button>

 <p>{{ ResData }}</p>
</template>
  
  <script setup lang="ts">
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import { ref } from "vue";
const MyComponent = {
  //
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },

  // ...
};

const isScanning = ref(false);
const ResData = ref()

// ts声明下面的函数
const onDetect = (detectedCodes:any) => {
  console.log(detectedCodes);
  ResData.value=ResData
};

const startScanning = () => {
  isScanning.value = true;
};
</script>
  
  <style scoped lang="scss">
</style>