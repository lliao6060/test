<template>
  <nav id="navbar">
    Navbar
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
import { mapState } from 'vuex';
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
    .logout-btn {
      position: absolute;
      right: 0;
      cursor: pointer;
      z-index: 1;
    }
  }
</style>