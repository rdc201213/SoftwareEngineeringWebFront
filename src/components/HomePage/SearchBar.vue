<template>
  <div class="searchBarContainer">
    <div class="searchBox">
      <el-select
        v-model="sheng"
        @change="choseProvince"
        placeholder="省级地区"
        style="width: 180px"
      >
        <el-option
          v-for="item in province"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="shi"
        @change="choseCity"
        placeholder="市级地区"
        style="width: 180px"
      >
        <el-option
          v-for="item in shi1"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="qu"
        @change="choseBlock"
        placeholder="区级地区"
        style="width: 180px"
      >
        <el-option
          v-for="item in qu1"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input"
        style="width: 360px"
      >
      </el-input>
      <el-button type="warning" @click="search()">搜索</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import eventBus from "@/eventBus.js";
export default {
  data() {
    return {
      mapJson: "/json/map.json",
      province: "",
      sheng: "",
      shi: "",
      shi1: [],
      qu: "",
      qu1: [],
      city: "",
      block: "",
      input: "",
      provinceName: "",
      cityName: "",
      blockName: "",
    };
  },
  methods: {
    // 加载china地点数据，三级
    getCityData: function () {
      var that = this;
      axios
        .get(this.mapJson)
        .then(function (response) {
          if (response.status == 200) {
            var data = response.data;
            that.province = [];
            that.city = [];
            that.block = [];
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {
                //省
                that.province.push({
                  id: item,
                  value: data[item],
                  children: [],
                });
              } else if (item.match(/00$/)) {
                //市
                that.city.push({ id: item, value: data[item], children: [] });
              } else {
                //区
                that.block.push({ id: item, value: data[item] });
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (
                  that.province[index].id.slice(0, 2) ===
                  that.city[index1].id.slice(0, 2)
                ) {
                  that.province[index].children.push(that.city[index1]);
                }
              }
            }
            // 分类区级
            for (var item1 in that.city) {
              for (var item2 in that.block) {
                if (
                  that.block[item2].id.slice(0, 4) ===
                  that.city[item1].id.slice(0, 4)
                ) {
                  that.city[item1].children.push(that.block[item2]);
                }
              }
            }
          } else {
            console.log(response.status);
          }
        })
        .catch(function (error) {
          console.log(typeof +error);
        });
    },
    // 选省
    choseProvince: function (e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.provinceName = this.province[index2].value;
          this.shi1 = this.province[index2].children;
          this.shi = this.province[index2].children[0].value;
          this.cityName = this.province[index2].children[0].value;
          this.qu1 = this.province[index2].children[0].children;
          this.qu = this.province[index2].children[0].children[0].value;
          this.blockName = this.province[index2].children[0].children[0].value;
          this.E = this.qu1[0].id;
        }
      }
    },
    // 选市
    choseCity: function (e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.cityName = this.city[index3].value;
          this.qu1 = this.city[index3].children;
          this.qu = this.city[index3].children[0].value;
          this.blockName = this.city[index3].children[0].value;
          this.E = this.qu1[0].id;
          // console.log(this.E)
        }
      }
    },
    // 选区
    choseBlock: function (e) {
      for (var index4 in this.block) {
        if (e === this.block[index4].id) {
          this.blockName = this.block[index4].value;
          this.E = e;
        }
      }
      // console.log(this.E)
    },
    search() {
      // if (this.input != "") {
      axios
        .post("/api/getHotelByAddress", null, {
          params: {
            province: this.provinceName,
            city: this.cityName,
            district: this.blockName,
            hotelName: this.input,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            eventBus.$emit("info", response.data.member);
            console.log(response.data.member)
          }
        })
        .catch((erro) => {
          console.log(erro);
        });
      // } else {
      //   axios
      //     .post("/api/getHotelByAddress", null, {
      //       params: {
      //         province: this.provinceName,
      //         city: this.cityName,
      //         district: this.blockName,
      //       },
      //     })
      //     .then((response) => {
      //       if (response.status == 200) {
      //         eventBus.$emit("info", response.data.member);
      //       }
      //     })
      //     .catch((erro) => {
      //       console.log(erro);
      //     });
      // }
    },
  },
  created: function () {
    this.getCityData();
  },
};
</script>

<style>
.searchBarContainer {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 3px 5px rgba(0, 25, 25, 0.4);
  height: 80%;
  width: 80%;
  margin-top: 20px;
  margin-left: 140px;
  float: left;
}
.searchBox {
  margin-top: 70px;
  margin-left: 100px;
  height: 60px;
  width: 90%;
}
</style>