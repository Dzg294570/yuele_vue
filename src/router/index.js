import {createRouter ,createWebHistory} from 'vue-router'
//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from "@/views/Layout.vue";
import ArticleCategoryVue from "@/views/article/ArticleCategory.vue";
import ArticleManageVue from "@/views/article/ArticleManage.vue";
import UserAvatarVue from "@/views/user/UserAvatar.vue";
import UserInfoVue from "@/views/user/UserInfo.vue";
import UserResetPasswordVue from "@/views/user/UserResetPassword.vue";
import MenuChooseVue from "@/views/article/MenuChooseVue.vue";

//定义路由关系
const routes = [
    {path:'/login',component:LoginVue},
    {path:'/',component:LayoutVue,redirect:'/article/mange', children:[
            {path:'/article/category',component:ArticleCategoryVue},
            {path:'/article/mange',component:ArticleManageVue},
            {path:'/article/choose',component:MenuChooseVue},
            {path:'/user/avatar',component:UserAvatarVue},
            {path:'/user/info',component:UserInfoVue},
            {path:'/user/resetPassword',component:UserResetPasswordVue}
        ]}
]

//创建路由器
const router = createRouter({
    history:createWebHistory(),
    routes:routes

})
//到处路由器
export default router
