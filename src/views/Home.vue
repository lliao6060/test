<template>
  <div>
    <div class="order-panel-wrapper conatiner">
      <div class="order-panel">
        <div class="box row no-gutters order-panel__content-panel">
          <order-control 
            v-if="orderNowTab.value === 'control'" 
            :data="orderList.orders"
          />

          <add-order v-if="orderNowTab.value === 'add'"/>

          <order-search 
            v-if="orderNowTab.value === 'search'" 
            :data="orderList.orders"
          />
        </div>

        <el-drawer
          direction="ltr"
          :visible.sync="orderTabDrawer"
          :with-header="false"
          size="20%"
        >
          <div class="box order-panel__tab-bar">
            <div class="box order-tab-bar">
              <ul class="order-tab-items">
                <li 
                  v-for="(tabItem,index) in orderTabList" 
                  :key="`tabItem.value${index}`" 
                  @click="changeTab(tabItem)"
                >
                  <span :class="{ 'is-active' : tabItem.value === orderNowTab.value }">{{ tabItem.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-drawer>

      </div>
    </div>

  </div>
</template>

<script>
  import OrderControl from './order/OrderControl.vue';
  import AddOrder from './order/AddOrder.vue';
  import OrderSearch from './order/OrderSearch.vue';
  import { mapActions, mapState } from 'vuex';
  export default {
    components: {
      OrderControl,
      AddOrder,
      OrderSearch,
    },
    data() {
      return {
        orderList: {
          orders: [{
              name: 'Livi優活 抽取式衛生紙(100抽x10包x10串/箱)',
              logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
              status: {
                code: 3,
                type: '已取消'
              },
              date: '107/6/12'
            },
            {
              name: 'BALMUDA The Toaster 百慕達烤麵包機-黑色',
              logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
              status: {
                code: 2,
                type: '已成立'
              },
              date: '108/7/21'
            },
            {
              name: '贈-短慧萬用鍋HD2133+三合一濾網「LG樂金」韓國原裝...',
              logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
              status: {
                code: 1,
                type: '處理中'
              },
              date: '108/6/2'
            },
            {
              name: 'Apple AirPds 2',
              logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
              status: {
                code: 4,
                type: '已送達'
              },
              date: '108/3/02'
            }
          ]
        },

        orderTabList: [{
            name: '訂單管理',
            value: 'control',
          },
          {
            name: '訂單查詢',
            value: 'search',
          },
          {
            name: '新增訂單',
            value: 'add',
          },
        ],
      };
    },
    computed: {
      ...mapState([
        'newOrders',
      ]),
      orderNowTab: {
        get() {
          return this.$store.state.orderNowTab;
        },
        set(nV) {
          this.$store.state.orderNowTab = nV;
        }
      },
      orderTabDrawer: {
        get() {
          return this.$store.state.orderTabDrawer;
        },
        set(nV) {
          this.$store.state.orderTabDrawer = nV;
        }
      },
    },
    watch: {
      newOrders(nV) {
        if(nV) {
          this.updateOrderData();
        }
      }
    },
    methods: {
      ...mapActions([
        'updateOrderTabDrawer',
      ]),
      updateOrderData() {
        const vm = this;
        vm.orderList = {
          orders: [...vm.orderList.orders, ...vm.newOrders]
        };
      },
      changeTab(tabName) {
        const vm = this;
        vm.orderNowTab = JSON.parse(JSON.stringify(tabName));
        vm.updateOrderTabDrawer(false);
      },
    },
  }
</script>

<style lang="scss">
  .order-panel-wrapper {
    padding: 10px;
    background: #fff;
    margin-top: 1%;

    .box {
      padding: 10px;
    }

    .order-panel {
      &__tab-bar {
        .order-tab-bar {
          border: 1px solid #ddd;

          .order-tab-items {
            height: 100vh;

            >li {
              padding: 10px;
              cursor: pointer;

              >span {
                position: relative;

                &.is-active {
                  color: #2780bf;
                  font-weight: bold;

                  &::before {
                    content: '▼';
                    position: absolute;
                    left: -15px;
                    font-size: 0.6rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>