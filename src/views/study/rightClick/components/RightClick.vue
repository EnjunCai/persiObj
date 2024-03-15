<template>
  <div ref="containerRef" class="wrapper">
    <slot></slot>
    <Teleport to="body">
      <transition
        @before-enter="handleBeforeEnter"
        @enter="handelEnter"
        @after-enter="handleAfterEnter"
      >
        <div
          v-show="isShow"
          class="menuWrapper"
          :style="{
            left: x + 'px',
            top: y + 'px',
          }"
        >
          <div class="menu">
            <div
              class="menuItem"
              v-for="(item, index) in menus"
              @click="handleItem(item.label)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useContainerMenu from "./useContainerMenu";
export interface menus {
  id?: number | string;
  label: string;
}
interface Props {
  menus: Array<menus>;
}

const props = withDefaults(defineProps<Props>(), {
  menus: () => [],
});

const containerRef = ref(null);
const { x, y, isShow } = useContainerMenu(containerRef);
const emit = defineEmits(["select"]);

const handleItem = (label: string) => {
  isShow.value = false;
  emit("select", label);
};

const handleBeforeEnter = (el: Element) => {
  const element = el as HTMLElement;

  element.style.height = "0";
};
// 你可以通过在函数内部创建一个新的变量来避免重复的类型断言：

const handelEnter = (el: Element) => {
  console.log(el);
  const element = el as HTMLElement;
  element.style.height = "auto";
  const h = element.clientHeight;
  element.style.height = "0";
  requestAnimationFrame(() => {
    element.style.height = h + "px";
    element.style.overflow = "hidden";
    element.style.transition = "all .3s";
  });
};

const handleAfterEnter = (el: Element) => {
  const element = el as HTMLElement;

  element.style.transition = "none";
};
</script>

<style scoped lang="scss">
.wrapper {
  //   width: auto;
  display: inline;
}
.menuWrapper {
  position: fixed;
  background: #eee;
  padding: 10px;
  border: 1px solid #00000015;
  border-radius: 8px;
  box-shadow: 0px 14px 40px 0px rgba(109, 141, 173, 0.25);

  .menuItem {
    border-radius: 4px;
    margin: 5px 0;
    padding: 2px 4px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: #ccc;
    }
  }
}
</style>