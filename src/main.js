import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

window.axios = axios
axios.defaults.baseURL = 'http://localhost/Belal/horreya/horreya_backend/public/api/'

Vue.config.productionTip = false


// tool vue app
import  './import-css-js.js'
import  './filters.js'
import  './directives.js'
import  './components.js'


// plugins
import './plugins/bootstrap'
import './plugins/overlayscrollbars'
import './plugins/vform'
import './plugins/sweetalert2'




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
