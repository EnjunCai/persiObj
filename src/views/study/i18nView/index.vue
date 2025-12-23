<template>
  <div style="padding: 20px">
    <h1>{{ $t("login.title") }}</h1>
    <p>
      通过变量传参的形式（花括号）：{{
        $t("login.welcome_message", { name: "Jack" })
      }}
    </p>

    <!-- 这种形式是不会发生变化的 -->
    <p>变量形式不会发生改变，需要用computed绑定响应式 ：{{ text }}</p>
    <p>使用computed绑定响应式 ：{{ scriptText }}</p>

    <input :placeholder="$t('login.username_placeholder')" />
    <div class="controls">
      <button @click="changeLang('zh-cn')">中文</button>
      <button @click="changeLang('en')">English</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const text = t("common.confirm");

const scriptText = computed(() => {
  return t("common.confirm");
});

const changeLang = (lang: string) => {
  locale.value = lang; // 核心：修改 locale.value 即可全局切换
  localStorage.setItem("language", lang); // 持久化
};
</script>

<style scoped></style>
