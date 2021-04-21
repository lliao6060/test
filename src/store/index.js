import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowRoute: '',
    orderNowTab: {
      name: '訂單管理',
      value: 'control',
    },
    newOrders: [],
  },
  mutations: {
    updateOrderTab(state, tabName) {
      state.orderNowTab = tabName;
    },
    updateNewOrderData(state, newData) {
      state.newOrders = newData;
    },
  },
  actions: {
    updateOrderTab({ commit }, tabName) {
      commit('updateOrderTab', tabName);
    },
    updateNewOrderData({ commit }, newData) {
      commit('updateNewOrderData', newData);
    },

  },
  modules: {
  }
})
