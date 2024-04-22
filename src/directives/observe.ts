import { DirectiveBinding } from "vue";

const activeIntersection = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    let target = entry.target as HTMLElement;

    if (entry.isIntersecting) {
      if (target.dataset.move == "bottom") {
        entry.target.classList.add(target.dataset.active || "activeObserveY");
      } else {
        entry.target.classList.add(target.dataset.active || "activeObserve");
      }

      observer.unobserve(entry.target);
    } else {
      //   entry.target.classList.remove(target.dataset.active || "activeObserve");
      //   if (target.dataset.move == "right") {
      //     entry.target.classList.add("defaultObserveRight");
      //   } else {
      //     entry.target.classList.add("defaultObserve");
      //   }
    }
  });
});

export const observe = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value.move == "right") {
      el.classList.add("defaultObserveRight");
    } else if (binding.value.move == "bottom") {
      el.classList.add("defaultObserveBottom");
    } else {
      el.classList.add("defaultObserve");
    }
    (el.dataset as DOMStringMap).active = binding.value.animationName;
    (el.dataset as DOMStringMap).move = binding.value.move;
    activeIntersection.observe(el);
  },
  unmounted(el: HTMLElement) {
    activeIntersection.unobserve(el);
  },
};
