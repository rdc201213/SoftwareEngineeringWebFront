<template>
  <div>
      详情
      {{$route.query}}
  </div>
</template>

<script>
export default {
  data(){
    return{
      id:""
    }

  },
mounted: function () {
      this.id = this.$route.query.hotelId
      console.log(this.id)
    }
}
</script>

<style>

</style>