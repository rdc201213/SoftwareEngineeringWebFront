<template>
  <div class="login_container">
    <div>
      <TopBar />
    </div>
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
          <el-input
            :type="passwordVisible"
            v-model="loginInfo.password"
            show-password
          >
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
      :rules="rules"
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
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            show-password
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
import TopBar from "../components/Basic/TopBar.vue";
import axios from "axios";
export default {
  components: { TopBar },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码长度需要大于6位"));
        }
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
        phoneNum: "",
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
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("/api/login", null, {
              params: {
                userName: this.loginInfo.username,
                password: this.loginInfo.password,
              },
            })
            .then((response) => {
              if (response.status == 200) {
                if (response.data == "用户名或密码错误") {
                  alert("用户名或密码错误");
                } else {
                  alert("登录成功");
                  sessionStorage.setItem("islogin", true);
                  sessionStorage.setItem("userID", response.data.userID);
                  sessionStorage.setItem("userName", response.data.userName);
                  sessionStorage.setItem("password", response.data.password);
                  sessionStorage.setItem("phoneNumber", response.data.phoneNumber);
                  this.$router.push("/home");
                }
              }
            })
            .catc((error) => {
              console.log(error);
              alert("网络似乎出现问题");
              this.$router.push("/Login");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("/api/register", {
              userID: 1,
              password: this.ruleForm.pass,
              userName: this.ruleForm.userName,
              phoneNumber: this.ruleForm.phoneNum,
            })
            .then((response) => {
              console.log(response);
              alert(response.data);
              // sessionStorage.setItem("userID", response.data.userID);
              // sessionStorage.setItem("userName", response.data.userName);
              this.$router.push("/home");
            })
            .catch(function (error) {
              // 请求失败处理
              alert("注册失败!请重试");
              console.log(error);
            });
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
  background-image: linear-gradient(#f38237, #ffd1b6);
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