
<template>
  <el-container style="background-color: #f5f7fa">
    <div>
      <TopBar />
    </div>
    <!-- <el-header style="padding:0;margin:0;">
        <el-card class="box-card" style="">
          酒店系统
        </el-card>
      </el-header> -->
    <el-main style="overflow: unset; padding: 0">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="margin-top: 50px; margin-bottom: 50px"
      >
        <el-breadcrumb-item style="color: #409eff" :to="{ path: '/' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/' }">酒店列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">{{
          hotel.hotelName
        }}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-dialog title="提交订单" :visible.sync="newOrderVisible" width="30%">
        <el-form ref="newOrderForm" :model="newOrderForm" label-width="150px">
          <el-form-item label="用户名">
            <el-input
              v-model="userName"
              style="width: 250px"
              placeholder="暂无用户名称"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="酒店名">
            <el-input
              v-model="hotel.hotelName"
              style="width: 250px"
              placeholder="暂无酒店名称"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="房间类型">
            <el-input
              v-model="currentType"
              style="width: 250px"
              placeholder="暂无房间类型"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="价格(￥)">
            <el-input
              v-model="currentPrice"
              style="width: 250px"
              placeholder="暂无价格"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input
              v-model="newOrderForm.phoneNumber"
              style="width: 250px"
              placeholder="请输入您的手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="出入时间">
            <el-date-picker
              v-model="daterange"
              style="width: 250px"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div style="margin-top: 50px; margin-left: 350px">
          <el-button type="info" icon="" v-on:click="close()" size="small"
            >取消</el-button
          >
          <el-button type="primary" icon="" v-on:click="newOrder()" size="small"
            >提交</el-button
          >
        </div>
      </el-dialog>

      <el-card class="box-card" style="margin-bottom: 30px">
        <div class="detail-headline_container">
          <div class="detail-headline_base">
            <div class="detail-headline_title">{{ hotel.hotelName }}</div>
            <el-rate
              v-model="hotel.star"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
              v-if="hotel.star"
            >
            </el-rate>
            <div class="detail-headline_address">
              <i class="u-icon" type="locate"
                >{{ hotel.province }}，{{ hotel.city }}，{{ hotel.district }}</i
              >
            </div>
          </div>
          <div class="detail-head-price_container">
            <el-button href="#roomlist" class="select_room" type="primary"
              >选择房间</el-button
            >
          </div>
        </div>
        <div class="detail-headcontext">
          <div class="detail-headcontext_picture">
            <img
              :src="hotel.photoURL"
              alt=""
              class="pic"
              style="width: 500px; height: 285px; float: left"
            />
          </div>
          <div
            class="detail-headcontext_title"
            style="float: left; margin: 30px 30px; height: 225px"
          >
            {{ hotel.introduction }}
          </div>
        </div>
      </el-card>

      <div id="roomlist" v-for="(room, index) in rooms" :key="index">
        <el-card class="box-card" style="margin-top: 4px; padding: 16px 24px 0">
          <div class="detail-headline_container">
            <div
              class="soloroom roomlist-baseroom-card"
              style="width:100%display:inline-block;float:left;padding-bottom: 22px;width:100%;border-right: 1px solid #dadfe6;"
            >
              <div class="roompanel" style="">
                <img
                  :src="room.photoURL"
                  alt=""
                  class="pic"
                  style="
                    width: 100px;
                    height: 85px;
                    float: left;
                    padding-right: 30px;
                  "
                />
                <div
                  class="roomtype"
                  style="padding-top: 100px; font-weight: bold"
                >
                  {{ room.roomType }}
                </div>
              </div>
            </div>
            <div
              style="
                width: 3400px;
                padding-left: 50px;
                padding-top: 20px;
                font-size: 20px;
                flex: auto;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
              "
            >
              {{ room.specialService }}。
            </div>
            <div
              style="
                width: 1000px;
                padding-top: 20px;
                font-size: 20px;
                flex: auto;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
              "
            >
              ￥{{ room.price }}
            </div>
            <div
              class="detail-head-price_container"
              style="
                flex: auto;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
              "
            >
              <el-button
                v-on:click="addOrder(room.roomType, room.price)"
                style="height: 60px"
                class="select_room"
                type="primary"
                >提交订单</el-button
              >
            </div>
          </div>
        </el-card>
      </div>

      <el-tag style="margin-top: 100px; font-size: 24px">评论</el-tag>
      <div id="commentlist" v-for="(comment, index) in comments" :key="index">
        <el-card class="box-card" style="margin-top: 4px; padding: 16px 24px 0">
          <div class="detail-headline_container">
            <div
              class="soloroom roomlist-baseroom-card"
              style="width:100%display:inline-block;float:left;padding-bottom: 22px;width:100%;border-right: 1px solid #dadfe6;"
            >
              <div class="roompanel" style="">
                <div class="roomtype" style="padding-top: 20px; color: green">
                  用户名：
                </div>
                <div class="roomtype" style="font-size: 22px; color: #409eff">
                  {{ comment.userName }}
                </div>
              </div>
            </div>
            <div
              style="
                width: 2400px;
                padding-left: 50px;
                padding-top: 20px;
                font-size: 20px;
                flex: auto;
                display: block;
                flex-direction: row;
                justify-content: flex-end;
              "
            >
              {{ comment.commentContent }}。
            </div>
            <div
              style="
                width: 1000px;
                padding-top: 120px;
                font-size: 14px;
                flex: auto;
                display: block;
                flex-direction: row;
                justify-content: flex-end;
                color: grey;
              "
            >
              发布时间：{{ comment.commentTime }}
            </div>
          </div>
        </el-card>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import TopBar from "../components/Basic/TopBar.vue";
import axios from "axios";
export default {
  components: { TopBar },
  data() {
    return {
      islogin: false,
      hotelId: "",
      hotel: {},
      rooms: {},
      comments: {},
      userID: "1",
      userName: "小明",
      currentPrice: "1",
      currentType: "1",
      daterange: "",
      newOrderForm: {},
      newOrderVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()- 3600 * 1000 * 24;
        },
      },
    };
  },
  mounted: function () {
    this.hotelId = this.$route.query.hotelId;
    this.islogin = sessionStorage.getItem("islogin");
    this.userID = sessionStorage.getItem("userID");
    this.userName = sessionStorage.getItem("userName");
    console.log("this.hotelId:" + this.hotelId);
    this.hotelQuery();
    this.roomsQuery();
    this.commentsQuery();
    // 详情
    // {{$route.query}}
  },
  methods: {
    hotelQuery() {
      axios
        .post("/api/viewHotelDetail", null, {
          params: {
            hotelID: this.hotelId,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            // alert("查询酒店信息成功");
            this.hotel = response.data.member;
            console.log("this.hotel:" + this.hotel);
            console.log("this.hotel.star:" + this.hotel.star);
            console.log("this.hotel.district:" + this.hotel.district);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("暂无酒店信息");
        });
    },
    roomsQuery() {
      axios
        .post("/api/getRoomByHotel", null, {
          params: {
            hotelID: this.hotelId,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            // alert("查询房间信息成功");
            this.rooms = response.data.member;
            // console.log("this.rooms:"+this.rooms)
            // console.log("length of this.rooms:"+this.rooms.length)
            // console.log("this.rooms[0].roomType:"+this.rooms[0].roomType)
          }
        })
        .catch((error) => {
          console.log(error);
          alert("该酒店暂无房间信息");
        });
    },
    commentsQuery() {
      var comments = "";
      axios
        .post("/api/getComment", null, {
          params: {
            hotelID: this.hotelId,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            // alert("查询评论信息成功");
            comments = response.data.map((comment) => {
              return comment;
            });
            this.comments = comments;
            console.log("this.comments:" + this.comments);
            console.log("length of this.comments:" + this.comments.length);
            console.log(
              "this.comments[0].commentContent:" +
                this.comments[0].commentContent
            );
            console.log(
              "this.comments[0].userName:" + this.comments[0].userName
            );
          }
        })
        .catch((error) => {
          console.log(error);
          alert("该酒店暂无评论信息");
        });
    },
    close() {
      this.newOrderVisible = false;
      this.newOrderForm = {};
    },
    newOrder() {
      if (sessionStorage.getItem("islogin") === "true") {
        axios
          .post("/api/insertNewOrder", null, {
            params: {
              hotelID: this.hotelId,
              hotelName: this.hotel.hotelName,
              roomType: this.currentType,
              price: this.currentPrice,
              userID: this.userID,
              userName: this.userName,
              inTime: this.daterange[0],
              outTime: this.daterange[1],
              phoneNumber: this.newOrderForm.phoneNumber,
            },
          })
          .then((response) => {
            if (response.status == 200) {
              alert("提交订单信息成功");
              this.newOrderForm = {};
              this.newOrderVisible = false;
            }
          })
          .catch((error) => {
            console.log(error);
            alert("提交订单信息失败");
          });
        console.log(this.daterange);
        // console.log(typeof(this.daterange[1].toString().substring(0,10)))
      } else {
        alert("请先登录");
        this.$router.push("/Login");
      }
    },
    addOrder(type, price) {
      if (sessionStorage.getItem("islogin") === "true") {
        this.currentType = type;
        this.currentPrice = price;
        this.newOrderVisible = true;
      } else {
        alert("请先登录");
        this.$router.push("/Login");
      }
    },
  },
};
</script>

<style>
.roompanel {
  flex: auto;
  max-width: 124px;
  width: 124px;
}
.el-header {
  background-color: green;
}
.el-main {
  /* background-color:#f5f7fa; */
  width: 60%;
  margin: 0 auto;
  padding: 0;
  overflow: unset;
}
.roomtype {
  width: 100px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #0f294d;
  padding: 6px 0;
}
.el-card {
  margin-right: 0;
  padding-right: 0;
}
.roomlist-baseroom-card {
  display: flex;
}
.detail-headline_container {
  display: flex;
}
.detail-headline_title {
  font-size: 20px;
  color: #0f294d;
  display: inline;
  margin-right: 8px;
  line-height: 26px;
  font-weight: bold;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
}
.detail-headcontext_title {
  background: #f5f9ff;
  height: 100%;
  width: 100%;
  margin-left: 20px;
  position: relative;
  overflow: hidden;
  outline: 15px solid #f5f9ff;
  overflow: auto;
}
.u-icon {
  font: 12px/1.5 Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #455873;
  letter-spacing: 0;
  text-align: left;
  line-height: 18px;
  margin-left: 2px;
  padding-left: 2px;
  display: inline-block;
  font-weight: 400;
}
.detail-head-price_container {
  /* background-color: violet; */
  flex: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 4px;
}
.select_room {
}
.detail-headcontext {
  position: relative;
  display: flex;
}
.detail-headcontext_picture {
  /* width: 35%; */
  position: relative;
  /* max-width: 57%; */
  padding-bottom: 25%;
  height: 0;
  background-size: cover;
}
.pic {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  /* width: 100%; */
  font-family: PingFangSC-Regular;
  color: rgb(255, 255, 255);
  font-size: 12px;
  text-align: center;
}
.el-divider {
  display: inline-block;
}
</style>