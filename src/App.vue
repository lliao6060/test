<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue';
export default {
  components: {
    Navbar,
  },
  data() {
    return {};
  },
  computed: {
    nowRoute: {
      get() {
        return this.$store.state.nowRoute
      },
      set(nV) {
        this.$store.state.nowRoute = nV;
      }
    }
  },
  watch: {
    $route(nV) {
      this.nowRoute = nV.name;
      console.log(this.nowRoute)
      // console.log(this.$store.state.nowRoute);
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>


