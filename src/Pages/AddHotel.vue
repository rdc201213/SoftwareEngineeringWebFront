<template>
  <div>
    <div>
      <TopBar />
    </div>
        <el-tag style="font-size:24px;margin-top:50px;margin-bottom:10px;">
          我的房源
        </el-tag>
          <el-button type="primary" style="margin-left:10px;float:right;margin-top:40px" icon="" @click.native="addressForm()">添加</el-button>
       <el-card class="box-card">
         
        <div class="text item">
          酒店名称：{{hotelAddress.hotelName}}
        </div>
        <div class="text item">
          所在省份：{{hotelAddress.province}}
        </div>
        <div class="text item">
          所在城市：{{hotelAddress.city}}
        </div>
        <div class="text item">
          所在区：{{hotelAddress.district}}
        </div>
        <div class="text item">
          简介：{{hotelAddress.introduction}}
        </div>
        <div class="text item">
          特殊服务：{{hotelAddress.specialService}}
        </div>
      </el-card>


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
      hotelAddress:{}
    };
    },
    mounted: function(){
      this.userID = sessionStorage.getItem("userID");
          axios
            .post("/api/viewMyHotel", null, {
              params: {
                userID:173
              },
            })
            .then((response) => {
              if (response.status == 200) {
                this.hotelAddress = response.data.hotelAddress
                console.log(response.data.hotelAddress)
              }
            })
            .catch((error) => {
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
            .catch((error) => {
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
                    userID:172
                },
            }).then(res => {
              console.log('成功')
              console.log(res.data)
              if (res.status == 200) {
                this.addressVisible = false
                alert('添加成功')
                this.addHotelVisible = true
                this.hotelID=res.data.hotelID
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
            axios
            .post("/api/auditHotel",null,{
              params:{
                hotelID:this.hotelID,
                state:"未通过"
              },
            }).then(res => {
              console.log('成功')
              console.log(res.data)
            })
        },
    }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 8px 0;
}
</style>