<template>
  <h2>背景渐变动画,Houdini Api（css）</h2>
  <div class="card"></div>
</template>

<script lang="tsx" setup></script>

<style lang="scss" scoped>
// 声明一个css属性
// @property --direc {
//   syntax: "<angle>";  接收什么样的值，这里是个角度，也可以是length,color
//   initial-value: 0deg;  默认值是什么
//   inherits: false;    是否可以继承
// }
@property --direc {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.card {
  --direc: 0deg;
  border-radius: 50%;
  width: 400px;
  height: 400px;
  background-image: linear-gradient(
    var(--direc),
    #e6fad5,
    #9bda09 43%,
    #719902
  );
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  to {
    --direc: 360deg;
  }
}
</style>
