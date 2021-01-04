<template>
  <div class="orderContainer">
    <template>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column label="orderID" prop="orderID" />
        <el-table-column label="hotelName" prop="hotelName" />
        <el-table-column label="roomType" prop="roomType" />
        <el-table-column label="price" prop="price" />
        <el-table-column label="inTime" prop="inTime" />
        <el-table-column label="outTime" prop="outTime" />
        <el-table-column label="state" prop="state" />
        <el-table-column label="option" prop="buttonState">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleRemark(scope.$index, scope.row)"
              :disabled="scope.row.buttonState"
              >评论
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="订单详情" :visible.sync="detailVisible">
        <el-table :data="detailData">
          <el-table-column
            property="orderID"
            label="订单编号"
          ></el-table-column>
          <el-table-column
            property="hotelName"
            label="酒店名称"
          ></el-table-column>
          <el-table-column
            property="userName"
            label="入住人姓名"
          ></el-table-column>
          <el-table-column
            property="phoneNumber"
            label="联系电话"
          ></el-table-column>
          <el-table-column property="inTime" label="入住时间"></el-table-column>
          <el-table-column
            property="outTime"
            label="离开时间"
          ></el-table-column>
          <el-table-column
            property="roomType"
            label="房间类型"
          ></el-table-column>
          <el-table-column property="price" label="价格"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="订单评价" :visible.sync="remarkVisible">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10 }"
          placeholder="请输入评价"
          v-model="remarkInfo"
        >
        </el-input>
        <el-button type="primary" size="mini" @click="submitRemark">提交评论</el-button>
      </el-dialog>
    </template>
  </div>
</template>


<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      today: moment.now(),
      tableData: [],
      detailVisible: false,
      detailData: [],
      remarkVisible: false,
      remarkInfo: "",
      targetID: "",
    };
  },
  mounted() {
    axios
      .post("/api/searchOrderByUserId", null, {
        params: { userID: sessionStorage.getItem("userID") },
      })
      .then((response) => {
        console.log(response.data.member);
        this.tableData = response.data.member;
        console.log(this.tableData);
        this.caculateState();
      })
      .catch(function (error) {
        // 请求失败处理
        console.log(error);
      });
  },
  methods: {
    caculateState() {
      for (let i = 0; i < this.tableData.length; i++) {
        console.log(this.tableData[i]);
        if (moment(this.tableData[i].outTime).diff(this.today)) {
          this.tableData[i].state = "unfinish";
          this.tableData[i].buttonState = false;
        } else {
          this.tableData[i].state = "finish";
          this.tableData[i].buttonState = false;
        }
      }
    },
    handleDetail(index, row) {
      console.log(index, row);
      axios
        .post("api/searchOrderInformationByOrderId", null, {
          params: { orderID: row.orderID },
        })
        .then((response) => {
          this.detailData[0] = response.data.member;
          console.log(this.detailData[0]);
          this.detailVisible = true;
        });
    },
    handleRemark(index, row) {
      console.log(index, row);
      this.remarkVisible = true;
      this.targetID = row.hotelID;
    },
    submitRemark() {
      axios.post("api/makeComment", {
        commentContent: this.remarkInfo,
        userID: sessionStorage.getItem("userID"),
        hotelID: this.targetID,
      });
    },
  },
};
</script>


<style>
.orderContainer {
  height: auto;
  width: 1350px;
  float: left;
  border: 3px solid #eee;
  box-shadow: 0 0 10px#ddd;
  padding: 50px;
  margin-left: 150px;
}
</style>