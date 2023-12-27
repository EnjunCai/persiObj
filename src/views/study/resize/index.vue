<template>
  <StudyNavbarVue>
    <template v-slot:main>
      <div ref="main" style="width: 100%; height: 400px"></div>
    </template>
  </StudyNavbarVue>
</template>

<script setup lang="ts">
import StudyNavbarVue from "../../../components/StudyNavbar.vue";
import { ref, onMounted } from "vue";
// import {tq} from '@/axios/api'
import { wyTop } from "@/axios/api/test";
//  按需引入 echarts
import * as echarts from "echarts";
const main = ref(); // 使用ref创建虚拟DOM引用，使用时用main.value
onMounted(() => {
  wyTop().then((res) => {
    console.log(res);
  });
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(main.value);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
});
</script>

<style scoped>
</style>






