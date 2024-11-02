//����store
import {defineStore} from "pinia";
import {ref} from "vue";

/**
 * ��һ�����������֣�Ψһ��
 * �ڶ�������:�������������ڲ����Զ���״̬����������
 *
 * ����ֵ ������
 */
export const userTokenStore = defineStore(
    'token',()=>{
        //����״̬������

        //1.��Ӧʽ����
        const token = ref()

        //2.����һ���������޸�token��ֵ
        const setToken = (newToken) =>{
            token.value=newToken
        }

        //3.�������Ƴ�token��ֵ

        const removeToken=()=>{
            token.value=''
        }

        return{
            token,setToken,removeToken
        }
    },{
        persist:true//�־û��洢
    }
);