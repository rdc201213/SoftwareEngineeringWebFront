
<template>
    <el-container style="background-color:#f5f7fa;">
      <div style="display:block;">
        <TopBar />
      </div>
      <el-main style="overflow:unset;padding:0;">
        <el-form ref="newInfoForm" :model="newInfoForm" label-width="150px">
          <el-form-item label="头像">
            <img src="../assets/logo.png" style="width:60px;height:60px;"></img>
          </el-form-item>
          <el-form-item label="用户ID">
            <el-input v-model="userID" style="width:250px" placeholder="暂无用户ID" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="phoneNumber" style="width:250px" placeholder="暂无手机号" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="userName" style="width:250px" placeholder="暂无用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="password" style="width:250px" placeholder="暂无密码"></el-input>
          </el-form-item>

        </el-form>
        <div style="margin-top:50px;margin-left:350px">
          <el-button type="primary" icon="" v-on:click="newInfo()" size="small">修改信息</el-button>
        </div>
      </el-main>
    </el-container>
</template>

<script>
import TopBar from "../components/Basic/TopBar.vue";
import axios from "axios";
export default {
  components: { TopBar },
  data(){
    return{
      userID:"",
      userName:"",
      password:"",
      phoneNumber:"",
    };

  },
  mounted: function () {
    this.userID = sessionStorage.getItem("userID");
    this.userName = sessionStorage.getItem("userName");
    this.password = sessionStorage.getItem("password");
    this.phoneNumber = sessionStorage.getItem("phoneNumber");
  },
  methods:{
    newInfo(){
        axios
          .post("/api/modifyPassword", null, {
            params: {
              userID:this.userID,
              userName:this.userName,
              password:this.password,
              phoneNumber:this.phoneNumber,
            },
          })
          .then((response) => {
            if (response.status == 200) {
              alert("修改个人信息成功");
              this.newInfoForm = {}
            }
          })
          .catch((error) => {
            console.log(error);
            alert("网络似乎出现问题");
          });  
    }
  }
}
</script>

<style>
.el-main{
  /* background-color:#f5f7fa; */
  width: 60%;
  margin:0 auto;
  padding: 0;
  overflow: unset;
}
</style>