import Home from '@/containers/home'
import Login from '@/containers/login'
import Add from '@/containers/home/Add'
import Order from '@/containers/order/Order';
import Fanance from '@/containers/fanance/Fanance';
import Coperation from '@/containers/coperation/Coperation';
import UserList from '@/containers/home/UserList';

export default[
    {
        path:'/home',
        component:Home,
        children:[
            {
                path:'/home/adduser',
                component:Add
            },
            {
                path:'/home/userlist',
                component:UserList
            }
        ]
    },
    {
        path:'/order',
        component:Order
    },
    {
        path:'/fanance',
        component:Fanance
    },
    {
        path:'/coperation',
        component:Coperation
    },
    {
        path:'/',
        component:Login
    }
]