<template>
  <div class="row no-gutters w-100">
    <div class="col-4 box order-status-panel">
      <div class="order-filter">
        <span slot="label">訂單狀態：</span>
        <el-select 
          v-model="nowOrderStatus" 
          placeholder="請選擇訂單狀態"
        >
          <el-option 
            v-for="(statusItem,index) in options" 
            :key="`statusItem${index}`"
            :label="statusText[statusItem]" 
            :value="statusItem"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="w-100 col">
      <p
        v-if="selectOrders.length > 0" 
        class="text-right"
      >
        已選取 {{ selectOrders.length }} 筆訂單，是否要更改狀態為已取消？
        <el-button 
          size="mini"
          @click="changeOrderState"
        >是</el-button>
        <el-button 
          type="danger" 
          size="mini"
        >否</el-button>
      </p>
      <el-card 
        v-if="nowOrderStatus === 0 || nowOrderStatus === 1"
        class="order-card" 
      >
        <div slot="header" class="clearfix order-card__header">
          <span>進行中</span>
        </div>
        <div v-if="inProgressOrders.length > 0">
          <div 
            v-for="(orderItem,index) in inProgressOrders" 
            :key="`orderItem.date${index}`"
            class="row no-gutters sub-order-card"
          >
            <input 
              type="checkbox" 
              v-model="selectOrders"
              :id="`orderItem${index}`"
              :value="orderItem"
            />
            <label 
              :for="`orderItem${index}`" 
              class="w-100 d-flex"
            >
              <div class="col-2 img-box">
                <img :src="orderItem.logo" />
              </div>
              <div class="col-9 sub-order-card__content">
                <div class="sub-order-card__content--header">
                  <p :class="[statusTextClass[orderItem.status.code-1]]">{{ orderItem.status.type }}</p>
                  <p>預計出貨: {{ orderItem.date }}</p>
                </div>
                <div class="sub-order-card__content--product-intro">{{ orderItem.name }}</div>
              </div>
              <span class="sub-order-card__content--check-detail-btn">
                <i class="el-icon-arrow-right"></i>
              </span>
            </label>
          </div>
        </div>
        <div v-else>暫無資料</div>
      </el-card>

      <el-card 
        class="order-card is-complate" 
        v-if="nowOrderStatus === 0 || nowOrderStatus === 2"
      >
        <div slot="header" class="clearfix order-card__header">
          <span>已完成</span>
        </div>
        <div v-if="isComplate.length > 0">
          <div 
            v-for="(orderItem,index) in isComplate" 
            :key="`orderItem.date${index}`"
            class="row no-gutters sub-order-card"
          >
            <div class="col-2 img-box">
              <img :src="orderItem.logo" />
            </div>
            <div class="col-9 sub-order-card__content">
              <div class="sub-order-card__content--header">
                <!-- <p :class="[statusTextClass[orderItem.status]]"></p> -->
                <p>預計出貨: {{ orderItem.date }}</p>
              </div>
              <div class="sub-order-card__content--product-intro">{{ orderItem.name }}</div>
            </div>
            <span class="sub-order-card__content--check-detail-btn">
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </div>
        <div v-else>暫無資料</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderControl',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: [0, 1, 2],
      nowOrderStatus: 0,
      selectOrders: [],

      //config
      orderStatusText: ['處理中','已成立','已取消','已送達'],
      statusText: ['全選', '進行中', '已完成'],
      statusTextClass: ['success', 'success', 'deliveryOrCancelled', 'deliveryOrCancelled'],
    };
  },
  computed: {
    inProgressOrders() {
      const vm = this;
      const result = vm.data.filter(function (order) {
        return order.status.code === 1 || order.status.code === 2;
      })
      return result;
    },
    isComplate() {
      const vm = this;
      const result = vm.data.filter(function (order) {
        return order.status.code === 3 || order.status.code === 4;
      })
      return result;
    },
  },
  methods: {
    changeOrderState() {
      const vm = this;
      const targetOrders = vm.selectOrders.map(function(order) {
        return {
          name: order.name,
          logo: order.logo,
          status: {
            code: 3,
            type: '已取消'
          },
          date: order.date,
        };
      });
      vm.selectOrders.forEach(function(order) {
        const orderIndex = vm.data.indexOf(order);
        vm.data.splice(orderIndex, 1);
      })
      vm.selectOrders = [];
      vm.data = [...vm.data, ...targetOrders]
    },
  },
}
</script>

<style lang="scss">
  .order-status-panel {
    display: flex;
    align-items: flex-start;
  }

  .order-card {
    .el-card__header {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      height: 20px;
      font-size: 0.9rem;
      font-weight: bold;

      &::before {
        content: '';
        width: 5px;
        height: 20px;
        margin-right: 5px;
        background: #fdab30;
      }
    }

    .el-card__body {
      padding: 10px 0;
    }

    .sub-order-card {
      &:not(:last-child) {
        border-bottom: 1px solid #ddd;
      }

      padding: 10px;

      .img-box {
        >img {
          display: block;
          width: 90%;
          object-fit: cover;
        }
      }

      &__content {
        padding: 0 10px;
        font-size: 0.9rem;
        line-height: 1.5;
        color: #5a5a5a;

        &--header {
          display: flex;
          justify-content: space-between;

          .success {
            color: #3bcc3b;
            font-weight: bold;
          }

          .deliveryOrCancelled {
            color: gray;
            font-weight: bold;
          }
        }

        &--product-intro {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 10px 0;
        }

        &--check-detail-btn {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 1.5rem;
          color: gray;
          cursor: pointer;

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
    &.is-complate {
      .el-card__header {
        display: flex;
        align-items: center;
        background: #f5f5f5;
        height: 20px;
        font-size: 0.9rem;
        font-weight: bold;

        &::before {
          content: '';
          width: 5px;
          height: 20px;
          margin-right: 5px;
          background: #16c116;
        }
      }
      .sub-order-card {
        .img-box {
          filter: grayscale(1);
        }
      }
    }
  }
</style>