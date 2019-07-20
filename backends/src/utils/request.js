import axios from 'axios'
import {getSession} from '@/utils'
import qs from 'qs';
import {message} from 'antd';
import {responseText} from './config';

//axios的拦截  减少冗余的代码  减少headers的多次调用
const getToken=()=>getSession('token')==null?'':getSession('token');

const request=axios.create({
    timeout:500
})

//拦截请求
request.interceptors.request.use(config=>{
    //  console.log(config)
    const token=getToken();
     config.method == 'post'?
     config.data=qs.stringify({
         ...config.data
     })
     :config.params={...config.params};
     config.headers['Content-Type']='application/x-www-form-urlencoded';
     config.headers['authrization']=token;
     if(!token.length){
         message.error('请登录，否则没有权限访问！',10)
         window.location.href='/login';
     }
     return config;
})

//拦截响应
request.interceptors.response.use(res=>{
   if(res.status === 401 || res.status === 500){
    message[responseText[res.status].type](responseText[res.status].message);
   }
    return res;
},err=>{
    return Promise.reject(err);
})
export default request;