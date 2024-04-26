<template>
    <i :class="['iconfont', classId]" :style="{ color: color, fontSize: fontSize + 'px' }"></i>
</template>

<script setup lang="ts">
import { id } from "element-plus/es/locale";
import { ref, defineProps } from "vue";
const props = defineProps({
    classId: String, //需要添加的字体图标类
    color: {
        //图标颜色
        type: String,
        default: "#4e5064",
    },
    fontSize: {
        //图标大小
        type: [String, Number],
        default: 16,
    },
});
</script>
<style scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    /* fill: currentColor; */
    overflow: hidden;
}
</style>