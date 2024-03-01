<template>
  <StudyNavbarVue>
    <template v-slot:main>
      <div class="content">
        <div>
          <RightClick :menus="menus" @select="selectHandle">
            <div class="card1">123</div>
          </RightClick>
        </div>

        <RightClick :menus="menus2" @select="selectHandle">
          <div class="card1">112323</div>
        </RightClick>
      </div>
    </template>
  </StudyNavbarVue>
</template>

<script setup lang="ts">
import StudyNavbarVue from "@/components/StudyNavbar.vue";

import { ref } from "vue";
import RightClick from "./components/RightClick.vue";

const menus = ref([{ label: "复制" }, { label: "粘贴" }]);
const menus2 = ref([{ label: "复制" }, { label: "粘贴123" }]);

const selectHandle = (str: string) => {
  console.log(str);
};
</script>

<style scoped lang="scss">
.card1 {
  width: 500px;
  height: 500px;
  background: pink;
}

.content {
  display: flex;
}
</style>