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
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/order',
      name: 'order',
      component: Order,meta: { requiresAuth: true }
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff,meta: { requiresAuth: true }
    },
    {
      path: '/food',
      name: 'food',
      component: Food,meta: { requiresAuth: true }
    },
    {
      path: '/table',
      name: 'table',
      component: Table,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/login',
    }
  ]
})
