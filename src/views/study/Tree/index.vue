<template>
  <StudyNavbarVue>
    <template v-slot:main>
      <mTree :options="list2.moduleList" />

      <div>
        <div>边框滚动样式</div>
        <div class="button1"><div class="content">按钮</div></div>
      </div>

      <div>
        <div class="lbt_wrapper">
          <div class="lbt_content" ref="lbtContent">
            <div
              v-for="(item, index) in lbtData"
              :key="index"
              style="background: pink"
            >
              {{ item }}
            </div>
          </div>
          <div class="lbt_point">
            <div v-for="(item, index) in lbtData" :key="index">{{ item }}</div>
          </div>
        </div>
      </div>

      <div class="lbt_left"><</div>
      <div class="lbt_right" @click="nextLbt">></div>
    </template>
  </StudyNavbarVue>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import StudyNavbarVue from "@/components/StudyNavbar.vue";
import mTree from "@/views/study/Tree/components/mTree.vue";

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

const lbtData = ref(["t1", "t2", "t3"]);

const lbtContent = ref();

const lbtIndex = ref(1);

onMounted(() => {
  let first = lbtContent.value.firstElementChild;
  let last = lbtContent.value.lastElementChild;
});
// 点击切换下一章轮播图
const moveTo = (index: number) => {
  lbtContent.value.style.transform = `translateX(-${index * 100}%)`;
  lbtContent.value.style.transition = "all 0.3s";

  lbtIndex.value = index;
};

const nextLbt = () => {
  if (lbtIndex.value + 1 > lbtData.value.length - 1) {
    lbtIndex.value = 0;
    lbtContent.value.style.transition = "none";
    lbtContent.value.style.transform = `translateX(0%)`;

    moveTo(0);
  } else {
    moveTo(lbtIndex.value + 1);
  }
};
</script>

<style scoped lang="scss">
.lbt_wrapper {
  width: 250px;
  height: 150px;
  .lbt_content {
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;

    & > div {
      width: 100%;
      flex-shrink: 0;
      height: 100%;
    }
  }
}

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

.button1 {
  --g: 4px;
  margin-left: 40px;
  width: 200px;
  // outline: 1px solid red;
  height: 100px;
  position: relative;
  overflow: hidden;

  .content {
    z-index: 2;
    position: relative;
    color: #fff;
    text-align: center;
    line-height: 100px;
    left: var(--g);
    top: var(--g);
  }
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - var(--g) * 2);
    height: calc(100% - var(--g) * 2);
    left: var(--g);
    top: var(--g);
    background: #4e5064;
  }
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200%;
    height: 200%;
    background-color: red;
    transform-origin: left top;
    animation: rotate 2s linear infinite;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
