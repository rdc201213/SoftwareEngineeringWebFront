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
    </el-menu>
  </div>
</template>

<script>
export default {
    data() {
    return {
        navList:[
            {name:'/home', navItem:'首页'},
            {name:'/home/classRoom',navItem:'我的班级'},
            {name:'/home/course',navItem:'我的课程'},
            {name:'/home/exam',navItem:'创建考试'},
            {name:'/Login',navItem:'登录/注册'},
        ]
                      
    }
  },
  methods: {
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