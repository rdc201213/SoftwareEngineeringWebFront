<template>
  <div class="header">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
      background-color="#fff"
      text-color="#333"
      active-text-color="#0084ff"
      style="flex:1"
    >
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <span> {{ item.navItem }}</span>
        </template>
      </el-menu-item>
      <el-menu-item @click="logOut" v-if="isLogin()">
       <template slot="title">
          <span> 退出登录</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    data() {
    return {
        navList:[
            {name:'/home', navItem:'首页'},
            {name:'/Login',navItem:'登录/注册'},
        ]
                      
    }
  },
  mounted(){
    if(sessionStorage.getItem("userID")!=null)
    {
      this.navList=[
            {name:'/home', navItem:'首页'},
            {name:'/UesrInformation',navItem:'个人中心'},
            {name:'/',navItem:'发布房源'},
            {name:'/OrderInformation',navItem:'我的订单'}
        ]
    }
    
  },
  methods: {
    logOut(){
      sessionStorage.clear();
      location.reload();
    },
    isLogin()
    {
      if(sessionStorage.getItem("userID")!=null)
      {
        return true;
      }
      else{
        return false;
      }
    }
  }
}
</script>

<style>
.el-menu-item{
  font-size: 18px !important;
}
.el-menu-item.is-active {
    color: #ea5b2c !important;
    font-size: 18px !important;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid #ea5b2c !important;
}
</style>