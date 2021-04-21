<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
      this.updateNowRoute(nV.name);
      // console.log(this.nowRoute)
      // console.log(this.$store.state.nowRoute);
    }
  },
  methods: {
    ...mapActions([
      'updateNowRoute',
    ])
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


