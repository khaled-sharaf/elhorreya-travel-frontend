import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Page404 from './views/Page404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      component: Page404
    }
  ]
})
