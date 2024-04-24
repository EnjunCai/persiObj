import { DirectiveBinding } from "vue";

const activeIntersection = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    let target = entry.target as HTMLElement;
    console.log(target);
    entry.target.style.opacity = '0';
    entry.target.style.transition = 'all .8s';
    
    if (entry.isIntersecting) {
        // 监听到元素在视窗内，将元素style的opacity设置为1
        entry.target.style.opacity = '1';
        
        console.log(entry.target);
        
      } 
  });
});

export const scrollReveal = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
        console.log(el,binding);
        
    // if (binding.value.move == "right") {
    //   el.classList.add("defaultObserveRight");
    // } else if (binding.value.move == "bottom") {
    //   el.classList.add("defaultObserveBottom");
    // } else {
    //   el.classList.add("defaultObserve");
    // }
    // (el.dataset as DOMStringMap).active = binding.value.animationName;
    // (el.dataset as DOMStringMap).move = binding.value.move;
    activeIntersection.observe(el);
  },
  unmounted(el: HTMLElement) {
    activeIntersection.unobserve(el);
  },
};
