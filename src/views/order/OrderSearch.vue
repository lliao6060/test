<template>
  <div class="w-100 order-search">
    <el-input
      v-model="search" 
      placeholder="請輸入訂單名稱/出貨日"
      clearable
    ></el-input>
    <order-control :data="filteredOrders" />
  </div>
</template>

<script>
import OrderControl from './OrderControl.vue';
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    OrderControl,
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    filteredOrders() {
        const vm = this;
        const search = vm.search;
        const result = vm.data.filter(function (order) {
        let name = !search || String(order.name).toLowerCase().includes(search.toLowerCase());
        let date = !search || order.date.toLowerCase().includes(search.toLowerCase());
        return name || date;
      })
      return result;
    },
  },
}
</script>

<style lang="scss">
.order-search {
  .order-status-panel {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>