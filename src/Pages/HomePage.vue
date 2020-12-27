<template>
  <div class='homePageStyle'>
      <div class='searchContainer'>
        <SearchBar/>
      </div>
        <HotelList/>
  </div>
</template>

<script>
import HotelList from '../components/HomePage/HotelList.vue'
import SearchBar from '../components/HomePage/SearchBar'
export default {
  components: { SearchBar,HotelList },

}
</script>

<style scoped>
.homePageStyle{
  background: #ffd1b6;
  height: auto;
  width: auto;
}
.searchContainer{
  background-image: linear-gradient(#f38237, #ffd1b6);
  height: 240px;
  width: 1440px;
  margin-top: 100px;
  margin-left: 150px;
}

</style>