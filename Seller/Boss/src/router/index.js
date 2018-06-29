import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Food from '@/pages/food/index'
import Table from '@/pages/table/index'
import Staff from '@/pages/staff/index'
import Order from '@/pages/order/index'
import Login from '@/pages/login/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/food',
      name: 'food',
      component: Food
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    },
    {
      path: '*',
      redirect: '/food',
    }
  ]
})
