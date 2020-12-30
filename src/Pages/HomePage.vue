<template>
  <div class="homePageStyle">
    <div>
      <TopBar/>
    </div>
    <div class="searchContainer">
      <SearchBar />
    </div>
    <div>
    <HotelList />
    </div>
  </div>
</template>


<script>
import TopBar from '../components/Basic/TopBar.vue';
import HotelList from "../components/HomePage/HotelList.vue";
import SearchBar from "../components/HomePage/SearchBar";
export default {
  components: { SearchBar, HotelList, TopBar },
};
</script>

<style scoped>
.homePageStyle {
  background: #ffd1b6;
  width: 100%;
}
.searchContainer {
  background-image: linear-gradient(#f38237, #ffd1b6);
  height: 240px;
  width: 1440px;
  margin-top: 100px;
  margin-left: 150px;
}
</style>