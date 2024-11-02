<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import {userRegisterService} from "@/api/user.js";
import {ElMessage} from "element-plus";
const categorys = ref([
])

import {articleCategoryAddService, articleCategoryListService,updateMenuService,deleteMenuService} from '@/api/article.js'
const articleCategoryList = async () => {
  let result = await articleCategoryListService();
  categorys.value = result.data;
}
articleCategoryList();
//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const menugetListModel = ref({
  id:'',
  dishname:'',
  foodingredient:'',
  seasoning:'',
  cookingmethods:'',
  type:''
})
//控制标题的展示
const title = ref('')

//添加分类表单校验
const rules = {
  dishname: [
    { required: true, message: '请输入菜名', trigger: 'blur' },
  ],
  foodingredient: [
    { required: true, message: '请输入材料', trigger: 'blur' },
  ],
  seasoning: [
    { required: true, message: '请输入调料', trigger: 'blur' },
  ],
  cookingmethods: [
    { required: true, message: '请输入做法', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请输入类型', trigger: 'blur' },
  ]
}
//调用接口 添加函数
const addCategory = async ()=> {
  let result = await articleCategoryAddService(menugetListModel.value);
  ElMessage.success(result.msg ? result.msg:'添加成功')
  //调用获取所有文章分类的函数
  articleCategoryList();
  dialogVisible.value=false;
}

//展示编辑弹窗
const showDialog = (row) =>{
  dialogVisible.value = true; title.value = '编辑菜单'
  menugetListModel.value.id = row.id;
  menugetListModel.value.dishname = row.dishname;
  menugetListModel.value.foodingredient = row.foodingredient;
  menugetListModel.value.seasoning = row.seasoning;
  menugetListModel.value.cookingmethods = row.cookingmethods;
  menugetListModel.value.type = row.type;
}

const updateMenu = async ()=>{

  let result = await updateMenuService(menugetListModel.value);
  ElMessage.success(result.msg ? result.msg:'修改成功')
  //调用获取所有文章分类的函数
  articleCategoryList();
  dialogVisible.value=false;
}

import {ElMessageBox} from "element-plus";
const deleteMenu = async (row)=>{
  ElMessageBox.confirm(
      '确认要删除这个菜单吗?',
      '注意',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        let result = await deleteMenuService(row.id);
        //调用获取所有文章分类的函数
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        articleCategoryList();
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '用户取消了删除操作',
        })
      })
}

//清空模型的数据
const clearData = () => {
  menugetListModel.value.id = '';
  menugetListModel.value.dishname = '';
  menugetListModel.value.foodingredient = '';
  menugetListModel.value.seasoning ='';
  menugetListModel.value.cookingmethods ='';
  menugetListModel.value.type = '';
}


</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>菜单分类</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible=true; title='添加菜单';clearData()" >添加菜单</el-button>
        </div>
      </div>
    </template>
    <el-table :data="categorys" style="width: 100%">
      <el-table-column label="序号" prop="id"> </el-table-column>
      <el-table-column label="菜名" prop="dishname"></el-table-column>
      <el-table-column label="材料" prop="foodingredient"></el-table-column>
      <el-table-column label="调料" prop="seasoning"></el-table-column>
      <el-table-column label="做法" prop="cookingmethods"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteMenu(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 添加分类弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="50%">
      <el-form :model="menugetListModel" :rules="rules" label-width="100px" style="padding-right: 30px">
        <el-form-item label="序号" prop="id">
          <el-input v-model="menugetListModel.id" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="菜名" prop="dishname">
          <el-input v-model="menugetListModel.dishname" minlength="1" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="材料" prop="foodingredient">
          <el-input v-model="menugetListModel.foodingredient" minlength="1" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="调料" prop="seasoning">
          <el-input v-model="menugetListModel.seasoning" minlength="1" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="做法" prop="cookingmethods">
          <el-input v-model="menugetListModel.cookingmethods" minlength="1" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="menugetListModel.type" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="title == '添加菜单' ? addCategory() : updateMenu()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>