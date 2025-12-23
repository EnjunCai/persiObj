// src/i18n/index.js
import { createI18n } from 'vue-i18n'
import zhCn from '@/locales/zh-cn'
import en from '@/locales/en'

const i18n = createI18n({
  // 1. legacy set to false needed for Composition API
  // 必须设置为 false 才能在 Composition API 中使用
  legacy: false, 
  
  // 2. Global injection
  // 开启后，在模板中可以直接使用 $t，而在脚本中需要用 useI18n
  globalInjection: true, 
  
  // 3. Default locale
  // 默认语言，实际开发中通常从 localStorage 获取
  locale: localStorage.getItem('language') || 'zh-cn', 
  
  // 4. Fallback locale
  // 如果当前语言找不到翻译，回退到英文
  fallbackLocale: 'en', 
  
  // 5. Message payload
  messages: {
    'zh-cn': zhCn,
    'en': en
  }
})

export default i18n