<template>
  <div v-for="(item, index) in newOptions" :key="item.id" class="Box">
    <div class="titleBox">
      <div v-show="!!item.isChecked"><Icon class="#icon-xiangsu_xiaoya" /></div>
      <div class="card" :data-id="item.id" @click.stop="openC(item)">
        {{ item.title }}

        <div
          v-if="item.children && !!item.children.length"
          :style="{
            transform: !item.isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'all .3s',
          }"
        >
          <Icon class="#icon-quanzhankai" />
        </div>
      </div>
    </div>
    <div
      class="list"
      :style="{
        'grid-template-rows': item.isOpen ? '1fr' : '0fr',
      }"
    >
      <div>
        <mTree :options="item.children"></mTree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Prop, ref } from "vue";

export interface options {
  id: number | string;
  title: string;
  isFolder?: boolean;
  children?: Array<options>;
  isOpen?: boolean;
  isChecked?: boolean;
}

interface Props {
  options: Array<options>;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
});
const newOptions = ref(props.options);

const openC = (item: options) => {
  // console.log(newOptions);

  if (item.isOpen) {
    item.isOpen = false;
  } else {
    for (let i of newOptions.value) {
      console.log(i);
      i.isOpen = false;
      if (i.children && !!i.children?.length) {
        for (let j of i.children) {
          j.isOpen = false;
        }
        if (item.children) {
          item.children[0].isOpen = true;
        }
      }
    }
    item.isOpen = !item.isOpen;
  }
};
</script>

<style scoped lang="scss">
.titleBox {
  display: flex;
  align-items: center;
}
.Box {
  padding-left: 20px;
  margin: 5px 0;

  .card {
    background: #fff;
    padding: 20px;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  .list {
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.3s;
    min-height: 0;
    & > div {
      overflow: hidden;
    }
  }
}
</style>