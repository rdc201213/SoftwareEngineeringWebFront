<template>
  <div class="pageStyle">
    <div style="display: block">
      <TopBar />
    </div>
    <el-main>
      <el-form
        ref="newInfoForm"
        :model="newInfoForm"
        label-width="150px"
        class="form"
      >
        <div class="center">
          <div class="col-main">
            <div class="user-info">
              <!-- <div class="am-cf am-padding">
                  <div class="tt">
                    <strong class="am-text-danger am-text-lg">个人资料</strong>
                    /
                    <small>Personal&nbsp;information</small>
                  </div>
                </div> -->
              <div class="info-main" style="padding-bottom: 50px">
                <el-form-item label="用户ID">
                  <el-input
                    v-model="userID"
                    style="width: 250px"
                    placeholder=""
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input
                    v-model="phoneNumber"
                    style="width: 250px"
                    placeholder=""
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                  <el-input
                    v-model="userName"
                    style="width: 250px"
                    placeholder=""
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input
                    type="password"
                    v-model="password"
                    style="width: 250px"
                    placeholder=""
                  ></el-input>
                </el-form-item>
                <div style="padding-left: 230px">
                  <el-button
                    type="primary"
                    icon=""
                    v-on:click="newInfo()"
                    size="small"
                    >修改信息</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import TopBar from "../components/Basic/TopBar.vue";
import axios from "axios";
export default {
  components: { TopBar },
  data() {
    return {
      userID: "",
      userName: "",
      password: "",
      phoneNumber: "",
    };
  },
  mounted: function () {
    this.userID = sessionStorage.getItem("userID");
    this.userName = sessionStorage.getItem("userName");
    this.password = sessionStorage.getItem("password");
    this.phoneNumber = sessionStorage.getItem("phoneNumber");
  },
  methods: {
    newInfo() {
      axios
        .post("/api/modifyPassword", null, {
          params: {
            userID: this.userID,
            userName: this.userName,
            password: this.password,
            phoneNumber: this.phoneNumber,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            alert("修改个人信息成功");
            this.newInfoForm = {};
          }
        })
        .catch((error) => {
          console.log(error);
          alert("修改失败");
        });
    },
    // uploadFace(e) {},
  },
};
</script>

<style>
.el-main {
  /* background-color:#f5f7fa; */
  width: 60%;
  margin: 0 auto;
  padding: 0;
  overflow: unset;
  height: 100%;
}

.user-info {
  width: 100%;
  max-width: 900px;
  overflow: hidden;
}
.circleImg {
  border-radius: 30px;
  width: 100px;
  float: left;
  margin-left: 15px;
  margin-top: 15px;
}
.tt {
  margin-top: 60px;
}
.filePic {
  width: 100px;
  float: left;
  margin-left: 500px;
  margin-top: 15px;
}
.center {
  width: 100%;
  margin: 0px auto;
  min-height: 1px;
  overflow: hidden;
}
.inputPic {
  width: 100px;
  float: left;
  margin-left: 200px;
  margin-top: 15px;
  cursor: pointer;
  opacity: 0;
  ilter: alpha(opacity=0);
  z-index: 9;
}

.info-main {
  position: absolute;
  top: 250px;
  left: 500px;
  border: 1px solid #ffffff;
  outline: 5px solid #d9e7f0;
  width: 35%;
  padding: 20px 0px;
  /* left: 50%;
top: 50%;
transform: translate(-50%,-50%); */
  background-color: azure;
  box-sizing: border-box;
}
.pageStyle {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#f38237, #ffffff);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  float: left;
}
</style>