<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img class="img" src="../assets/logo.png" alt="" />
      </div>
      <el-form
        ref="loginInfo"
        :model="loginInfo"
        :rules="loginRule"
        hide-required-asterisk="true"
        class="loginInfo"
        label-width="80px"
        label-position="top"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input :type="passwordVisible" v-model="loginInfo.password">
            <i slot="suffix" :class="icon" @click="showPass"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login('loginInfo')">登录</el-button>
          <el-button type="primary" @click="RegisterFormVisible = true"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="注册"
      :visible.sync="RegisterFormVisible"
      :rules="registerRules"
      label-width="120px"
      status-icon
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      <el-form-item label="用户名" prop="userName">
          <el-input v-model.number="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phoneNum">
          <el-input v-model.number="ruleForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitRegisterForm('ruleForm')"
            >注册</el-button
          >
          <el-button @click="resetRegisterForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passwordVisible: "password",
      icon: "el-icon-view",
      loginInfo: {
        username: "",
        password: "",
      },
      loginRule: {
        username: [
          { required: true, message: "请输入账号", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
      RegisterFormVisible: false,
      ruleForm: {
        pass: "",
        checkPass: "",
        userName: "",
        phoneNum:"",
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        phoneNum: [
          { required: true, message: "请输入电话号码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    showPass() {
      if (this.passwordVisible === "text") {
        this.passwordVisible = "password";
        //更换图标
        this.icon = "el-icon-view";
      } else {
        this.passwordVisible = "text";
        this.icon = "el-icon-lock";
      }
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("注册成功!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {},
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetRegisterForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  top: -20%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box .img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.loginInfo {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  /* left: 50%;
top: 50%;
transform: translate(-50%,-50%); */
  box-sizing: border-box;
}
</style>