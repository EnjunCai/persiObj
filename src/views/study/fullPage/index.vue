<template>
  <StudyNavbarVue>
    <template v-slot:main>
      <div class="content">
        <div ref="fullpageRef">
          <div class="section">
            <h1>Section 1</h1>
          </div>
          <div class="section">
            <h1>Section 2</h1>
          </div>
          <div class="section">
            <div class="slide">slide 1</div>
            <div class="slide">slide 2</div>
            <div class="slide">slide 3</div>
            <div class="slide">slide 4</div>
          </div>
        </div>
      </div>
    </template>
  </StudyNavbarVue>
</template>

<script setup lang="ts">
import fullpage from "fullpage.js";
import StudyNavbarVue from "@/components/StudyNavbar.vue";
import { defineComponent, ref, onMounted } from "vue";

const fullpageRef = ref<HTMLElement | null>(null);
console.log(fullpageRef, 123);

onMounted(() => {
  console.log(fullpageRef, 123);

  if (fullpageRef.value) {
    console.log(fullpage);

    new fullpage(fullpageRef.value, {
      // 在这里配置fullpage.js的选项
      sectionsColor: ["#f2f2f2", "#4BBFC3", "#7BAABE"],
      navigation: true,
      anchors: ["section1", "section2", "section3"],
      menu: "#menu",
    });
  }
});
</script>

<style scoped>
.section {
  text-align: center;
}
</style>