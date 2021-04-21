<template>
  <div class="w-100 container">
    <el-form 
      :model="dynamicValidateForm" 
      ref="dynamicValidateForm" 
      label-width="100px" 
      class="dynamic-add-order-form"
    >
      <el-form-item
        v-for="(orderItem, index) in dynamicValidateForm.orders"
        :key="orderItem.key"
      >
        <el-form-item 
          label="商品名稱"  
          :prop="'orders.' + index + '.name'"       
          :rules="{ required: true, message: '商品名稱不可為空', trigger: 'blur'}"
          class="mb-4"
        >
          <el-col :span="22">
            <el-input v-model="orderItem.name"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button 
              v-if="index === 0"
              @click="addOrder"
            >新增</el-button>

            <el-button 
              v-else
              type="danger"
              @click.prevent="removeOrder(orderItem)"
            >删除</el-button>
          </el-col>
        </el-form-item>

        <el-form-item 
          label="圖示連結" 
          :prop="'orders.' + index + '.imgUrl'"         
          :rules="{ required: true, message: '圖示連結不可為空', trigger: 'blur'}"
          class="mb-4"
        >
          <el-input v-model="orderItem.imgUrl"></el-input>
        </el-form-item>

        <el-form-item 
          label="訂單狀態"   
          :prop="'orders.' + index + '.status'"        
          :rules="{ required: true, message: '訂單狀態不可為空', trigger: 'change'}"
          class="mb-4"
        >
          <el-select 
            v-model="orderItem.status" 
            placeholder="請選擇訂單狀態"
            class="w-100"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.type"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item 
          v-if="orderItem.status === 1 || orderItem.status === 2"
          label="預計出貨日" 
          :prop="'orders.' + index + '.shipDate'"         
          :rules="{ required: true, message: '出貨日期不可為空', trigger: 'blur'}"
          class="mb-4"
        >
          <el-date-picker 
            type="date" 
            v-model="orderItem.shipDate"
            class="w-100"
            placeholder="請選擇預計出貨日"
            :picker-options="pickerOptions"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy/MM/dd"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      dynamicValidateForm: {
        orders: [{
          name: '',
          imgUrl: '',
          status: '',
          shipDate: '',
        }],
      },
      statusList: [
        {
          code: 1,
          type: '處理中'
        }, 
        {
          code: 2,
          type: '已成立'
        }, 
        {
          code: 3,
          type: '已取消'
        }, 
        {
          code: 4,
          type: '已送達'
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
    };
  },
  methods: {
    ...mapActions([
      'updateOrderTab',
      'updateNewOrderData',
    ]),
    submitForm(formName) {
      const vm = this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.addNewOrder();
        } else {
          vm.$message.error('請填寫未填寫表單!')
          return false;
        }
      });
    },
    addNewOrder() {
      const vm = this;
      const newOrders = vm.dynamicValidateForm.orders.map(function(order) {
        return {
          name: order.name,
          logo: order.imgUrl,
          status: {
            code: order.status,
            type: vm.statusList[order.status-1].type
          },
          date: order.shipDate,
        };
      });
      console.log(newOrders)
      vm.updateNewOrderData(newOrders);
      vm.$message.success('訂單新增成功!');
      vm.updateOrderTab({
        name: '訂單管理',
        value: 'control',
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeOrder(item) {
      var index = this.dynamicValidateForm.orders.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.orders.splice(index, 1)
      }
    },
    addOrder() {
      this.dynamicValidateForm.orders.push({
        name: '',
        imgUrl: '',
        status: '',
      });
    }
  }
}
</script>

<style lang="scss">
.dynamic-add-order-form {
    .el-form-item__content {
    margin-left: 0;
  }
}
</style>