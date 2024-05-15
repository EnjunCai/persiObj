<template>
  <div class="wrapper">
    <div class="waterfall-container">
      <WaterFull :gap="20" :column="WaterFullColumn" :request="requestData" :page-size="30">
        <template #item="{ item }">
          <el-image :src="item.url" alt="图片" class="image" lazy></el-image>
        </template>
      </WaterFull>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import WaterFull from "@/components/WaterFull/index.vue";
import type { IImageItem } from "@/components/WaterFull/type";

const WaterFullColumn = ref(5);

const screenWidth = ref(
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth
);
watch(
  () => screenWidth.value,
  (val) => {
    if (val < 1024) {
      WaterFullColumn.value = 2;
    } else if (val < 768) {
      WaterFullColumn.value = 1;
    } else {
      WaterFullColumn.value = 5;
    }
  }
);

const requestData = (page: number, pageSize: number): Promise<IImageItem[]> => {

  let url = `https://www.vilipix.com/api/v1/picture/public?limit=${pageSize}&tags=%E9%A3%8E%E6%99%AF&from=pc_web&sort=new&offset=${--page * pageSize
    }`
  // js获取当前是在什么设备，截取出来判断是pc还是手机
  const ua = navigator.userAgent;
  if (ua.indexOf("Windows") > -1) {
    // win系统

  } else {
    url = `https://m.vilipix.com/api/v1/picture/public?limit=${pageSize}&tags=%E9%A3%8E%E6%99%AF&sort=new&offset=${--page * pageSize}`
  }
  return new Promise<IImageItem[]>((resolve) => {
    fetch(

      url
    ).then(async (res) => {
      const result = await res.json();
      const imageList: IImageItem[] = result.data.rows.map((i: any) => ({
        id: i.picture_id,
        url: i.original_url,
        height: i.height,
        width: i.width,
      }));
      resolve(imageList);
    });
  });
};

function handleResize() {
  screenWidth.value =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.waterfall-container {
  margin: 100px;
  width: 80vw;
  height: 60vh;

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (max-width: 768px) {
  .waterfall-container {
    margin: 40px;
  }
}

@media (max-width: 668px) {
  .waterfall-container {
    margin: 40px;
  }
}

@media (max-width: 450px) {
  .waterfall-container {
    margin: 20px;
  }
}
</style>