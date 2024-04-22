<template>
  <div class="wrapper">
    <!-- <div class="color1"></div> -->
    <div class="color2" ref="color2Ref"></div>
    <div class="item_wrapper" ref="itemWrapperRef">
      <div class="item" v-for="(item, index) in images" :key="index">
        <img
          @mouseenter.capture="handelMouseEnter($event.target as HTMLImageElement, index)"
          @mouseleave="handelMouseLeave"
          crossorigin="anonymous"
          :src="item"
          :style="{
            opacity: hoverIndex == -1 ? 1 : index == hoverIndex ? 1 : 0.2,
          }"
          v-lazyLoad
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { log } from "console";
import ColorThief from "colorthief";
import { ref, onMounted } from "vue";
const images: string[] = [];
const hoverIndex = ref(-1);
const colorThief = new ColorThief();
const color2Ref = ref();
const itemWrapperRef = ref();

for (let i = 0; i < 9; i++) {
  images.push(`https://picsum.photos/400/400?r=${i}`);
}
onMounted(() => {});

const handelMouseEnter = async (target: HTMLImageElement, index: number) => {
  console.log(target);
  console.log();

  hoverIndex.value = index;
  const color = await colorThief.getPalette(target, 3);
  if (color) {
    const [c1, c2, c3] = color?.map((c) => `rgb(${c[0]},${c[1]},${c[2]})`);
    console.log(c1, c2, c3);
    // color2Ref.value.style.height = itemWrapperRef.value.offsetHeight + 200 + "px";
    color2Ref.value.style.background = `linear-gradient(to bottom,
    ${c1} 0%,
    ${c2} 50%,
    ${c3} 100%
  )`;

    color2Ref.value.style.opacity = `1`;
  }
};
const handelMouseLeave = () => {
  hoverIndex.value = -1;
  color2Ref.value.style.opacity = `0`;
};
</script>

<style scoped lang="scss">
.color2 {
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 1s;
  opacity: 0; /* 初始状态为完全透明 */
  width: 100%;
  height: 100%;
  z-index: 1;
}

.wrapper {
  position: relative;
  padding: 100px 0;
  width: 100%;
  height: 100%;

  .item_wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    z-index: 12;
    position: relative;
    grid-row-gap: 30px;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
      transition: all 0.3s;

      cursor: pointer;
      &:hover {
        transform: scale(1.1);
        z-index: 5;
      }
    }
  }
}

@media (max-width: 1280px) {
  .wrapper {
    .item_wrapper {
      .item {
        img {
          width: 300px;
          height: 300px;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .wrapper {
    .item_wrapper {
      grid-template-columns: repeat(2, 50%);
    }
  }
}

@media (max-width: 650px) {
  .wrapper {
    .item_wrapper {
      grid-row-gap: 60px;
      grid-template-columns: repeat(1, 100%);
      .item {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>