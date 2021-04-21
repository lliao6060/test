import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowRoute: '',
    orderTabDrawer: false,
    orderNowTab: {
      name: '訂單管理',
      value: 'control',
    },
    newOrders: [],
    dataList: [],
  },
  mutations: {
    updateOrderTabDrawer(state, bool) {
      state.orderTabDrawer = bool;
    },
    updateOrderTab(state, tabName) {
      state.orderNowTab = tabName;
    },
    updateNewOrderData(state, newData) {
      state.newOrders = newData;
    },
    updateDataList(state, newData) {
      state.dataList = newData;
    },
  },
  actions: {
    updateOrderTabDrawer({ commit }, bool) {
      commit('updateOrderTabDrawer', bool);
    },
    updateOrderTab({ commit }, tabName) {
      commit('updateOrderTab', tabName);
    },
    updateNewOrderData({ commit }, newData) {
      commit('updateNewOrderData', newData);
    },
    updateDataList({ commit }, newData) {
      commit('updateDataList', newData);
    },

  },
  modules: {
  }
})
