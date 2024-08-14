import { onMounted, onUnmounted, ref } from "vue";
// 获取鼠标位置
export function useMousePosition(vm:any) {
    let x = ref(0);
    let y = ref(0);
    let enter = ref(false);
    let height = ref(800);
    let rect = {
      top: 0,
      left: 0,
      width:0,
      height:0,
    };
  
    function onEnter(e: MouseEvent) {
      const el = vm.ctx.$el;
      if (!el) return;
      enter.value = true;
      rect = el.getBoundingClientRect();
      height.value = rect.width * 2;
    }
    function onMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      x.value = clientX - rect.left - rect.width;
      y.value = clientY - rect.top - rect.width;
    }
    function onLeave() {
      enter.value = false;
    }
  
    onMounted(() => {
      const el = vm.ctx.$el;
      if (!el) return;
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    });
  
    onUnmounted(() => {
      const el = vm.ctx.$el;
      if (!el) return;
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    });
  
    return {
      x,
      y,
      enter,
      height,
    };
  }