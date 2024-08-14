import { ref, onMounted } from 'vue';

interface Triangle {
  data: string;
  color: string;
}

export function useTriangles() {
    const numTriangles = 33;
    const radius = 150; // 半径
    const centerX = 285.7; // 圆心X坐标
    const centerY = 200; // 圆心Y坐标
  const triangles = ref<Triangle[]>([]);
  const colors = [
    "#FFCCCC",
    "#FFE5CC",
    "#FFFFCC",
    "#E5FFCC",
    "#CCFFCC",
    "#CCFFE5",
    "#CCFFFF",
    "#CCE5FF",
    "#CCCCFF",
    "#E5CCFF",
    "#FFCCFF",
    "#FFCCE5",
    "#FF99CC",
    "#FFB399",
    "#FFD699",
    "#FFFF99",
    "#D6FF99",
    "#99FF99",
    "#99FFD6",
    "#99FFFF",
    "#99D6FF",
    "#9999FF",
    "#B399FF",
    "#D699FF",
    "#FF99FF",
    "#FF99D6",
    "#FF6699",
    "#FF9966",
    "#FFCC66",
    "#FFFF66",
    "#CCFF66",
    "#66FF66",
    "#66FFCC",
  ];
  const generateTriangles = () => {
    for (let i = 0; i < numTriangles; i++) {
      const angle = (i / numTriangles) * 2 * Math.PI;
      const x1 = centerX + radius * Math.cos(angle);
      const y1 = centerY + radius * Math.sin(angle);
      const x2 = centerX + radius * Math.cos(angle + (2 * Math.PI) / 3);
      const y2 = centerY + radius * Math.sin(angle + (2 * Math.PI) / 3);
      const x3 = centerX + radius * Math.cos(angle + (4 * Math.PI) / 3);
      const y3 = centerY + radius * Math.sin(angle + (4 * Math.PI) / 3);
  
      const triangle: Triangle = {
        data: `polygon(${x1}px ${y1}px, ${x2}px ${y2}px, ${x3}px ${y3}px)`,
        color: colors[i % colors.length],
      };
  
      triangles.value.push(triangle);
    }
  };
  onMounted(() => {
    generateTriangles();
  });

  return {
    triangles
  };
}



export function useScaleDimensions() {
    interface Dimensions {
        width: number;
        height: number;
      }
    const scaledDimensions = ref<Dimensions | null>(null);
  
    function scaleDimensions(
      originalWidth: number,
      originalHeight: number,
      newWidth: number | null = null,
      newHeight: number | null = null
    ): Dimensions {
      if (newWidth !== null) {
        const newHeight = newWidth * (originalHeight / originalWidth);
        scaledDimensions.value = { width: newWidth, height: newHeight };
        return scaledDimensions.value;
      } else if (newHeight !== null) {
        const newWidth = newHeight * (originalWidth / originalHeight);
        scaledDimensions.value = { width: newWidth, height: newHeight };
        return scaledDimensions.value;
      } else {
        throw new Error("Either newWidth or newHeight must be provided.");
      }
    }
  
    return {
      scaledDimensions,
      scaleDimensions
    };
  }