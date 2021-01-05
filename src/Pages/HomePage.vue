<template>
  <div>
    <div>
      <TopBar />
    </div>
    <div class="homePageStyle">
      <div class="searchContainer">
        <SearchBar />
      </div>
      <div>
        <HotelList />
      </div>
    </div>
  </div>
</template>


<script>
import TopBar from "../components/Basic/TopBar.vue";
import HotelList from "../components/HomePage/HotelList.vue";
import SearchBar from "../components/HomePage/SearchBar";
export default {
  components: { SearchBar, HotelList, TopBar },
};
</script>

<style scoped>
.homePageStyle {
  position: relative;
  width: 100%;
  height: auto;
  background-image: linear-gradient(#f38237, #ffd1b6);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  float: left;
}
.searchContainer {
  height: 240px;
  width: 1440px;
  margin-left: 150px;
}
</style>