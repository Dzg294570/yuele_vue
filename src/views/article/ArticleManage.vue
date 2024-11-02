<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'

//文章分类数据模型
const categorys = ref([
  // {
  //   "id": 3,
  //   "categoryName": "美食",
  //   "categoryAlias": "my",
  //   "createTime": "2023-09-02 12:06:59",
  //   "updateTime": "2023-09-02 12:06:59"
  // },
  // {
  //   "id": 4,
  //   "categoryName": "娱乐",
  //   "categoryAlias": "yl",
  //   "createTime": "2023-09-02 12:08:16",
  //   "updateTime": "2023-09-02 12:08:16"
  // },
  // {
  //   "id": 5,
  //   "categoryName": "军事",
  //   "categoryAlias": "js",
  //   "createTime": "2023-09-02 12:08:33",
  //   "updateTime": "2023-09-02 12:08:33"
  // }
])

//用户搜索时选中的分类id
const dishname=ref('')

//用户搜索时选中的发布状态
const type=ref('')

//文章列表数据模型
const articles = ref([
  {
    "id": 5,
    "title": "陕西旅游攻略",
    "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
    "state": "草稿",
    "categoryId": 2,
    "createTime": "2023-09-03 11:55:30",
    "updateTime": "2023-09-03 11:55:30"
  },
  {
    "id": 5,
    "title": "陕西旅游攻略",
    "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
    "state": "草稿",
    "categoryId": 2,
    "createTime": "2023-09-03 11:55:30",
    "updateTime": "2023-09-03 11:55:30"
  },
  {
    "id": 5,
    "title": "陕西旅游攻略",
    "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
    "state": "草稿",
    "categoryId": 2,
    "createTime": "2023-09-03 11:55:30",
    "updateTime": "2023-09-03 11:55:30"
  },
])
//添加分类数据模型
const menugetListModel = ref({
  id:'',
  dishname:'',
  foodingredient:'',
  seasoning:'',
  type:''
})

//展示编辑弹窗
const showDialog = (row) =>{
  dialogVisible.value = true; title.value = '编辑菜单'
  menugetListModel.value.id = row.id;
  menugetListModel.value.dishname = row.dishname;
  menugetListModel.value.foodingredient = row.foodingredient;
  menugetListModel.value.seasoning = row.seasoning;
  menugetListModel.value.type = row.type;
}



//控制添加分类弹窗
const dialogVisible = ref(false)
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数
//控制标题的展示
const title = ref('')

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  getMenuList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getMenuList()
}

import {
  menuListService,
  articleCategoryListService,
  updateMenuService,
  deleteMenuService,
  articleCategoryAddService
} from '@/api/article.js'
import {ElMessage} from "element-plus";
const articleCategoryList = async () => {
  let result = await articleCategoryListService();
  categorys.value = result.data;
}

//获取列表数据
const getMenuList = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: type.value ? type.value : null,
    dishname: dishname.value ? dishname.value : null
  }
  let result = await menuListService(params);

  total.value = result.data.total;
  articles.value = result.data.items;
}


articleCategoryList()
getMenuList()
//获取列表数据

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
  getMenuList();
  dialogVisible.value=false;
}


const updateMenu = async ()=>{

  let result = await updateMenuService(menugetListModel.value);
  ElMessage.success(result.msg ? result.msg:'修改成功')
  //调用获取所有文章分类的函数
  getMenuList();
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
        getMenuList();
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
        <span>菜单管理</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible=true; title='添加菜单';clearData()" >添加菜单</el-button>
        </div>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="菜名：">
        <el-select placeholder="请选择" v-model="dishname" style="width: 240px">
          <el-option
              v-for="c in categorys"
              :key="c.type"
              :label="c.dishname"
              :value="c.dishname">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="类型：">
        <el-select placeholder="请选择" v-model="type" style="width: 240px">
          <el-option
              v-for="c in categorys"
              :key="c.type"
              :label="c.seasoning"
              :value="c.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getMenuList">搜索</el-button>
        <el-button @click="type='' ;dishname=''">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 文章列表 -->
    <el-table :data="articles" style="width: 100%">
      <el-table-column label="菜单编号"  prop="id"></el-table-column>
      <el-table-column label="菜名" prop="dishname"></el-table-column>
      <el-table-column label="食材" prop="foodingredient"> </el-table-column>
      <el-table-column label="调料" prop="seasoning"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="做法" prop="cookingmethods"></el-table-column>
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

    <el-dialog v-model="dialogVisible" :title="title" width="50%">
      <el-form :model="menugetListModel" :rules="rules" label-width="100px" style="padding-right: 30px">
        <el-form-item label="序号" prop="id">
          <el-input v-model="menugetListModel.id" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="菜名" prop="dishname">
          <el-input v-model="menugetListModel.dishname" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="材料" prop="foodingredient">
          <el-input v-model="menugetListModel.foodingredient" minlength="1" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="调料" prop="seasoning">
          <el-input v-model="menugetListModel.seasoning" minlength="1" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="做法" prop="seasoning">
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
    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5 ,10, 15]"
                   layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
                   @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
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