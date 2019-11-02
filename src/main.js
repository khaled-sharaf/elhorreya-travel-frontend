import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


let domain = ''

if (process.env.NODE_ENV === 'production') {
  domain = 'http://elhorreyatravel-dev.thebabelcorp.com/'
} else {
  domain = 'http://localhost/Belal/horreya/horreya_backend/public/'
}

Vue.prototype.$domain = domain
Vue.config.productionTip = false

window.axios = axios
axios.defaults.baseURL = domain + 'api/'



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
import './plugins/datepicker'
import './plugins/vueFlux'
import './plugins/paginate'
import './plugins/money'
import './plugins/rangeSlider'
import './plugins/social-sharing'
import './plugins/mf-stack'



(function getMenuAndSettings() {

  axios.get('/menu-and-settings').then(response => {
    if (response.status === 200) {
      const data = response.data
      if (typeof data === 'object') {
        Vue.prototype.$settings = data.settings
        Vue.prototype.$menuList = data.menu
        setTimeout(() => {
          new Vue({
            router,
            store,
            render: h => h(App)
          }).$mount('#app')

          Vue.prototype.$navbarClass = $('.mf-navbar').mfNavbar({
              fixedBody: false,
              closeSidebarAfterClick: true
          });
        })
      } else {
        setTimeout(() => {
          getMenuAndSettings()
        }, 1000)
      }
    }
  }).catch(error => {
    setTimeout(() => {
      getMenuAndSettings()
    }, 1000)
  })
}())


