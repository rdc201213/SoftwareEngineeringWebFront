<template>
  <div>
    <div>
      <TopBar />
    </div>
    <div class="left-items" style="float: left;">
	    <el-input v-model="searchID" placeholder="酒店ID" style="width: 200px;"></el-input>
        <el-button  style="margin-left: 10px;" v-on:click="searchHotel()">查询</el-button>
    </div>
     	<div class="right-items" style="float: right;">
            <el-button  style="margin-left: 10px;" v-on:click="addressForm()">添加</el-button>
     	</div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="hotelID"
        label="酒店ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roomID"
        label="房间ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roomType"
        label="房间类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="起始日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="终止日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="specialService"
        label="特殊服务">
      </el-table-column>
    </el-table>


      <el-dialog title="填写地址信息" :visible.sync="addressVisible" width="30%">
            <el-form ref="address" :model="AddressInfo" label-width="150px">
                <el-form-item label="省">
                    <el-input  v-model="AddressInfo.province" style="width:250px" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="市">
                    <el-input  v-model="AddressInfo.city" style="width:250px" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="区">
                    <el-input v-model="AddressInfo.district" style="width:250px" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="AddressInfo.introduction" style="width:250px" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="房源名称">
                    <el-input v-model="AddressInfo.hotelName" style="width:250px" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="特殊服务">
                    <el-input v-model="AddressInfo.specialService" style="width:250px" placeholder=""></el-input>
                </el-form-item>
            </el-form>
                <div style="margin-top:50px;margin-left:350px">
                    <el-button type="info" icon="" v-on:click="close()" size="small">取消</el-button>
                    <el-button type="primary" style="margin-left: 0" icon="" v-on:click="submitAddress()" size="small">确认</el-button>
                </div>
      </el-dialog>


        <el-dialog title="填写房源信息" :visible.sync="addHotelVisible" width="30%">
            <el-form ref="addHotelForm" :model="HotelInfo" label-width="150px">
                <el-form-item label="房间ID">
                    <el-input  v-model="HotelInfo.roomID" style="width:250px" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="房间类型">
                    <el-input v-model="HotelInfo.roomType" style="width:250px" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="起始日期">
                    <el-input v-model="HotelInfo.startTime" style="width:250px" type="date" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="终止日期">
                    <el-input v-model="HotelInfo.endTime" style="width:250px" type="date" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="HotelInfo.price" style="width:250px" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="房间特殊服务">
                    <el-input v-model="HotelInfo.specialService" style="width:250px" placeholder=""></el-input>
                </el-form-item>
            </el-form>
                <div style="margin-top:50px;margin-left:350px">
                    <el-button type="info" icon="" v-on:click="close()" size="small">取消</el-button>
                    <el-button type="primary" style="margin-left: 0" icon="" v-on:click="submitHotel()" size="small">提交</el-button>
                </div>
        </el-dialog>
        
  </div>
</template>

<script>
import TopBar from "../components/Basic/TopBar.vue";
import axios from "axios";
export default {
  components: { TopBar },
    data(){
    return{
      addHotelVisible:false,
      addressVisible:false,
      tableData:[],
      HotelInfo:[],
      AddressInfo:[],
      hotelID:"",
      searchID:"",
      userID:"",
      userName:"",
    };
    },
    mounted: function(){
      this.userID = sessionStorage.getItem("userID");
          axios
            .post("/api/viewMyHotel", null, {
              params: {
                hotelID:this.searchID,
              },
            })
            .then((response) => {
              if (response.status == 200) {
                this.tableData = response.data.hotelInformations
              }
            })
            .catc((error) => {
              console.log(error);
              alert("加载失败");
            });
    },
    
    methods:{
        close(){
        this.addHotelVisible = false
        this.addressVisible = false
        },
        addHotelForm(){
            this.addHotelVisible=true;
        },
        addressForm(){
          this.addressVisible=true;
        },
        searchHotel(){
          axios
            .post("/api/viewMyHotel", null, {
              params: {
                hotelID:this.searchID,
              },
            })
            .then((response) => {
              if (response.status == 200) {
                this.tableData = response.data.hotelInformations
              }
            })
            .catc((error) => {
              console.log(error);
              alert("加载失败");
            });
    },
    submitAddress(){
      
            axios
            .post("/api/insertHotelAddress", null,{
            params: {   
                    province:this.AddressInfo.province, 
                    city:this.AddressInfo.city, 
                    district:this.AddressInfo.district, 
                    introduction:this.AddressInfo.introduction, 
                    hotelName:this.AddressInfo.hotelName, 
                    specialService:this.AddressInfo.specialService,
                },
            }).then(res => {
              console.log('成功')
              console.log(res.data)
              if (res.status == 200) {
                this.addressVisible = false
                alert('添加成功')
                this.addHotelVisible = true
                this.hotelID=res.hotelID
              }
              this.addressVisible = false
            }).catch(res => {
              console.log('失败')
              console.log(res)
              alert('添加失败')
            })
    },
        submitHotel(){
            axios
            .post("/api/insertHotelInformation", null,{
            params: {   
                    hotelID:this.hotelID, 
                    roomID:this.HotelInfo.roomID,
                    roomType:this.HotelInfo.roomType,
                    startTime:this.HotelInfo.startTime,
                    endTime:this.HotelInfo.endTime,
                    price:this.HotelInfo.price,
                    specialService:this.HotelInfo.specialService,
                },
            }).then(res => {
              console.log('成功')
              console.log(res.data)
              if (res.status == 200) {
                this.addHotelVisible = false
                alert('添加成功')
              }
              this.addHotelVisible = false
            }).catch(res => {
              console.log('失败')
              console.log(res)
              alert('添加失败')
            })
        },
    }
}
</script>

<style>

</style>