// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookies from 'vue-cookies'
import axios from 'axios'
Vue.use(BootstrapVue)
Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
/* eslint-disable no-new */
// router.beforeEach((to,from,next)=>{
//   if (!VueCookies.get("loginSuccess") && to.path != '/login') {
//     next({
//       path: '/login',
//     })
//   } else {
//     next()
//   }
// })


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

