import request from '@/utils/request.js'
import {userTokenStore} from "@/stores/token.js";

//文章分裂列表查询
export const articleCategoryListService =()=>{
   let tokenStore = userTokenStore();
   tokenStore.token
   return   request.get('/menu')
}


export const articleCategoryAddService = (metadata)=>{
   return  request.post('/menu/add',metadata)
}


export  const  updateMenuService = (metadata)=>{
   return request.put('/menu',metadata)
}


export const deleteMenuService = (id) =>{
   return request.delete('/menu?id='+id)
}

//列表查询
export const  menuListService = (params)=>{
   return request.get('/menuarticle',{params:params})
}