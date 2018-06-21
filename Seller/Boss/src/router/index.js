import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/pages/index/index'
import Table from '@/pages/table/index'
import Staff from '@/pages/staff/index'
import Order from '@/pages/order/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Order
    }
  ]
})
