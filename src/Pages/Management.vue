<template>
  <div>
    <div>
      <TopBar />
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="750">
        <el-table-column
            prop="hotelID"
            label="酒店ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="hotelName"
            label="酒店名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="province"
            label="省"
            width="100">
        </el-table-column>
        <el-table-column
            prop="city"
            label="市"
            width="100">
        </el-table-column>
        <el-table-column
            prop="district"
            label="区"
            width="100">
        </el-table-column>
        <el-table-column
            prop="introduction"
            label="简介"
            width="180">
        </el-table-column>
        <el-table-column
            prop="specialService"
            label="特殊服务"
            width="180">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleAccept(scope.$index,tableData)"
              type="primary"
            >同意</el-button>
            <el-button
              type="danger"
              @click="handleReject(scope.$index, tableData)"
              class="del-btn"
            >拒绝</el-button>
          </template>
        </el-table-column>
    </el-table>

        
  </div>
</template>
<script>

import TopBar from "../components/Basic/TopBar.vue";
import axios from "axios";
export default {
  components: { TopBar },
    data(){
    return{
      tableData:[],
      HotelInfo:[],
      AddressInfo:[],
      hotelID:"",
      userID:"",
      userName:"",
    };
    },
    mounted: function(){
      this.userID = sessionStorage.getItem("userID");
          axios
            .post("/api/checkHotel", null, {
              params: {
              },
            })
            .then((response) => {
              if (response.status == 200) {
                this.tableData = response.data.hotelAddress

                console.log("response.data.hotelAddress:"+response.data.hotelAddress)
                console.log("this.tableData[0]:"+this.tableData[0])}
            })
            .catch((error) => {
              console.log(error);
              alert("加载失败");
            });
    },

    methods:{
            handleAccept(index,row){
            console.log(row[index].hotelID)
            axios
            .post("/api/auditHotel",null,{
                params:{
                    hotelID: row[index].hotelID,
                    state: "通过"
                },
            })
            .then((res)=>{
                if(res.status==200){
                    this.$message({
                    message: "已同意!",
                    type: "success"
                    });
                }
            })
            .catch((error) => {
              console.log(error);
              alert("加载失败");
            });
            row.splice(index, 1);
        },
            handleReject(index,row){
            console.log(row[index].hotelID)
            axios
            .post("/api/auditHotel",null,{
                params:{
                    hotelID: row[index].hotelID,
                    state: "拒绝"
                },
            })
            .then((res)=>{
                if(res.status==200){
                    this.$message({
                    message: "已拒绝!",
                    type: "success"
                    });
                }
            })
            .catch((error) => {
              console.log(error);
              alert("加载失败");
            });
            row.splice(index, 1);
        },
    }
}

</script>