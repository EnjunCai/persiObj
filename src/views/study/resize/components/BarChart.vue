<template>
  <div ref="main" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, onUnmounted } from "vue";
import * as echarts from "echarts";
const main = ref();

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(main.value);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
  // 指定图表的配置项和数据
  var option = {
    tooltip: {},
    legend: {
      data: ["销量"],
      top: "20",
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      axisLabel: {
        color: "#fff",
      },
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