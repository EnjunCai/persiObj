
<template>
  <StudyNavbarVue>
    <template v-slot:main>
      <!-- <mTree :options="list2.moduleList" /> -->
    </template>
  </StudyNavbarVue>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StudyNavbarVue from "@/components/StudyNavbar.vue";
// import mTree from "./mTree.vue";

const list2 = ref({
  classId: "xcv",
  moduleList: [
    {
      id: "1",
      title: "module1 ",
      children: [
        {
          id: "1-1",
          title: "lesson1 ",
        },
        {
          id: "1-2",
          title: "lesson2 ",
          children: [
            {
              id: "1-2-1",
              title: "step 1",
            },
            {
              id: "1-2-2",
              title: "step 2",
            },
            {
              id: "1-2-3",
              title: "step 3",
            },
            {
              id: "1-2-4",
              title: "step 4",
            },
            {
              id: "1-2-5",
              title: "step 5",
            },
            {
              id: "1-2-6",
              title: "step 6",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "module1 ",
      children: [
        {
          id: "2-1",
          title: "lesson1 ",
          children: [
            {
              id: "2-2-1",
              title: "step 1我是默认展开",
              isChecked: true,
            },
            {
              id: "2-2-2",
              title: "step 2",
            },
            {
              id: "2-2-3",
              title: "step 3",
            },
          ],
        },
        {
          id: "2-2",
          title: "lesson2 ",
          children: [
            {
              id: "2-2-1",
              title: "step 1",
            },
            {
              id: "2-2-2",
              title: "step 2",
            },
            {
              id: "2-2-3",
              title: "step 3",
            },
          ],
        },
      ],
    },
  ],
});
</script>

<style scoped lang="scss">
.content {
  .moduleBox,
  .lessonBox,
  .stepBox {
    padding-left: 20px;
    margin: 0 5px;

    .card {
      background: #fff;
      padding: 20px;
      border-radius: 20px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }
  }

  .stepList,
  .lessonList {
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.3s;
    min-height: 0;
    // height: 0;
    // overflow: hidden;
    & > div {
      overflow: hidden;
    }
  }
}
</style>
