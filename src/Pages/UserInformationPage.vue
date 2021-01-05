<template>
    <el-container class="main-contain">
      <div style="display:block;">
        <TopBar />
      </div>
      <el-main >
        <el-form ref="newInfoForm" :model="newInfoForm" label-width="150px" class="form">

              <div class="center">
		            <div class="col-main">
                    <div class="user-info">
                        <div class="am-cf am-padding">
                          <div class="tt"><strong class="am-text-danger am-text-lg">个人资料</strong> / <small>Personal&nbsp;information</small></div>
                      </div>
                      <div class="user-infoPic">
                        <div class="filePic">
                          <input type="file" id="userFace" @change="uploadFace" class="inputPic" allowexts="jpeg,jpg,png,gif" accept="image/gif,image/jpeg,image/jpg,image/png">
                          <img class="circleImg" src="../assets/logo.png">
                          </div>
                      </div>
                        <div class="info-main" style="padding-bottom: 50px;">
                          
                          <el-form-item label="用户ID" >
                          <el-input v-model="userID" style="width:250px" placeholder="" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="手机号">
                          <el-input v-model="phoneNumber" style="width:250px" placeholder="" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="用户名">
                            <el-input v-model="userName" style="width:250px" placeholder=""></el-input>
                          </el-form-item>
                          <el-form-item label="密码">
                            <el-input type="password" v-model="password" style="width:250px" placeholder=""></el-input>
                          </el-form-item>
                          </div>
                        
                    </div>
              </div>
            </div>
        </el-form>
        <div style="margin-top:-20px;margin-left:240px">
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
            alert("修改失败");
          });  
    },
      uploadFace(e) {
					},
    
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
.main-contain{background-image: linear-gradient(#e6ae64, #91b5e5);
}
.user-info{width:100%; max-width:900px;overflow:hidden;}
.circleImg{
  border-radius: 30px;width:100px; float:left;margin-left:15px;margin-top:15px ;
}
.tt{margin-top: 60px;}
.filePic{width:100px; float:left;margin-left:15px;margin-top:15px ;}	
.center{width:100%; margin:0px auto;min-height: 1px; overflow:hidden;}
.inputPic{ float:left; margin-left:15px; margin-top:15px; cursor:pointer;opacity:0;ilter:alpha(opacity=0);width:100px;height:100%;position: absolute;top: 0;left: 0;z-index: 9;}
.user-infoPic{position: relative;margin:20px 5% 50px ;height:130px;border-bottom:1px solid #eee ;}
.user-info{overflow:hidden; margin-bottom:15px;}
</style>