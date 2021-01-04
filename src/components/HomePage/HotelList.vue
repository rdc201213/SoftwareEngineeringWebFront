<template>
  <div class="hotelListContainer">
    <HotelItem v-for="item in items" :key="item.hotelId" v-bind:data="item" />
  </div>
</template>

<script>
import HotelItem from "./HotelItem.vue";
import axios from "axios";
import eventBus from "@/eventBus.js";

export default {
  components: { HotelItem },
  data() {
    return {
      items: null,
    };
  },

  mounted() {
    axios
      .post("/api/getRandomHotel?city=上海&district=嘉定&province=上海")
      .then((response) => (this.items = response.data.member))
      .catch(function (error) {
        // 请求失败处理
        console.log(error);
      });
      eventBus.$on("info",(data)=>{this.items=data})
  },
};
</script>

<style>
.hotelListContainer {
  width: 1440px;
  height: auto;
  float: left;
  margin-left: 150px;
}
</style>