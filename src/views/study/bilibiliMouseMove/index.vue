<template>
  <div class="animated-banner">
    <div class="layer">
      <img src="/src/assets/images/bilibili/b1.webp" />
    </div>
    <div class="layer">
      <img src="/src/assets/images/bilibili/b2.webp" />
    </div>
    <div class="layer">
      <img
        src="/src/assets/images/bilibili/b3.webp"
        style="
          height: 76px;
          width: 826px;
          transform: translate(0px, -40px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img src="/src/assets/images/bilibili/b4.webp" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.animated-banner {
  position: relative;
  height: 200px;
  overflow: hidden;

  .layer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>