<template>
  <div class="login_wrapper">
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>
    <div class="bg-shape shape-3"></div>

    <div class="back-btn" @click="goBack" v-motion :initial="{ opacity: 0, x: -20 }"
      :enter="{ opacity: 1, x: 0, transition: { delay: 500 } }">
      <el-icon>
        <ArrowLeft />
      </el-icon>
      <span class="back-text">返回</span>
    </div>

    <div class="from_wrapper" v-motion :initial="{ opacity: 0, scale: 0.95, y: 20 }"
      :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 600, type: 'spring', stiffness: 100, damping: 20 } }">

      <div class="form_header">
        <transition name="fade-slide" mode="out-in">
          <div :key="isRegister ? 'reg' : 'log'" class="form_header_title">
            {{ isRegister ? "创建账号" : "欢迎回来" }}
          </div>
        </transition>

      </div>

      <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon label-position="top">
        <el-form-item label="邮箱" prop="email" :key="isRegister ? 'reg-email' : 'log-email'" v-motion
          :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 100 } }">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="密码" prop="password" :key="isRegister ? 'reg-pass' : 'log-pass'" v-motion
          :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>

        <template v-if="isRegister">
          <el-form-item label="确认密码" prop="confirmPassword" key="confirm-pass" v-motion
            :initial="{ opacity: 0, height: 0, x: -20 }"
            :enter="{ opacity: 1, height: 'auto', x: 0, transition: { delay: 250 } }" style="overflow: hidden;">
            <el-input v-model="ruleForm.confirmPassword" type="password" placeholder="请再次输入密码" show-password />
          </el-form-item>
        </template>

        <el-form-item label="" prop="account" v-motion :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 300 } }">
          <el-checkbox name="type" v-model="ruleForm.account" value="op1">
            我已阅读并同意相关协议
          </el-checkbox>
        </el-form-item>

        <el-form-item v-motion :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }">
          <el-button class="SubmitBtn" type="primary" :loading="loading" @click="submitForm(ruleFormRef)">
            <transition name="fade-slide" mode="out-in">
              <span :key="isRegister ? 'btn-reg' : 'btn-log'">
                {{ isRegister ? "注 册" : "登 录" }}
              </span>
            </transition>
          </el-button>
        </el-form-item>

        <div class="toggle-box" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 500 } }">
          <span :key="isRegister ? 'txt-reg' : 'txt-log'">
            {{ isRegister ? "已有账户?" : "没有账户?" }}
          </span>

          <el-link type="primary" @click="toggleMode" style="margin-left: 5px">
            {{ isRegister ? "登录" : "注册" }}
          </el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue"; // 引入返回图标
import useUserStore from "@/store/user";
import { useRouter } from "vue-router";

interface RuleForm {
  email: string;
  password: string;
  confirmPassword?: string; // 可选，因为登录不需要
  account: string[];
}

const router = useRouter();
const userStore = useUserStore();

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const loading = ref(false);
const isRegister = ref(false);

const ruleForm = reactive<RuleForm>({
  email: "",
  password: "",
  confirmPassword: "",
  account: [],
});

// 自定义验证：确认密码
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== ruleForm.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
}

const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: ["blur", "change"] },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
  // 确认密码验证规则
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ],
  account: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error("必须勾选协议"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
});

const goBack = () => {
  router.push('/'); // 或者 router.back()
}

const toggleMode = () => {
  isRegister.value = !isRegister.value;
  // 清空表单
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields();
    // 切换模式时清空密码框
    ruleForm.password = "";
    ruleForm.confirmPassword = "";
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        if (isRegister.value) {
          // 注册时这里可以传 confirmPassword 也可以不传，看后端需求
          await userStore.register(ruleForm.email, ruleForm.password);
          ElMessage.success("注册成功！");
          if (userStore.token) router.push("/");
          else { ElMessage.info("请前往邮箱确认验证链接"); isRegister.value = false; }
        } else {
          await userStore.login(ruleForm.email, ruleForm.password);
          ElMessage.success("登录成功！");
          router.push("/");
        }
      } catch (error: any) {
        ElMessage.error(error.message || "操作失败");
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.login_wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- 返回按钮 --- */
.back-btn {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  color: #2c3e50;
  font-weight: 600;

  &:hover {
    background: white;
    transform: translateX(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  .el-icon {
    font-size: 18px;
  }
}

/* --- 背景光球动画 (优化版) --- */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
  /* 增加 scale 变化，让光球有呼吸感 */
  animation: floatShape 25s infinite alternate ease-in-out;
}

.shape-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #42b883 0%, #3498db 100%);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #9b59b6 0%, #6236f5 100%);
  bottom: -50px;
  right: -50px;
  animation-delay: -5s;
}

.shape-3 {
  width: 300px;
  height: 300px;
  background: #34495e;
  top: 40%;
  left: 60%;
  opacity: 0.2;
  animation-duration: 35s;
  /* 不同的速度 */
}

@keyframes floatShape {
  0% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(30px, 40px) scale(1.1);
    /* 变大一点 */
  }

  100% {
    transform: translate(50px, 80px) scale(1);
    /* 恢复 */
  }
}

/* --- 玻璃拟态卡片 --- */
.from_wrapper {
  position: relative;
  z-index: 10;
  width: 480px;
  padding: 50px 40px;
  border-radius: 24px;

  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);

  .form_header {
    margin-bottom: 30px;
    text-align: center;
    min-height: 60px;
    /* 防止切换时高度塌陷 */

    &_title {
      font-size: 30px;
      font-weight: 800;
      color: #2c3e50;
      margin-bottom: 8px;
    }

    &_sub {
      font-size: 14px;
      color: #7f8c8d;
      letter-spacing: 1px;
    }
  }

  :deep(.el-form-item) {
    margin-bottom: 24px;
  }

  :deep(.el-form-item__label) {
    color: #34495e;
    font-weight: 600;
  }

  :deep(.el-input__wrapper) {
    border-radius: 12px;
    padding: 8px 15px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid transparent;
    box-shadow: none;
    transition: all 0.3s;

    &:hover,
    &.is-focus {
      background: white;
      box-shadow: 0 4px 12px rgba(66, 184, 131, 0.1);
      border-color: #42b883;
    }
  }
}

.SubmitBtn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #42b883 0%, #36a572 100%);
  border: none;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 10px 20px rgba(66, 184, 131, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 25px rgba(66, 184, 131, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
}

/* 动画 Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.toggle-box {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #7f8c8d;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
  color: #42b883;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #42b883;
  border-color: #42b883;
}

:deep(.el-link__inner) {
  color: #9b59b6;
}

@media (max-width: 730px) {
  .from_wrapper {
    width: 90%;
    padding: 30px 20px;
  }

  .back-btn {
    top: 20px;
    left: 20px;
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>