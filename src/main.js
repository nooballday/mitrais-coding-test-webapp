import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import UserLogin from "./modules/UserLogin.vue";
import UserRegister from "./modules/UserRegister.vue";

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: UserRegister },
  { path: '/login', component: UserLogin }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
