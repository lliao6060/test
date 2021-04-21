<template>
  <nav id="navbar">
    Navbar

    <div 
      class="burger" 
      @click="updateOrderTabDrawer(true)"
    >
      <span>
        <i class="el-icon-s-operation"></i>
      </span>
    </div>
    <div class="logout-btn">
      <div
        v-if="nowRoute !== 'Login'" 
        class="logout-box"
      >
        <el-popconfirm 
          title="確定要登出嗎？" 
          @confirm="loginout"
        >
          <el-avatar slot="reference" icon="el-icon-user-solid"></el-avatar>
        </el-popconfirm>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Navbar',
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'nowRoute',
    ]),
  },
  methods: {
    ...mapActions([
      'updateOrderTabDrawer',
    ]),
    loginout() {
      const vm = this;
      localStorage.removeItem('token', 'ImLogin');
      vm.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
  #navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000b8;
    color: #fff;
    height: 50px;
    font-size: 1.2rem;
    .burger,
    .logout-btn {
      position: absolute;
      padding: 10px;
      cursor: pointer;
      z-index: 1;
    }
    .burger {
      left: 0;
      font-size: 1.5rem;
    }
    .logout-btn {
      right: 0;
    }
  }
</style>