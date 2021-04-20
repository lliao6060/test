import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'

Vue.config.productionTip = false


import './styles/_reset.scss';
import './styles/global.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')