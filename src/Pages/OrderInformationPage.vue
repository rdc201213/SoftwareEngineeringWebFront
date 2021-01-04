<template>
  <div>
      <TopBar/>
      <OrderTable/>
  </div>
</template>

<script>
import TopBar from '../components/Basic/TopBar.vue'
import OrderTable from '../components/OrderInformationPage/OrderTable.vue'
export default {
  components: { TopBar, OrderTable },

}
</script>

<style>

</style>