<template>
  <div class="image-editor">
    <div class="toolbar">
      <div class="panel">
        <h4>图像调整</h4>
        <div class="control-item">
          <label>亮度 ({{ params.brightness }}%)</label>
          <input
            type="range"
            min="0"
            max="200"
            v-model.number="params.brightness"
            @input="requestDraw"
          />
        </div>
        <div class="control-item">
          <label>对比度 ({{ params.contrast }}%)</label>
          <input
            type="range"
            min="0"
            max="200"
            v-model.number="params.contrast"
            @input="requestDraw"
          />
        </div>
      </div>

      <div class="panel">
        <h4>变换与操作</h4>
        <div class="btn-group">
          <button @click="toggleFlipH">水平翻转</button>
          <button @click="toggleFlipV">垂直翻转</button>
        </div>
        <div class="btn-group" style="margin-top: 10px">
          <button :class="{ active: mode === 'view' }" @click="mode = 'view'">
            🔍 浏览/拖拽模式
          </button>
          <button :class="{ active: mode === 'mark' }" @click="mode = 'mark'">
            📍 打点模式
          </button>
        </div>
        <div class="btn-group" style="margin-top: 10px">
          <button @click="clearPoints">清除所有点</button>
          <button @click="resetAll">重置全部</button>
        </div>
      </div>
    </div>

    <div class="canvas-container" ref="containerRef">
      <canvas
        ref="canvasRef"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @wheel.prevent="handleWheel"
      ></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";

// --- 数据定义 ---
const canvasRef = ref(null);
const containerRef = ref(null);
let ctx = null;
let image = null;

// 当前操作模式：'view'(浏览拖拽) | 'mark'(打点)
const mode = ref("view");

// 图像参数
const params = reactive({
  brightness: 100,
  contrast: 100,
  flipH: false,
  flipV: false,
});

// 变换参数（缩放和平移）
const transform = reactive({
  scale: 1,
  offsetX: 0,
  offsetY: 0,
});

// 存储打点的数组（存的是相对于原图左上角的坐标）
const points = ref([]);

// 拖拽中间变量
let isDragging = false;
let dragStart = { x: 0, y: 0 };

// --- 初始化 ---
onMounted(() => {
  initCanvas();
  loadImage("https://picsum.photos/id/237/800/600"); // 替换为你的图片地址
});

const initCanvas = () => {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  ctx = canvas.getContext("2d");
};

const loadImage = (src) => {
  image = new Image();
  image.src = src;
  image.crossOrigin = "Anonymous";
  image.onload = () => {
    resetAll();
  };
};

// 使用 requestAnimationFrame 优化绘制请求
let drawPending = false;
const requestDraw = () => {
  if (!drawPending) {
    drawPending = true;
    requestAnimationFrame(() => {
      draw();
      drawPending = false;
    });
  }
};

// --- 核心绘制逻辑 (The Core) ---
const draw = () => {
  if (!ctx || !image) return;
  const canvas = canvasRef.value;

  // 1. 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ================= Layer 1: 全局变换 (缩放/平移) =================
  ctx.save();
  ctx.translate(transform.offsetX, transform.offsetY);
  ctx.scale(transform.scale, transform.scale);

  // 在这里，坐标系的原点(0,0)已经移动到了图片的左上角（经过缩放和平移后）

  // ================= Layer 2: 图像自身变换 (翻转/滤镜) =================
  ctx.save(); // 再保存一次状态，专门处理图片自身的变换

  // 处理翻转核心逻辑：
  // scale(-1, 1) 会沿原点翻转。如果想沿图片中心翻转，需要先平移到中心再翻转再移回来。
  // 这里采用简单做法：沿轴翻转后，需要把坐标系移回去。
  let drawX = 0;
  let drawY = 0;
  if (params.flipH) {
    ctx.scale(-1, 1);
    drawX = -image.width; // 因为 x 轴反了，所以要往负方向画
  }
  if (params.flipV) {
    ctx.scale(1, -1);
    drawY = -image.height; // 因为 y 轴反了，所以要往负方向画
  }

  // 应用滤镜 (利用 GPU 加速)
  ctx.filter = `brightness(${params.brightness}%) contrast(${params.contrast}%)`;

  // 绘制图片
  ctx.drawImage(image, drawX, drawY, image.width, image.height);

  ctx.restore(); // 恢复 Layer 2 的状态 (清除滤镜和翻转对后续绘制的影响)

  // ================= Layer 3: 绘制标记点 =================
  // 注意：点是在 Layer 1 的坐标系下绘制的，所以它们会跟随图片一起缩放和平移
  drawPoints();

  ctx.restore(); // 恢复 Layer 1 的状态，回到初始画布坐标系
};

// 绘制所有点
const drawPoints = () => {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  points.value.forEach((p) => {
    ctx.beginPath();
    // 在点击位置画一个红心白边的圆点
    ctx.arc(p.x, p.y, 5 / transform.scale, 0, Math.PI * 2); // 半径除以缩放倍数，保证点的大小视觉上不变
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  });
};

// --- 交互逻辑：坐标转换 (难点) ---

// 将屏幕坐标 (ClientX/Y) 转换为原始图片坐标 (ImageX/Y)
const screenToImageCoordinates = (clientX, clientY) => {
  const rect = canvasRef.value.getBoundingClientRect();
  // 1. 转成 Canvas 内部坐标
  let x = clientX - rect.left;
  let y = clientY - rect.top;

  // 2. 抵消平移
  x -= transform.offsetX;
  y -= transform.offsetY;

  // 3. 抵消缩放
  x /= transform.scale;
  y /= transform.scale;

  // 4. 抵消翻转 (如果翻转了，坐标是镜像的)
  if (params.flipH) {
    x = image.width - x;
  }
  if (params.flipV) {
    y = image.height - y;
  }

  return { x, y };
};

// --- 交互事件监听 ---

const handleMouseDown = (e) => {
  if (mode.value === "view") {
    isDragging = true;
    dragStart.x = e.clientX - transform.offsetX;
    dragStart.y = e.clientY - transform.offsetY;
  } else if (mode.value === "mark") {
    // 打点模式：计算点击位置在原图上的坐标
    const imgPoint = screenToImageCoordinates(e.clientX, e.clientY);
    // 简单的边界检查，确保点打在图片内
    if (
      imgPoint.x >= 0 &&
      imgPoint.x <= image.width &&
      imgPoint.y >= 0 &&
      imgPoint.y <= image.height
    ) {
      points.value.push(imgPoint);
      requestDraw();
    }
  }
};

const handleMouseMove = (e) => {
  if (!isDragging || mode.value !== "view") return;
  transform.offsetX = e.clientX - dragStart.x;
  transform.offsetY = e.clientY - dragStart.y;
  requestDraw();
};

const handleMouseUp = () => {
  isDragging = false;
};

// 滚轮缩放 (以鼠标为中心)
const handleWheel = (e) => {
  const scaleBy = 1.1;
  const oldScale = transform.scale;
  let newScale = e.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

  // 限制缩放范围
  newScale = Math.max(0.1, Math.min(newScale, 10));

  // 计算鼠标在 Canvas 上的相对位置
  const rect = canvasRef.value.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // 计算新的偏移量，使得鼠标指向的点在缩放后位置不变
  transform.offsetX =
    mouseX - (mouseX - transform.offsetX) * (newScale / oldScale);
  transform.offsetY =
    mouseY - (mouseY - transform.offsetY) * (newScale / oldScale);
  transform.scale = newScale;
  requestDraw();
};

// --- 按钮操作 ---
const toggleFlipH = () => {
  params.flipH = !params.flipH;
  requestDraw();
};
const toggleFlipV = () => {
  params.flipV = !params.flipV;
  requestDraw();
};
const clearPoints = () => {
  points.value = [];
  requestDraw();
};

const resetAll = () => {
  if (!image) return;
  const canvas = canvasRef.value;
  // 初始居中适配
  const scale =
    Math.min(canvas.width / image.width, canvas.height / image.height) * 0.9;
  transform.scale = scale;
  transform.offsetX = (canvas.width - image.width * scale) / 2;
  transform.offsetY = (canvas.height - image.height * scale) / 2;

  params.brightness = 100;
  params.contrast = 100;
  params.flipH = false;
  params.flipV = false;
  // points.value = [] // 是否重置点取决于需求
  requestDraw();
};
</script>

<style scoped>
.image-editor {
  display: flex;
  height: 600px;
  border: 1px solid #ddd;
  background: #333;
}

.toolbar {
  width: 220px;
  background: #444;
  color: #ddd;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 1px solid #555;
}

.panel h4 {
  margin: 0 0 10px 0;
  color: #fff;
}

.control-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-size: 14px;
}
.control-item input {
  margin-top: 5px;
}

.btn-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 6px 12px;
  background: #666;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  flex: 1;
  font-size: 13px;
}
button.active {
  background: #409eff;
  font-weight: bold;
}
button:hover {
  background: #777;
}

.canvas-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #222; /* 图片背景色 */
  cursor: crosshair;
}

canvas {
  display: block;
}
</style>
