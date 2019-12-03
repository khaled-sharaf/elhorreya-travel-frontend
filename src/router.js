import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Blog from './views/Blog.vue'
import Blogs from './views/Blogs.vue'
import Categories from './views/Categories.vue'
import ContactUs from './views/ContactUs.vue'
import Flight from './views/Flight.vue'
import FlightVisa from './views/FlightVisa.vue'
import MarketingHotel from './views/MarketingHotel.vue'
import MarketingHotels from './views/MarketingHotels.vue'
import Hotel from './views/Hotel.vue'
import Hotels from './views/Hotels.vue'
import ImagesCategory from './views/ImagesCategory.vue'
import Travel from './views/Travel.vue'
import Travels from './views/Travels.vue'
import TravelsImagesCategories from './views/TravelsImagesCategories.vue'
import Unsubscribe from './views/Unsubscribe.vue'
import WhoWe from './views/WhoWe.vue'
import Page404 from './views/Page404.vue'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'الرئيسية'
      },
      component: Home
    },
    {
      path: '/blog/:id',
      name: 'blog',
      meta: {
        title: 'المدونة'
      },
      component: Blog
    },
    {
      path: '/blogs',
      name: 'blogs',
      meta: {
        title: 'المدونات'
      },
      component: Blogs
    },
    {
      path: '/categories/:id',
      name: 'categories',
      component: Categories
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      meta: {
        title: 'اتصل بنا'
      },
      component: ContactUs
    },
    {
      path: '/flight-offers',
      name: 'flight',
      meta: {
        title: 'عروض الطيران والتأشيرات'
      },
      component: Flight
    },
    {
      path: '/flight-offers/:id',
      name: 'flight-visa',
      meta: {
        title: 'عروض الطيران'
      },
      component: FlightVisa
    },
    {
      path: '/marketing-hotel/:id',
      name: 'marketing-hotel',
      component: MarketingHotel
    },
    {
      path: '/marketing-hotels',
      name: 'marketing-hotels',
      meta: {
        title: 'التسويق الفندقى'
      },
      component: MarketingHotels
    },
    {
      path: '/hotel/:id',
      name: 'hotel',
      component: Hotel
    },
    {
      path: '/hotels',
      name: 'hotels',
      meta: {
        title: 'الفنادق'
      },
      component: Hotels
    },
    {
      path: '/images-category/:id',
      name: 'images-category',
      component: ImagesCategory
    },
    {
      path: '/travel/:id',
      name: 'travel',
      component: Travel
    },
    {
      path: '/travels/:id',
      name: 'travels',
      component: Travels
    },
    {
      path: '/images',
      name: 'travels-images-categories',
      meta: {
        title: 'الصور'
      },
      component: TravelsImagesCategories
    },
    {
      path: '/mailing_list/unsubscribe',
      name: 'unsubscribe',
      meta: {
        title: 'إلغاء الإشتراك فى خدمة القائمة البريدية'
      },
      component: Unsubscribe
    },
    {
      path: '/who-we',
      name: 'who-we',
      meta: {
        title: 'من نحن'
      },
      component: WhoWe
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: 'صفحة غير متاحة'
      },
      component: Page404
    },
    {
      path: '*',
      meta: {
        title: 'صفحة غير متاحة'
      },
      component: Page404
    }
  ]
})

// vueRouter.beforeEach((to, from, next) => {
// })
vueRouter.afterEach((to, from, next) => {
  setTimeout(() => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if(nearestWithTitle) document.title = 'الحرية للسياحة | ' + nearestWithTitle.meta.title;
  }, 1000)
  $('html, body').scrollTop(0)
})


export default vueRouter
