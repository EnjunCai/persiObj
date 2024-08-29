<template>
  <div class="login_wrapper">
    <div class="from_wrapper">
      <div class="form_header">
        <div class="form_header_title">Welcome Back</div>
        <div class="form_header_text">
          测试学习权限路由和权限菜单功能
          <br />
          随意输入，账号为admin视为管理员，其他为普通用户
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
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="Please input password"
            show-password
          />
        </el-form-item>

        <el-form-item label="" prop="account">
          <el-checkbox name="type" v-model="ruleForm.account" value="op1">
            By creating an account
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="SubmitBtn"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import useUserStore from "@/store/user";
import { useRouter } from "vue-router";
interface RuleForm {
  email: string;
  password: string;
  account: string[];
}

const router = useRouter();
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  email: "admin",
  password: "admin",
  account: ["op1"],
});

const userStore = useUserStore();

const rules = reactive<FormRules<RuleForm>>({
  email: [{ required: true, message: "账号呢", trigger: "blur" }],
  password: [{ required: true, message: "密码呢", trigger: "blur" }],
  account: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error("必须勾选"));
        } else {
          callback(); // 验证通过，不返回错误
        }
      },
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log(userStore.userInfo);
  console.log(ruleForm);

  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    console.log(valid, fields);

    if (valid) {
      console.log("submit!");
      // 为了测试pinia持久化,虚拟登录
      userStore.setUser("KBXJDJSADKSLADJLASDLA123213213213213saDSDADSAD", {
        username: ruleForm.email,
        password: ruleForm.password,
        role: ruleForm.email == "admin" ? "admin" : "user",
      });
      router.back();
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss" scoped>
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
    // height: 657px;
    padding: 52px 40px 32px 40px;
    border-radius: 19px;
    background: rgb(255, 255, 255);
    // 阴影
    box-shadow: 0px 12px 36px rgba(0, 0, 0, 0.1);

    .form_header {
      margin-bottom: 40px;
      &_title {
        font-size: 32px;
        font-weight: 700px;
      }
      &_text {
        font-size: 14px;
        font-weight: 700px;
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

@media (max-width: 730px) {
  .login_wrapper {
    // width: 100%;
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
