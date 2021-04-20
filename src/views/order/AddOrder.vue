<template>
  <div class="w-50">
    <el-form 
      :model="dynamicValidateForm" 
      ref="dynamicValidateForm" 
      label-width="100px" 
      class="dynamic-add-order-form"
    >
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.orders"
        :key="domain.key"
      >
        <el-form-item 
          label="商品名稱"  
          :prop="'orders.' + index + '.name'"       
          :rules="{ required: true, message: '商品名稱不可為空', trigger: 'blur'}"
          class="mb-4"
        >
          <el-col :span="20">
            <el-input v-model="domain.name"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button 
              v-if="index === 0"
              @click="addDomain"
            >新增</el-button>

            <el-button 
              v-else
              @click.prevent="removeDomain(domain)"
            >删除</el-button>
          </el-col>
        </el-form-item>

        <el-form-item 
          label="圖示連結" 
          :prop="'orders.' + index + '.imgUrl'"         
          :rules="{ required: true, message: '圖示連結不可為空', trigger: 'blur'}"
          class="mb-4"
        >
          <el-input v-model="domain.imgUrl"></el-input>
        </el-form-item>

        <el-form-item 
          label="訂單狀態"   
          :prop="'orders.' + index + '.status'"        
          :rules="{ required: true, message: '訂單狀態不可為空', trigger: 'change'}"
        >
          <el-select 
            v-model="domain.status" 
            class="w-100"
            placeholder="請選擇訂單狀態"
          >
            <el-option 
              v-for="statusItem in statusList"
              :key="statusItem.code"
              :labal="statusItem.type"
              :value="statusItem.code"
            ></el-option>
          </el-select>
        </el-form-item>
        {{ domain.status }}
        <el-form-item 
          v-if="domain.status.code === 1 || domain.status.code === 2"
          label="預計出貨日" 
          :prop="'orders.' + index + '.shipDate'"         
          :rules="{ required: true, message: '出貨日期不可為空', trigger: 'blur'}"
          class="mb-4"
        >
          <el-datepicker 
            type="date" 
            v-model="domain.shipDate"
          ></el-datepicker>
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
          type: '處理中',
        },
        {
          code: 2,
          type: '已成立',
        },
        {
          code: 3,
          type: '已取消',
        },
        {
          code: 4,
          type: '已送達',
        },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.orders.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.orders.splice(index, 1)
      }
    },
    addDomain() {
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