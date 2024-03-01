import { onMounted, onUnmounted, Ref, ref } from "vue";

export default function (containerRef: Ref<HTMLElement | null>) {
  console.log(containerRef);
  const x = ref(0);
  const y = ref(0);
  const isShow = ref();

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.clientX, e.clientY);
    x.value = e.clientX;
    y.value = e.clientY;
    isShow.value = true;
  };

  const closeMenu = () => {
    isShow.value = false;
  };

  onMounted(() => {
    const container = containerRef.value;

    container?.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", closeMenu, true);
    window.addEventListener("contextmenu", closeMenu, true);
  });

  onUnmounted(() => {
    const container = containerRef.value;

    container?.removeEventListener("contextmenu", handleContextMenu);

    window.removeEventListener("click", closeMenu, true);
    window.removeEventListener("contextmenu", closeMenu, true);
  });
  return {
    x,
    y,
    isShow,
  };
}
