<template>
  <div class="hotelItem">
    <div class="nameContainer">
      <div class="hotelPictrueBox">
        <img class="img" :src="data.photoURL" alt="" />
      </div>
      <div class="hotelInfoBox">
        <router-link
          :to="{
            path: '/HotelInformation',
            query: {
              hotelId: data.hotelID, // orderNum : this.searchData.orderNo
            },
          }"
        >
          {{ data.hotelName }}
        </router-link>
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
      <p>{{ data.introduction }}</p>
    </div>
    <div class="specialServiceBox">
      <h3>特殊服务</h3>
      <el-popover
        placement="top-start"
        :title="service.iconTitle"
        width="200"
        trigger="hover"
        :content="service.info"
        v-for="service in specialServiceList"
        :key="service.iconType"
      >
        <i :class="service.iconType" style="font-size: 40px" slot="reference"/>
                <p>{{service.info}}</p>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  mounted() {
    var that = this;
    console.log(this.data);
    that.handleSpecialService(this.data.specialService);
  },
  data() {
    return {
      specialServiceList: [],
    };
  },
  methods: {
    handleSpecialService(specialServiceList) {
      console.log(specialServiceList);
      var serviceList = specialServiceList.split("；");
      console.log(serviceList);
      for (let service of serviceList) {
        var temp = service.split("：", 2);
        switch (temp[0]) {
          case "残疾人":
            this.specialServiceList.push({
              iconType: "iconfont iconcanjiren",
              iconTitle: temp[0],
              info: temp[1],
            });
            break;
          case "婴幼儿":
            this.specialServiceList.push({
              iconType: "iconfont iconnaipingyingyoueryongpin",
              iconTitle: temp[0],
              info: temp[1],
            });
            break;
          case "性少数":
            this.specialServiceList.push({
              iconType: "iconfont icontongxinglian",
              iconTitle: temp[0],
              info: temp[1],
            });
            break;
          case "老年人":
            this.specialServiceList.push({
              iconType: "iconfont iconlaonianren",
              iconTitle: temp[0],
              info: temp[1],
            });
            break;
          default:
            break;
        }
        console.log(this.specialServiceList);
      }
    },
  },
};
</script>

<style>
.hotelItem {
  height: 200px;
  width: 1350px;
  float: left;
  border: 3px solid #eee;
  box-shadow: 0 0 10px#ddd;
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
.nameContainer {
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
}
</style>