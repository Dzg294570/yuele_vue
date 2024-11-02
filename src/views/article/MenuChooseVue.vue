<script lang="ts" setup>
import { ref } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
const input = ref({
  id:'',
  dishname:'',
  foodingredient:'',
  seasoning:'',
  cookingmethods:'',
  type:''
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>菜单管理</span>
        <div class="extra">
          <el-button type="primary" >添加菜单</el-button>
        </div>
      </div>
    </template>
    <el-form inline>
      <el-form-item label="菜名：">
        <el-input
            v-model="input.dishname"
            style="width: 240px"
            placeholder="Type something"
        />
          <el-icon class="el-input__icon"><search /></el-icon>
      </el-form-item>

      <el-form-item label="类型：">
        <el-input v-model="input.type" style="width: 240px" placeholder="Please input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    </el-card>
</template>