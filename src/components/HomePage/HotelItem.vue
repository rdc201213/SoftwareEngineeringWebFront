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
          ><h3>
            {{ data.hotelName }}
          </h3>
        </router-link>
        <el-rate
          v-model="data.star"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
          v-if="data.star"
        >
        </el-rate>
      </div>
    </div>
    <div class="hotelIntroBox">
      <h3>简介</h3>
      <p>{{ data.introduction }}</p>
    </div>
    <div class="specialServiceBox">
      <h3>特殊人群服务</h3>
      <el-popover
        placement="top-start"
        :title="service.iconTitle"
        width="200"
        trigger="hover"
        :content="service.info"
        v-for="service in specialServiceList"
        :key="service.iconType"
      >
        <i :class="service.iconType" style="font-size: 40px" slot="reference" />
        <p>{{ service.info }}</p>
      </el-popover>
    </div>
    <div class="addressInfoBox">
      <h3>地理位置</h3>
      <p>{{ data.province }}-{{ data.city }}-{{ data.district }}</p>
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
      var serviceList = specialServiceList.split("；");
      for (let service of serviceList) {
        var temp = service.split("：");
        var first = temp.shift();
        var rest = temp.join(":");
        switch (first) {
          case "残疾人":
            this.specialServiceList.push({
              iconType: "iconfont iconcanjiren",
              iconTitle: first,
              info: rest,
            });
            break;
          case "婴幼儿":
            this.specialServiceList.push({
              iconType: "iconfont iconnaipingyingyoueryongpin",
              iconTitle: first,
              info: rest,
            });
            break;
          case "性少数":
            this.specialServiceList.push({
              iconType: "iconfont icontongxinglian",
              iconTitle: first,
              info: rest,
            });
            break;
          case "老年人":
            this.specialServiceList.push({
              iconType: "iconfont iconlaonianren",
              iconTitle: first,
              info: rest,
            });
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style>
.hotelItem {
  height: 260px;
  width: 1200px;
  float: left;
  border: 3px solid #eee;
  box-shadow: 0 0 10px#ddd;
  background: white;
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
  text-align: center;
}
.nameContainer {
  float: left;
}
.hotelIntroBox {
  height: 100%;
  width: 300px;
  padding: 30px;
  float: left;
}
.specialServiceBox {
  height: 100%;
  width: 200px;
  padding: 30px;
  float: left;
}
.addressInfoBox {
  height: 100%;
  width: 150px;
  padding: 30px;
  float: left;
}
</style>