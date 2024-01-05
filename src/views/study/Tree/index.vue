
<template>
  <StudyNavbarVue>
    <template v-slot:main>
      <div class="content" @click.stop="contentClick">
        <div v-for="(m, mI) in list.moduleList" :key="m.mId" class="moduleBox">
          <div class="card" data-type="module" :data-id="m.mId">
            {{ m.title }}
          </div>
          <!-- v-show="!!currentMId && currentMId == m.mId" -->
          <div
            class="lessonList"
            :id="m.mId + '-module'"
            v-show="!!currentMId && currentMId == m.mId"
          >
            <div v-for="(l, lI) in m.lessonList" :key="l.lId" class="lessonBox">
              <div class="card" data-type="lesson" :data-id="l.lId">
                {{ l.title }}
              </div>
              <!-- v-show="!!currentLId && currentLId == l.lId" -->
              <div
                class="stepList"
                :id="l.lId + '-lesson'"
                v-show="!!currentLId && currentLId == l.lId"
              >
                <div v-for="(s, sI) in l.stepList" :key="s.sId" class="stepBox">
                  <div class="card" data-type="step" :data-id="s.sId">
                    {{ s.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </StudyNavbarVue>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StudyNavbarVue from "@/components/StudyNavbar.vue";

const currentMId = ref<string | undefined>("");
const currentLId = ref<string | undefined>("");
const currentSId = ref<string | undefined>("");

const list = ref({
  classId: "xcv",
  moduleList: [
    {
      mId: "1",
      title: "module1 ",
      lessonList: [
        {
          lId: "1-1",
          title: "lesson1 ",
        },
        {
          lId: "1-2",
          title: "lesson2 ",
          stepList: [
            {
              sId: "1-2-1",
              title: "step 1",
            },
            {
              sId: "1-2-2",
              title: "step 2",
            },
            {
              sId: "1-2-3",
              title: "step 3",
            },
          ],
        },
        {
          lId: "1-3",
          title: "lesson3 ",
        },
        {
          lId: "1-4",
          title: "lesson4",
          stepList: [
            {
              sId: "1-4-1",
              title: "step 1",
            },
            {
              sId: "1-4-2",
              title: "step 2",
            },
            {
              sId: "1-4-3",
              title: "step 3",
            },
          ],
        },
      ],
    },
  ],
});

const contentClick = (e: Event) => {
  const { type, id } = (e.target as HTMLDivElement).dataset;
  console.log(type, id);

  let clickDom: HTMLElement | null | undefined = null;

  let isOpen = true;
  switch (type) {
    case "module":
      currentMId.value = currentMId.value === id ? "" : id;
      // clickDom = document.getElementById(`${id}-module`);
      // isOpen = currentMId.value === id;
      break;
    case "lesson":
      currentLId.value = currentLId.value === id ? "" : id;
      // clickDom = document.getElementById(`${id}-lesson`);
      // isOpen = currentLId.value === id;

      break;
    case "step":
      currentSId.value = currentSId.value ? "" : id;
      break;
  }

  // if (isOpen) {
  //   clickDom.style.height = "auto";
  //   const { height } = clickDom?.getBoundingClientRect();
  //   clickDom.style.height = "0";
  //   clickDom.style.transition = ".3s";
  //   clickDom?.offsetHeight;
  //   console.log(clickDom, height);
  //   // console.log(clickDom?.getBoundingClientRect());
  //   clickDom.style.height = height + "px";
  // } else {
  //   clickDom.style.height = 0 + "px";
  // }
};
</script>

<style scoped lang="scss">
.content {
  .moduleBox,
  .lessonBox,
  .stepBox {
    padding-left: 20px;
    margin: 5px 0;

    .card {
      background: #fff;
      padding: 20px;
      border-radius: 20px;
      cursor: pointer;
    }
  }

  .stepList,
  .lessonList {
    // transition: all 0.3s;
    // height: 0;
    // overflow: hidden;
  }
}
</style>
