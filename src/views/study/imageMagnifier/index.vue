<template>
  <div>
    <div
      class="img-wrap"
      ref="imgWrap"
      @mouseover="handleMouseover"
      @mouseout="handleMouseout"
      @mousemove="handleMousemove"
    >
      <img src="/src/assets/images/taolun.svg" />
      <div ref="mask" class="mask"></div>
    </div>
    <div ref="bigImgBox" class="big-img-wrap">
      <img ref="bigImg" src="/src/assets/images/taolun.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const imgWrap = ref();
const mask = ref();
const bigImgBox = ref();
const bigImg = ref();
const handleMouseover = () => {
  console.log("over");
  mask.value.style.display = "block";
  bigImgBox.value.style.display = "block";
};

const handleMouseout = () => {
  console.log("out");
  mask.value.style.display = "none";
  bigImgBox.value.style.display = "none";
};


// 实现概括
// 1、三个盒子：原图、遮罩层、大图，原图和遮罩层为一组，
// 2、原图外层监听鼠标移入移除事件，是否显示遮罩层和大图，
const handleMousemove = (e: MouseEvent) => {
  let x = e.pageX - imgWrap.value.offsetLeft;
  let y = e.pageY - imgWrap.value.offsetTop;

  // 3.2 计算遮罩层的移动位置
  // 移动位置 = 鼠标的移动距离 - 遮罩层自己宽度\高度的一半(鼠标会在遮罩层中心位置,否则在左上角)
  var maskX = x - mask.value.offsetWidth / 2;
  var maskY = y - mask.value.offsetWidth / 2;

  // 4、控制遮罩层的移动范围
  // 4.1 计算遮罩层最大移动宽度\高度 = 原图盒子的宽度\高度 - 遮罩层的宽度\高度
  var maskMaxX = imgWrap.value.offsetWidth - mask.value.offsetWidth;
  var maskMaxY = imgWrap.value.offsetHeight - mask.value.offsetHeight;
  console.log(imgWrap.value.offsetWidth, "--", mask.value.offsetWidth);

  // 如果移动距离 大于 最大移动距离，则取最大的移动距离
  // 如果移动距离 小于 0，则取0;
  maskX = maskX > maskMaxX ? maskMaxX : maskX < 0 ? 0 : maskX;
  maskY = maskY > maskMaxY ? maskMaxY : maskY < 0 ? 0 : maskY;

  // 计算结果赋给遮罩层
  mask.value.style.left = maskX + "px";
  mask.value.style.top = maskY + "px";

  // 5、按比例显示大图
  // 5.1 放大比例 = 原图的宽度 / 大图的宽度 = 1 / 3
  var rate = imgWrap.value.offsetLeft / bigImg.value.offsetWidth;

  // 5.2 大图的移动距离 = 遮罩层的移动距离 * 放大比例 (注意大图的移动方向与遮罩层相反)
  bigImg.value.style.left = -maskX * 3 + "px";
  bigImg.value.style.top = -maskY * 3 + "px";
};
</script>

<style lang="scss" scoped>
.img-wrap,
.big-img-wrap {
  width: 300px;
  height: 300px;
  overflow: hidden;
}
.img-wrap {
  position: relative;

  img {
    width: 100%;
  }

  .mask {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: rgba($color: yellow, $alpha: 0.5);
    left: 0;
    top: 0;
    display: none;
  }
}
.big-img-wrap {
  display: none;
  position: relative;
  img {
    position: absolute;
    width: 300%;
    height: 300%;
  }
}
</style>
