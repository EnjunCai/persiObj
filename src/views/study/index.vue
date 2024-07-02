<template>
  <div class="wrapper">
    <div
      class="card-wrapper"
      v-for="item in list1"
      :key="item.id"
      @click="navClick(item.router)"
    >
      <div class="card">
        <div class="title">{{ item.title }}</div>
        <div class="card__content">
          <p class="card__title">{{ item.title }}</p>
          <p class="card__description">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ListItem, list } from "../navList";

const router = useRouter();
const route = useRoute();

const list1 = reactive(list);

const msg = ref("study");

const navClick = function (link: string) {
  router.push(link);
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  // gap: 30px;
  // margin-left: 30px;
  // margin-top: 30px;
  // margin-bottom: 30px
  flex-wrap: wrap;
  // justify-content: space-around;
  // width: calc(100vw - 350px);
  padding: 10px;
}

.card-wrapper {
  padding: 10px;
  width: calc(33.333%);
}
.card {
  position: relative;
  height: 200px;
  // background: linear-gradient(-45deg, #bce0c9 0%, #599e8d 100%);
  background: url("../../assets/images/09.webp") no-repeat;
  background-position: 87% 63%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;

  .title {
    font-size: 24px;
    color: #333;
    padding: 0 20px;
    font-weight: 700;
  }
}

.card:hover {
  // transform: rotate(-5deg) scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  background-position: 7% 3%;
}

.card__content {
  position: absolute;
  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%) rotate(-45deg);
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  box-sizing: border-box;
  background: url("../../assets/images/09.webp") no-repeat;
  background-position: 87% 63%;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.card:hover .card__content {
  transform: translate(-50%, -50%) rotate(0deg);
  opacity: 1;
  background-position: 7% 3%;
}

.card__title {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}

.card__description {
  margin: 10px 0 0;
  font-size: 14px;
  color: #777;
  line-height: 1.4;
}

@media (max-width: 730px) {
  .card-wrapper {
    width: 100%;
  }
}
</style>
