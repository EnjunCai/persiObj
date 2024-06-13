<template>
  <el-card>
    <template #header>
      <span>普通</span>
    </template>
    <Table
      :columns="tableColumn1"
      :table-data="tableData"
      @selection-change="handleSelection"
      @command="handleAction"
      @pagination-change="handlePaginationChange"
      :options="{
        showPagination: true,
        paginationConfig: {
          currentPage: 1,
          pageSize: 10,
          total: 4,
        },
      }"
    >
      <!-- 插槽自定义表头  addressHeader就是tableColumn中地址那一列定义的 -->
      <template #addressHeader="{ column }">
        <span>{{ column.label }}(插槽自定义表头)</span>
      </template>
    </Table>
  </el-card>

  <el-card>
    <template #header>
      <span>Render 函数自定义列、自定义表头</span>
    </template>
    <Table
      :columns="tableColumn"
      :table-data="tableData"
      @selection-change="handleSelection"
      @command="handleAction"
    >
      <!-- 插槽自定义表头  addressHeader就是tableColumn中地址那一列定义的 -->
      <template #addressHeader="{ column }">
        <span>{{ column.label }}(插槽自定义表头)</span>
      </template>
    </Table>
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox, ElMessage, ElTag, ElButton } from "element-plus";
import dayjs from "dayjs";
import { h } from "vue";
import Table from "./components/TableC.vue";
import { number } from "echarts";
// 本项目Table组件自动引入，如复制此代码，需根据路径引入Table组件后使用
interface User {
  date: number;
  name: string;
  address: string;
}
const tableData: User[] = [
  {
    date: 1660737564000,
    name: "佘太君",
    address: "上海市普陀区金沙江路 1516 弄",
  },
  {
    date: 1462291200000,
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: 1462032000000,
    name: "王小帅",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: 1462204800000,
    name: "王小呆",
    address: "上海市普陀区金沙江路 1516 弄",
  },
];
const tableColumn: Table.Column[] = [
  { type: "selection", width: "50" },
  { type: "index", width: "50", label: "No." },
  { prop: "name", label: "名字" },
  // 日期使用render函数格式化
  {
    prop: "date",
    label: "日期",
    headerRender: ({ column }) =>
      h(ElTag, { type: "danger" }, () => `${column.label}(渲染函数自定义表头)`),
    render: ({ row }) => h("span", dayjs(row.date).format("YYYY-MM-DD HH:mm")),
  },
  {
    prop: "address",
    label: "地址",
    headerSlot: "addressHeader",
    showOverflowTooltip: true,
  },
  // 按钮使用render函数渲染
  {
    width: "140",
    label: "操作",
    render: (row: { row: User; index: number }) =>
      // 渲染单个元素
      //   h(
      //             ElButton,
      //             {
      //                 type: 'primary',
      //                 size: 'small',
      //                 onClick: () => handleRenderEdit(row, index)
      //             },
      //             { default: () => '编辑' }
      //         ),
      // 渲染多个元素
      h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => handleRenderEdit(row),
          },
          { default: () => "编辑" }
        ),
        h(
          ElButton,
          {
            type: "danger",
            size: "small",
            onClick: () => handleRenderDelete(row),
          },
          { default: () => "删除" }
        ),
      ]),
  },
];

const tableColumn1: Table.Column[] = [
  { type: "selection", width: "50" },
  { type: "index", width: "50", label: "No." },
  { prop: "name", label: "名字" },
  // 日期使用render函数格式化
  {
    prop: "date",
    label: "日期",
  },
  {
    prop: "address",
    label: "地址",
  },
  // 按钮使用render函数渲染
  {
    width: "140",
    label: "操作",
    render: (
      row: { row: User; index: number },
      index: number | string | undefined
    ) => {
      console.log(row, index, "=======");

      return h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => handleRenderEdit(row),
          },
          { default: () => "编辑" }
        ),
        h(
          ElButton,
          {
            type: "danger",
            size: "small",
            onClick: () => handleRenderDelete(row),
          },
          { default: () => "删除" }
        ),
      ]);
    },
  },
];
const handleRenderEdit = (row: { row: User; index: number }) => {
  //   console.log(row.row.name, index);

  //   let { row: User, index: index } = row;
  ElMessage.success(`${row.row.name} ----- ${row.index}`);
};
const handleRenderDelete = (row: { row: User; index: number }) => {
  ElMessage.error(`${row.row.name} ----- ${row.index}`);
};
const handleSelection = (val: User[]) => {
  console.log("父组件接收的多选数据", val);
};

const handlePaginationChange = (page: number, pageSize: number) => {
  console.log(page, pageSize);
};

const handleAction = (command: Table.Command, row: User) => {
  switch (command) {
    case "edit":
      alert("点击了编辑");
      break;
    case "delete":
      console.log("row", row);
      ElMessageBox.confirm("确认删除吗？", "提示").then(() => {
        ElMessage(JSON.stringify(row));
      });
      break;
    default:
      break;
  }
};
</script>
<style lang="scss" scoped></style>
