<template>
  <div class="page">
    <div class="left">
      <div class="title">组件</div>
      <draggable
        :list="leftMenu"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="clone"
        :sort="false"
        itemKey="id"
        animation="300"
      >
        <template #item="{ element, index }">
          <el-button class="btns move" :key="index">
            <template #icon v-if="element.type === 'Input'"></template>
            <template #icon v-if="element.type === 'Textarea'"></template>
            {{ element.name }}
          </el-button>
        </template>
      </draggable>
    </div>
    <div class="center">
      <!-- <div class="center-title">编辑字段</div> -->
      <draggable
        class="dragArea list-group"
        :list="centerData"
        group="people"
        @change="log"
        animation="300"
        item-key="id"
      >
        <template #item="{ element, index }">
          <div class="inputItem move" @click="focusInput(element)">
            <div class="form-title move">{{ element.name }}</div>
            <div>
              <el-input
                v-model:value="input"
                @focus="focusInput(element)"
                v-if="element.type === 'Input'"
                :placeholder="element.placeholder"
                :key="index"
              />
            </div>
            <div>
              <el-input
                :key="index"
                v-model:value="textarea"
                show-count
                :maxlength="200"
                @focus="focusInput(element)"
                :placeholder="element.placeholder"
                v-if="element.type === 'Textarea'"
                type="textarea"
              />
            </div>
            <div class="delItem" @click="deleteComponent(index)">X</div>
          </div>
        </template>
      </draggable>
    </div>
    <div class="right" v-if="rightData">
      <div class="title">{{ rightData.type }}</div>
      <div class="rightContent">
        <el-form
          ref="ruleFormRef"
          :model="rightData"
          status-icon
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item label="标识名" prop="name">
            <el-input v-model="rightData.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="placeholder" prop="placeholder">
            <el-input v-model="rightData.placeholder" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { ref, defineExpose, reactive, createVNode } from "vue";

import draggable from "vuedraggable";

const formRef = ref();
const input = ref("");
const textarea = ref("");

// 左侧组件菜单
const leftMenu = [
  {
    name: "单行文本",
    type: "Input",
    isChecked: true,
    placeholder: "请输入",
  },
  {
    name: "多行文本",
    type: "Textarea",
    isChecked: false,
    placeholder: "请输入",
  },
];

// clone一个新的拖动组件的值
const clone = (obj: any) => {
  // 深拷贝一个对象，否则三个数据指向的都是一个地址，
  const newObj = JSON.parse(JSON.stringify(obj));
  return newObj;
};
// 中间数据
const centerData = reactive([]);
// 右侧
let rightData = ref();

const log = (evt: any) => {
  console.log(evt);
  rightData.value = evt.added.element;
  window.console.log(evt);
};

// 鼠标聚焦输入框时，显示右侧内容
const focusInput = (item: any) => {
  console.log(rightData);

  rightData.value = item;
};
// 删除
const deleteComponent = (index: number) => {
  ElMessageBox.confirm("确定要删除该组件吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      centerData.splice(index, 1);
    })
    .catch(() => {
      // 取消操作的逻辑，如果需要可以在这里添加
    });
};

// 表单校验
const checkForm = () => {
  formRef.value.validateFields().then(async () => {
    // console.log(centerData)
  });
};
// 获取中间内容
defineExpose({
  checkForm,
});
</script>

<style scoped lang="scss">
.page {
  height: calc(-90px + 100vh);
  // padding: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  .left {
    width: 20%;
    padding: 20px;
    position: absolute;
    left: 10px;
    box-shadow: inset -1px 0 #ebedf0;
    height: 100%;
    .btns {
      margin: 0 10px;
    }
  }
  .center {
    padding: 20px;
    position: relative;
    width: 440px;
    background: #ffffff;
    margin: 0 auto;

    .inputItem {
      padding: 10px 20px 30px 20px;
      background-color: #78adff;
      border-radius: 5px;
      margin: 15px;
      cursor: move;
      position: relative;
      .form-title {
        margin-bottom: 10px;
        margin-left: 5px;
      }
      .delItem {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 hsla(0, 0%, 63.9%, 0.5);
        background-color: #ffffff;
        color: #001529;
        text-align: center;
        position: absolute;
        bottom: -10px;
        right: 10px;
      }
      .delItem:hover {
        cursor: pointer;
        background-color: #4169e1;
        color: #ffffff;
      }
    }
    .draggable {
      // height: 300px;
    }

    .dragArea {
      height: 100%;
      overflow: auto;
      border-radius: 20px;

      box-shadow: 2px 8px 20px #0000001f, 0 2px 8px #0000000a;
    }
  }
  .right {
    box-shadow: inset 1px 0 #ebedf0;

    padding: 20px;
    width: 25%;
    height: 100%;
    position: absolute;
    right: 0;
    .rightContent {
      background-color: #ffffff;
      padding: 10px 20px;
    }
  }
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
