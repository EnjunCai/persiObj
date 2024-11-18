import { reactive } from 'vue';

import { noteList,noteItem } from './note/noteList';

export interface ListItem {
    id?: number|string;
    title: string;
    router: string;
    childrenShowNav?: Boolean;
    text?:string;
    children?: ListItem[]|noteItem[];
  }

export const list = reactive<ListItem[]>([
  {
    id: "ddm",
    title: "低代码拖拽",
    router: "/ddm",
    text: "低代码拖拽",
  },
  {
    id: "listWebIDE",
    title: "web ide",
    router: "/webIDE",
    text: "web版本文件和文件夹读取，文件修改保存，图片预览",
  },
  {
    id: "list111",
    title: "其他",
    router: "/other",
    text: "汇总一些其他小内容更新",
  },
  {
    id: "list1",
    title: "树结构+手风琴",
    router: "/tree",
    text: "一个树结构的展开，主要展示的是高度不确定，从0到自适应高度让transition生效",
  },
  {
    id: "list2",
    title: "大屏响应式，使用scale实现，简化版本",
    router: "/resize",
  },
  {
    id: "list3",
    title: "音乐",
    router: "/music",
    text: "自定义音乐播放器（进行中）",
  },
  {
    id: "list4",
    title: "右键菜单组件",
    router: "/rightClick",
    text: "右键菜单组件",
  },
  {
    id: "list5",
    title: "抽奖",
    router: "/lotteryDraw",
    text: "几种抽奖模式",
  },{
    id: "listfdj",
    title: "图片放大镜",
    router: "/imageMagnifier",
    text: "",
  },
  {
    id: "list6",
    title: "移入到图片让背景颜色改变",
    router: "/imagesChangeBg",
    text: "用到color-thief这个组件库获取这个图片的所有主要颜色，然后取前几个进行渐变效果设置",
  },
  {
    id: "list7",
    title: "瀑布流",
    router: "/waterFullPage",
    text: "封装瀑布流",
  },
  {
    id: "list8",
    title: "卡片点击放大效果",
    router: "/CardExpansion",
    text: "卡片点击放大效果",
  },
//   {
//     id: "list10",
//     title: "自定义视频组件(开发中)",
//     router: "/video",
//     text: "自定义视频组件",
//   },
  {
    id: "list14",
    title: "地图",
    router: "/map",
    text: "地图",
  },
  {
    id: "list11",
    title: "markDown编辑器",
    router: "/markDown",
    text: "markDown编辑器(采用组件)",
  },
  {
    id: "list12",
    title: "three的一些案例",
    router: "/three",
    text: "three基础案例",
  },
  {
    id: "list15",
    title: "二次封装表格",
    router: "/MyTable",
    text: "二次封装表格",
  },
]);
