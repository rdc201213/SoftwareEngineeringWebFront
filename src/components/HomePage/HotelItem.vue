<template>
  <div class="hotelItem">
    <div class="nameContainer">
      <div class="hotelPictrueBox">
        <img class="img" :src="data.photoURL" alt="" />
      </div>
      <div class="hotelInfoBox">
        <a href="">{{data.hotelName}}</a>
        <el-rate
          v-model="data.star"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        >
        </el-rate>
      </div>
    </div>
    <div class="hotelIntroBox">
      <h3>简介</h3>
      <p>{{data.introduction}}</p>
    </div>
    <div class="specialServiceBox">
      <h3>特殊服务</h3>
      <div>
        <!-- 这里要改成根据不同的服务进行不同的图标渲染 -->
        {{data.specialService}}
        <i class='el-icon-first-aid-kit' style="font-size: 30px;"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  mounted(){
    var that=this
    console.log(this.data)
    that.handleSpecialService(this.data.specialService)
  },
  data(){
    return{
      specialServiceList:[]
    }
  },
  methods:{
    handleSpecialService(specialServiceList){
      var serviceList=specialServiceList.split("；")
      console.log(serviceList)
      for (let service of serviceList)
      {
        var temp=service.split("：",2)
        console.log(service)
        console.log(temp)
      }

    }
  }
};
</script>

<style>
.hotelItem {
  height: 200px;
  width: 1350px;
  float: left;
  padding: 50px;
}
.hotelPictrueBox {
  height: 150px;
  width: 150px;
  border: 1px solid #eee;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
}
.hotelPictrueBox .img {
  height: 100%;
  width: 100%;
  background-color: #eee;
}
.hotelInfoBox {
  height: auto;
  width: auto;
}
.nameContainer{
  float: left;
}
.hotelIntroBox {
  height: 100%;
  width: 400px;
  padding: 30px;
  float: left;
}
.specialServiceBox {
  height: 100%;
  width: 200px;
  float: left;
  padding: 30px;
}
</style>