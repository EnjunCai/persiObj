<template>
  <div class="toggle-switch">
    <label class="switch-label">
      <input
        type="checkbox"
        class="checkbox"
        v-model="checkBox"
        @change="handleChange"
      />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const checkBox = ref(true);

const handleChange = () => {
  console.log(checkBox.value);
  if (checkBox.value) {
    window.document.documentElement.removeAttribute("data-theme");
  } else {
    window.document.documentElement.setAttribute("data-theme", "light");
  }
};
</script>

<style scoped>
.toggle-switch {
  position: relative;
  width: 60px;
  height: 30px;
  --light: #fff;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
}

.switch-label {
  position: absolute;
  width: 100%;
  height: 30px;
  background-color: #4e5064;
  border-radius: 25px;
  cursor: pointer;
  border: 3px solid #4e5064;
}

.checkbox {
  position: absolute;
  display: none;
}

.slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.checkbox:checked ~ .slider {
  background-color: var(--light);
}

.slider::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  -webkit-box-shadow: inset 12px -4px 0px 0px var(--light);
  box-shadow: inset 12px -4px 0px 0px var(--light);
  background-color: #4e5064;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.checkbox:checked ~ .slider::before {
  -webkit-transform: translateX(50px);
  -ms-transform: translateX(50px);
  transform: translateX(33px);
  background-color: #4e5064;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>