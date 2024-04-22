<template>
  <div class="wrapper">
    <div
      class="card"
      :style="[
        { overflow: isEnlarged ? 'auto' : 'hidden' },
        props.wrapperStyle,
      ]"
      ref="domRef"
      @click="toggleEnlarged"
    >
      <div v-show="isEnlarged" class="close" @click.stop="closeEnlarged">X</div>
      <slot name="content"></slot>
      <div v-show="isEnlarged">
        <slot name="detail"></slot>
      </div>
    </div>

    <div class="mask" ref="maskRef"></div>
  </div>
</template>
  
  <script setup lang="ts">
import { nextTick, ref, defineProps } from "vue";
const props = defineProps({
  wrapperStyle: {
    type: String,
  },
  container: {
    type: String,
  },
});
const isEnlarged = ref(false);
const maskRef = ref();
const domRef = ref();

const toggleEnlarged = () => {
  let target = domRef.value;
  let { top, left } = target.getBoundingClientRect();
  const scrollHeight =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;

  if (!isEnlarged.value) {
    console.log(top, left);

    target.style.position = "fixed";
    target.style.top = top + "px";
    target.style.left = left + "px";

    document.body.style.overflow = "hidden";

    const emptyDiv = document.createElement("div");
    emptyDiv.style.width = target.offsetWidth + "px" || "100px";
    emptyDiv.style.height = target.offsetHeight + "px" || "100px";
    emptyDiv.id = "cloneElement";
    target.parentNode?.insertBefore(emptyDiv, target);
    target.style.zIndex = "1000";
    maskRef.value.style.zIndex = 99;

    maskRef.value.style.opacity = 0.5;
    window.scroll(0, scrollHeight);
    setTimeout(() => {
      target.dataset.x = left + "px";
      target.dataset.y = top + "px";
      target.dataset.w = target.offsetWidth + "px";
      target.dataset.h = target.offsetHeight + "px";
      target.style.transition = "all 1s";

      target.style.top = "50%";
      target.style.left = "50%";
      target.style.width = "500px";
      target.style.height = "500px";

      target.style.transform = "translate(-50%,-50%)";
    }, 0);
  } else {
  }

  isEnlarged.value = true;
};

const closeEnlarged = () => {
  if (isEnlarged.value) {
    let target = domRef.value;
    let { top, left } = target.getBoundingClientRect();
    const element = document.getElementById("cloneElement") as HTMLDivElement;
    console.log(element?.getBoundingClientRect());
    const rect = element?.getBoundingClientRect();

    target.style.transition = "all 0.5s";

    target.style.top = rect.top + "px";
    target.style.left = rect.left + "px";
    target.style.width = rect.width + "px";
    target.style.height = rect.height + "px";
    target.style.transform = "translate(0%,0%)";

    target.style.pointerEvents = "none";
    target.style.zIndex = "1";
    maskRef.value.style.opacity = 0;

    setTimeout(() => {
      // 通过id获取要删除的元素
      console.log(element);
      document.body.style.overflow = "auto";

      if (element) {
        element.parentNode?.removeChild(element); // 从父节点中移除该元素
      }
      target.style.zIndex = "1";
      target.style.position = "";
      target.style.pointerEvents = "auto";

      target.style.top = "auto";
      target.style.left = "auto";
      maskRef.value.style.zIndex = -1;
    }, 700);

    isEnlarged.value = false;
  }
};
</script>
  
  <style scoped lang="scss">
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
}
.card {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  width: 300px;
  height: 300px;
  background-color: #fff;
  box-shadow: 0px 14px 40px 0px rgba(109, 141, 173, 0.25);
  padding: 20px;
  border-radius: 8px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.enlarged {
  position: fixed;

  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s;
}
</style>