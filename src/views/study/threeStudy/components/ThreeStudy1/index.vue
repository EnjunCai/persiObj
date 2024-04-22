<template>
  <div ref="containerRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  AxesHelper,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry,
} from "three";
// 定义一个容器
const containerRef = ref();
// 创建一个场景
const scene = new Scene();
// 创建一个摄像机
// 参数1：所能看到的一个角度，参数2：宽高比，参数3：看的最近距离，参数4：看的最远距离
const camera = new PerspectiveCamera(45, 1000 / 800, 0.1, 1000);
// 设置摄像机位置,三个参数 x,y,z
camera.position.set(-30, 40, 30);
// 设置相机的朝向
camera.lookAt(scene.position);

// 创建一个渲染
const renderer = new WebGLRenderer();
// 类似设置背景颜色
renderer.setClearColor(new Color("#ccc"));
// 渲染的宽高
renderer.setSize(1000, 800);

// 创建一个坐标轴,参数就是坐标的大小
const axes = new AxesHelper(20);
scene.add(axes);

// 创建一个平面几何体，参数为宽高
const planeGeometry = new PlaneGeometry(10, 10);
// 生成一个材质
const meshBasicMaterial = new MeshBasicMaterial({ color: "#fcfcfc" });
// 将几何体和材质放入Mesh生成
const plane = new Mesh(planeGeometry, meshBasicMaterial);

// rotation是设置旋转
plane.rotation.x = -0.4 * Math.PI;
// plane.rotation.y = -0.4 * Math.PI;
// 可以通过position改变xyx位置，默认是原点
// 添加到场景
scene.add(plane);

// // 生成一个立方体参数：长宽高
const cubeGeometry = new BoxGeometry(4, 4, 4);
const cubeMaterial = new MeshBasicMaterial({
  color: "#fcfcfc",
  // wireframe: true,//是否为线框
});
const cube = new Mesh(cubeGeometry, cubeMaterial);
// cube.position.set(2, 2, 2);
cube.position.z = 20;
scene.add(cube);

// 生成一个球体
const sphereGeometry = new SphereGeometry(4);
const sphereMaterial = new MeshBasicMaterial({
  color: "#fcfcfc",
  wireframe: true, //是否为线框
});
const sphere = new Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 20;
scene.add(sphere);
onMounted(() => {
  //生命周期注意，必须有dom元素才能渲染
  // 添加到dom元素中
  containerRef.value?.appendChild(renderer.domElement);
  // 渲染
  renderer.render(scene, camera);
});
</script>

<style scoped>
</style>