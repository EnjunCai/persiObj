<template>
  <div class="login_wrapper">
    <div class="from_wrapper">
      <div class="form_header">
        <div class="form_header_title">
          {{ isRegister ? "Create Account" : "Welcome Back" }}
        </div>
        <div class="form_header_text">
          <span v-if="!isRegister">
            测试学习权限路由和权限菜单功能<br />
            (未注册用户登录会失败，请先注册)
          </span>
          <span v-else> 注册新账号以体验完整功能 </span>
        </div>
      </div>

      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
        label-position="top"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item label="" prop="account">
          <el-checkbox name="type" v-model="ruleForm.account" value="op1">
            我已阅读并同意相关协议
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            class="SubmitBtn"
            type="primary"
            :loading="loading"
            @click="submitForm(ruleFormRef)"
          >
            {{ isRegister ? "Sign Up" : "Login" }}
          </el-button>
        </el-form-item>

        <div class="toggle-box">
          {{
            isRegister ? "Already have an account?" : "Don't have an account?"
          }}
          <el-link type="primary" @click="toggleMode">
            {{ isRegister ? "Login" : "Sign Up" }}
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
import useUserStore from "@/store/user";
import { useRouter } from "vue-router";

interface RuleForm {
  email: string;
  password: string;
  account: string[];
}

const router = useRouter();
const userStore = useUserStore();

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const loading = ref(false);
const isRegister = ref(false); // 控制登录/注册模式

const ruleForm = reactive<RuleForm>({
  email: "", // 去掉默认值 admin
  password: "", // 去掉默认值 admin
  account: [],
});

const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱格式",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
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

// 切换登录/注册
const toggleMode = () => {
  isRegister.value = !isRegister.value;
  // 清空表单验证状态
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields();
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        if (isRegister.value) {
          // --- 注册逻辑 ---
          await userStore.register(ruleForm.email, ruleForm.password);
          ElMessage.success("注册成功！");
          // 如果 Supabase 设置了必须验证邮箱，这里可能需要提示用户去邮箱查收
          // 如果没有开启验证，此时已经自动登录了
          if (userStore.token) {
            router.push("/"); // 或者 router.back()
          } else {
            ElMessage.info("请前往邮箱确认验证链接");
            isRegister.value = false; // 切回登录页
          }
        } else {
          // --- 登录逻辑 ---
          await userStore.login(ruleForm.email, ruleForm.password);
          ElMessage.success("登录成功！");
          router.push("/"); // 或者 router.back()
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
/* 保持你原有的样式不变 */
.login_wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(/src/assets/images/loginbg.jpeg) no-repeat;
  background-size: cover;

  .from_wrapper {
    position: absolute;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    width: 512px;
    padding: 52px 40px 32px 40px;
    border-radius: 19px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 12px 36px rgba(0, 0, 0, 0.1);

    .form_header {
      margin-bottom: 40px;
      &_title {
        font-size: 32px;
        font-weight: 700; /* 修正了原代码的 700px */
      }
      &_text {
        font-size: 14px;
        font-weight: 700;
        color: rgb(153, 155, 161);
        margin-top: 20px;
        line-height: 24px;
      }
    }
    :deep(.el-form-item) {
      margin-bottom: 30px;
    }
    :deep(.el-form-item__label) {
      font-size: 18px;
      margin-bottom: 10px;
    }
    :deep(.el-input__wrapper) {
      box-sizing: border-box;
      border: 1.5px solid rgb(234, 235, 236);
      border-radius: 12px;
      padding: 5px 15px;
      background: rgb(255, 255, 255);

      input {
        font-family: "AlimamaShuHeiTi", sans-serif;
      }
    }
  }
}

.SubmitBtn {
  width: 100%;
  border-radius: 12px;
  background: rgb(98, 54, 245);
  font-family: "AlimamaShuHeiTi", sans-serif;
  font-size: 18px;
  font-weight: 500;
  padding: 25px 15px;
}

.toggle-box {
  text-align: center;
  margin-top: -10px;
  font-size: 14px;
  color: #666;

  .el-link {
    font-size: 14px;
    vertical-align: baseline;
    margin-left: 5px;
  }
}

@media (max-width: 730px) {
  .login_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    .from_wrapper {
      position: static;
      transform: none;
      width: 90vw;
    }
  }
}

@media (max-width: 540px) {
  .login_wrapper {
    .from_wrapper {
      padding: 20px 20px 0px 20px;
    }
  }
}
</style>