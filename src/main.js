import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import EvaIcons from 'vue-eva-icons'

Vue.use(EvaIcons)

const $api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpResquest'
    }
  }
}) 

Vue.prototype.$api = $api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')