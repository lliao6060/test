<template>
  <div id="login">
    <div class="login-route">
      <el-card class="login-route login-route--login-box">
        <header class="login-header">
          <h1 class="h-title login-title">登入</h1>
        </header>
        <el-form 
          :model="loginFrom" 
          status-icon 
          :rules="rules" 
          ref="loginFrom" 
          label-width="60px"
          class="demo-loginFrom"
        >
          <el-form-item 
            label="帳號" 
            prop="account"
          >
            <el-input v-model="loginFrom.account"></el-input>
          </el-form-item>
          <el-form-item 
            label="密碼" 
            prop="password"
          >
            <el-input 
              v-model="loginFrom.password"
              show-password
              @keyup.native="autoInsert"
              oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary" 
              @click="submitForm('loginFrom')"
            >登入</el-button>
            <el-button @click="resetForm('loginFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginIn',
    data() {
      return {
        loginFrom: {
          account: '',
          password: '',
        },
        rules: {
          account: [   
            { 
              required: true, 
              message: '請輸入帳號(email格式)', 
              trigger: 'blur' 
            },
            { 
              type: 'email', 
              message: '請輸入正確的帳號格式', 
              trigger: ['blur', 'change'] 
            } 
          ],
          password: [{
              required: true,
              message: '請輸入密碼',
              trigger: 'blur'
            },
          ],
        },
      };
    },
    methods: {
      login() {
        const vm = this;
        const account = vm.loginFrom.account;
        const password = vm.loginFrom.password;
        if( account == 'meiliao1207@gmail.com' && password == '1234' ){
          vm.$message.success('會員登入成功!');
          localStorage.setItem('token', 'ImLogin');
          vm.$router.push({
            name: 'Home',
          });
        } else {
          vm.$message.error('帳號或密碼輸入錯誤');
        }
      },
      submitForm(formName) {
        const vm = this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.login();
          } else {
            vm.$message.error('請確認未填寫表單!');
            return false;
          }
        });
      },
      resetForm(formName) {
        const vm = this;
        vm.$refs[formName].resetFields();
      },
      autoInsert(e) {
        const vm = this;
        if(e.keyCode === 13) {
          vm.submitForm('loginFrom');
        }
      }
    }
  }
</script>

<style lang="scss">
  #app {
    margin-bottom: 0 !important;
  }

  #login {
    background-image: linear-gradient(-20deg, #c1cea887 0%, #c6c9cc 70%, #ffe4d7 100%);
    height: 100vh;
    .login-route {
      padding: 10px;

      &--login-box {
        max-width: 440px;
        width: calc(100% - 40px);
        min-width: 320px;
        min-height: 338px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #ddd;
        background-color: #fff;
        line-height: 2;
        box-sizing: border-box;
        .login-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 3%;
          .login-title {
            margin-left: 1rem;
          }
          >img {
            display: block;
            width: 15%;
          }
        }
      }
    }
  }
</style>