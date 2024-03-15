<template>
  <StudyNavbarVue>
    <template v-slot:main>
      <div class="content">
        <div>
          <RightClick :menus="menus" @select="selectHandle">
            <div class="card1">右键试试自定义菜单</div>

            <RightClick :menus="menus3" @select="selectHandle">
              <div class="card3">右键试试自定义菜单3,我是嵌套的</div>
            </RightClick>
          </RightClick>
        </div>

        <RightClick :menus="menus2" @select="selectHandle">
          <div class="card2">右键试试自定义菜单2</div>
        </RightClick>
      </div>
    </template>
  </StudyNavbarVue>
</template>

<script setup lang="ts">
import StudyNavbarVue from "@/components/StudyNavbar.vue";

import { ref } from "vue";
import RightClick from "./components/RightClick.vue";

const menus = ref([
  { label: "复制" },
  { label: "粘贴" },
  { label: "我是card1" },
]);
const menus2 = ref([
  { label: "复制" },
  { label: "粘贴" },
  { label: "我是card2" },
]);
const menus3 = ref([
  { label: "复制" },
  { label: "粘贴" },
  { label: "我是card3" },
]);

const selectHandle = (str: string) => {
  console.log(str);
};
</script>

<style scoped lang="scss">
.content {
  gap: 10px;
  display: flex;
  & > div {
    flex: 1;
  }
}
.card1,
.card2,
.card3 {
  padding: 10px;
  border-radius: 10px;
}
.card1,
.card2 {
  width: 100%;
  position: relative;
  height: 300px;
  background: pink;
}
.card3 {
  position: absolute;
  left: 200px;
  top: 300px;
  width: 200px;
  height: 100px;
  background: #bce0c9;
}
</style>