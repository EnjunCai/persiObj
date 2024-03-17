<template>
  <div>
    <div class="box_wrapper" ref="boxWrapper">
      <div v-show="!isOpen" class="openBoxPending">
        点击按钮抽奖（默认不匹配，永远抽不到前三个奖品）
      </div>
      <div class="pointer"></div>
      <div class="item_wrapper" ref="itemWrapper">
        <div
          class="item"
          :style="{ background: '' + item.color }"
          v-for="(item, index) in list2"
          :key="Number(item.id)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>

    <button v-show="!isOpen" @click="openBox">开始</button>
    <button v-show="isOpen" @click="reset">重置</button>

    <div class="options">
      指定一个id必中
      <el-radio-group v-model="radio">
        <el-radio :value="-1">不匹配</el-radio>
        <el-radio :value="1">一等奖</el-radio>
        <el-radio :value="2">二等奖</el-radio>
        <el-radio :value="3">三等奖</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface list {
  id: Number;
  title: String;
  color: String;
}
let list2 = ref<list[]>([]);
const itemWrapper = ref();
const boxWrapper = ref();
const isOpen = ref(false);

let list = ref([
  { id: 1, title: "一等奖", color: "pink" },
  { id: 2, title: "二等奖", color: "darkgoldenrod" },
  { id: 3, title: "三等奖", color: "darkturquoise" },
  { id: 4, title: "小玩具", color: "peachpuff" },
  { id: 5, title: "废品", color: "lavender" },
  { id: 6, title: "垃圾", color: "aquamarine" },
  { id: 7, title: "破烂", color: "dimgray" },
  { id: 8, title: "谢谢参与", color: "azure" },
  { id: 9, title: "下次加油", color: "fuchsia" },
  { id: 10, title: "继续努力", color: "red" },
]);

const radio = ref(-1);
const timer = ref();

function getRandomNumberExcludingEnds(number: number) {
  let integerPart = Math.floor(number); // 获取整数部分
  let decimalPart = number - integerPart; // 获取小数部分

  let randomNumber;

  let lowerBound = integerPart + 0.1;
  let upperBound = integerPart + 0.9;
  randomNumber = lowerBound + Math.random() * (upperBound - lowerBound);

  return randomNumber - number;
}

const openBox = () => {
  let dom = itemWrapper.value;
  let extendedList = [];
  isOpen.value = true;
  // 生成数据
  while (extendedList.length < 120) {
    const randomIndex = Math.floor(Math.random() * list.value.length);
    extendedList.push({ ...list.value[randomIndex] });
  }
  // 打乱
  for (let i = extendedList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [extendedList[i], extendedList[j]] = [extendedList[j], extendedList[i]];
  }

  let a = 10000 / 100;
  let b = boxWrapper.value.offsetWidth / 2 / 100;

  let index = Math.round(a + Math.ceil(b)) - 1;

  // 根据指定id进行匹配
  if (radio.value != -1) {
    const currentIdData = list.value.find((item) => item.id === radio.value);
    extendedList[index] = currentIdData as list;
  } else {
    let randomNumber410 = Math.floor(Math.random() * 7) + 4;
    if ([1, 2, 3].includes(extendedList[index].id)) {
      extendedList[index] = list.value[randomNumber410];
    }
    // console.log(randomNumber410);
  }

  list2.value = extendedList;

  // dom.style.transform = `translateX(-130px)`;

  timer.value = setTimeout(() => {
    dom.style.transition = "all 10s";

    dom.style.transform = `translateX(-${
      10000 + getRandomNumberExcludingEnds(b) * 100
    }px)`;
  }, 1000);
};

const reset = () => {
  isOpen.value = false;
  list2.value = [];
  clearTimeout(timer.value);
  let dom = itemWrapper.value;
  dom.style.transition = "none";

  dom.style.transform = `translateX(0px)`;
};
</script>

<style scoped lang="scss">
.box_wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: relative;
  .openBoxPending {
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
    overflow-wrap: break-word;
    background: #4e5064;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100px;
    color: #fff;
    z-index: 5;
  }
  .pointer {
    position: absolute;
    left: 50%;
    height: 100px;
    width: 3px;
    background: #ffd014;
    transform: translateX(-50%);
    z-index: 2;
  }

  .item_wrapper {
    display: flex;
    align-items: center;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    .item {
      width: 100px;
      height: 100px;
      flex-shrink: 0;
    }
  }
}

.options {
  color: var(--text-color);
  ::v-deep(span) {
    color: var(--text-color);
  }
}
</style>