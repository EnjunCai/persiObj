<template>
  <div class="navigation_wrapper">
    <div class="item_wrapper" v-for="(item, index) in list" :key="item.id">
      <div class="label">{{ item.title }}</div>
      <div class="itemChildren_wrapper">
        <div
          v-for="(itemC, indexC) in item.children"
          :key="itemC.id"
          class="card_wrapper"
        >
          <div class="card">
            <a class="card1" :href="itemC.link" target="_black">
              <div class="card_content">
                <!-- <div v-if="itemC.img">
                  <img :src="itemC.img" />
                </div> -->
                <div>
                  <p>{{ itemC.title }}</p>
                  <p class="small">{{ itemC.text }}</p>
                </div>
              </div>
              <div class="go-corner" href="#">
                <div class="go-arrow">
                  <el-icon color="#4e5064"><ArrowRightBold /></el-icon>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const list = ref([
  {
    title: "开发小工具",
    id: "n1",
    children: [
      {
        id: "n1_1",
        title: "JsonToAny",
        text: "根据对象内容快速生成Ts",
        img: "",
        link: "https://xiets.gitee.io/json-to-any-web/",
      },
      {
        id: "n1_2",
        title: "零代码工具箱",
        text: "包括 css（新拟态风格、玻璃风格、渐变、卡片按钮样式、阴影） 快速的可视化生成",
        img: "",
        link: "https://lingdaima.com/",
      },
      {
        id: "n1_3",
        title: "JSONPlaceholder",
        text: "虚拟数据接口",
        img: "",
        link: "https://jsonplaceholder.typicode.com/",
      },

      {
        id: "n1_4",
        title: "i Hate Regex",
        text: "正则匹配小工具",
        img: "",
        link: "https://ihateregex.io/",
      },
      {
        id: "n1_5",
        title: "Squoosh",
        text: "压缩图片",
        img: "",
        link: "https://squoosh.app/",
      },
      {
        id: "n1_5",
        title: "CODELF",
        text: "变量命名",
        img: "",
        link: "https://unbug.github.io/codelf/",
      },

      {
        id: "n1_6",
        title: "Lorem Picsum",
        text: "生成随机图片的地址",
        img: "",
        link: "https://picsum.photos/",
      },
    ],
  },
  {
    title: "不错的组件库和设计网站",
    id: "n2",
    children: [
      {
        id: "n2_1",
        title: "UIDesignDaily",
        text: "前端配色和一些设计思路参考",
        img: "",
        link: "https://www.uidesigndaily.com/",
      },
      {
        id: "n2_2",
        title: "NavNav+",
        text: "前端原生的一些样式和效果",
        img: "",
        link: "https://navnav.co/",
      },
      {
        id: "n2_3",
        title: "uiverse",
        text: "前端原生的一些样式和效果",
        img: "",
        link: "https://uiverse.io/",
      },
      {
        id: "n2_4",
        title: "pixso",
        text: "页面设计参考",
        img: "",
        link: "https://pixso.cn/",
      },
    ],
  },
  {
    title: "chatGPT",
    id: "n3",
    children: [
      {
        id: "n3_1",
        title: "chatGPT1",
        text: "可免费使用",
        img: "",
        link: "https://qhh25w.aitianhu1.top/",
      },
    ],
  },
  {
    title: "视频",
    id: "n4",
    children: [
      {
        id: "n4_1",
        title: "cokemv",
        text: "免费视频网站",
        img: "",
        link: "https://cokemv.fun/",
      },
    ],
  },
  {
    title: "游戏资源",
    id: "n5",
    children: [
      {
        id: "n5_1",
        title: "游戏天堂",
        text: "游戏资源",
        img: "",
        link: "https://www.zzzzz688.com/",
      },
      {
        id: "n5_2",
        title: "CoolGame",
        text: "游戏资源",
        img: "",
        link: "https://www.ifun.cool/",
      },
      {
        id: "n5_3",
        title: "flysheep",
        text: "游戏资源",
        img: "",
        link: "https://www.flysheep6.com/",
      },
    ],
  },
  {
    title: "其他",
    id: "n6",
    children: [
      {
        id: "n1_1",
        title: "JsonToAny",
        text: "根据对象内容快速生成Ts",
        img: "",
        link: "https://xiets.gitee.io/json-to-any-web/",
      },
    ],
  },
]);
</script>

<style scoped lang="scss">
.navigation_wrapper {
  padding: 50px;

  .item_wrapper {
    margin-bottom: 30px;
    .label {
      font-size: 22px;
      color: var(--text-color);
    }

    .itemChildren_wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      margin-top: 15px;
      margin-right: -15px;

      .card_wrapper {
        width: 20%;
        padding: 10px 15px 10px 0;
      }
      .card {
        height: 100%;
        .card1 {
          display: block;
          position: relative;
          background-color: #fff;
          border-radius: 4px;
          height: 100%;

          padding: 30px 30px;
          box-shadow: 0px 14px 40px 0px rgba(109, 141, 173, 0.25);
          text-decoration: none;
          z-index: 0;
          overflow: hidden;
          .card_content {
            display: flex;
            align-items: center;
            gap: 10px;
            img {
              width: 30px;
              border-radius: 8px;
            }
          }

          &:before {
            content: "";
            position: absolute;
            z-index: -1;
            top: -16px;
            right: -16px;
            background: #bcdfd7;
            height: 32px;
            width: 32px;
            border-radius: 32px;
            transform: scale(1);
            transform-origin: 50% 50%;
            transition: transform 0.25s ease-out;
          }
          &:hover:before {
            transform: scale(30);
          }

          p {
            font-size: 17px;
            font-weight: 400;
            line-height: 20px;
            color: #4e5064;
          }

          p.small {
            font-size: 14px;
            margin-top: 5px;
          }

          .go-corner {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 32px;
            height: 32px;
            overflow: hidden;
            top: 0;
            right: 0;
            background-color: #bcdfd7;
            border-radius: 0 4px 0 32px;
          }
          .go-arrow {
            margin-top: -4px;
            margin-right: -4px;
            color: white;
            font-family: courier, sans;
          }
        }
      }

      .card1:hover p {
        transition: all 0.3s ease-out;
      }

      .card1:hover h3 {
        transition: all 0.3s ease-out;
      }
    }
  }
}

@media (max-width: 1280px) {
  .navigation_wrapper {
    .item_wrapper {
      .itemChildren_wrapper {
        .card_wrapper {
          width: 25%;
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .navigation_wrapper {
    .item_wrapper {
      .itemChildren_wrapper {
        .card_wrapper {
          width: 33.3333333%;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .navigation_wrapper {
    .item_wrapper {
      .itemChildren_wrapper {
        .card_wrapper {
          width: 50%;
        }
      }
    }
  }
}

@media (max-width: 568px) {
  .navigation_wrapper {
    .item_wrapper {
      .itemChildren_wrapper {
        .card_wrapper {
          width: 100%;
        }
      }
    }
  }
}

@media (max-width: 450px) {
  .navigation_wrapper {
    padding: 20px;
    .item_wrapper {
      .itemChildren_wrapper {
        .card_wrapper {
          width: 100%;
        }
      }
    }
  }
}
</style>