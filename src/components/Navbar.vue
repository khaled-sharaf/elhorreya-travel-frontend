
<template>
  <div id="c_navbar">
    <nav class="mf-navbar" data-dir="rtl" v-show="menu.length" ref="navbar">
        <div class="logo" :class="{'hide-logo': $route.name !== 'home'}">
            <img class="img" :src="$domain + $settings.logo" :alt="'لوجو ' + $settings.site_name_ar">
        </div>
        <div class="content-nav list-start"> <!-- list-center or list-start or list-end -->
            <!-- <div class="btn-show-sidebar">
                <div class="icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div> -->
            <ul class="list list-horizontal">
                <li class="header-sidebar">
                    <div class="title-sidebar">
                      <i class="fas fa-bars"></i>
                      القائمة الرئيسية
                    </div>
                </li>
                <li :class="{active: $route.name == 'home'}"><a href="javascript.void()" @click.prevent="goToHome()">الرئيسية</a> </li>

                <li
                  class="dropdown"
                  v-for="travelProgram in menu"
                  :key="travelProgram.id"
                  :class="{active: ($route.name == 'categories' && $route.params.id == travelProgram.id) || ($route.name == 'travels' && getCategoriesIds(travelProgram).indexOf($route.params.id) != -1)}"
                >
                  <router-link :to="{name: 'categories', params: {id: travelProgram.id, travelProgram: travelProgram}}"> {{ travelProgram.name }} <i v-if="travelProgram.categories.length" class="fa fa-angle-down"></i> </router-link>
                  <ul class="dropmenu" v-if="travelProgram.categories.length">
                      <li :class="{active: $route.name == 'travels' && $route.params.id == category.id}" v-for="category in travelProgram.categories" :key="category.id">
                        <router-link :to="{name: 'travels', params: {id: category.id, category: category}}"> {{ category.name }} </router-link>
                      </li>
                  </ul>
                </li>

                <li :class="{active: $route.name == 'hotels'}"><router-link :to="{name: 'hotels'}"> الفنادق </router-link></li>
                <li :class="{active: $route.name == 'travels-images-categories' || ($route.name == 'images-category' && getCategories.indexOf($route.params.id) != -1)}"><router-link :to="{name: 'travels-images-categories'}"> الصور </router-link></li>
                <li :class="{active: $route.name == 'blogs'}"><router-link :to="{name: 'blogs'}"> المدونات </router-link></li>
                <li :class="{active: $route.name == 'who-we'}"><router-link :to="{name: 'who-we'}"> من نحن </router-link></li>
                <li :class="{active: $route.name == 'contact-us'}"><router-link :to="{name: 'contact-us'}"> اتصل بنا </router-link></li>
                <li class="d-none d-md-block" v-if="$route.name !== 'categories' && $route.name !== 'home' && $route.name !== 'travels'"><a @click.prevent="showSearch()" href="javascript.void()"> <i class="fas fa-search"></i> </a></li>

                <li class="contact-us-sidebar">
                  <div class="box-content">
                    <div class="label">
                      تابعونا على
                    </div>
                    <div class="icons">
                      <a :href="$settings.whatsapp_link" target="_blank" v-if="$settings.whatsapp_link != null && $settings.whatsapp_link != ''">
                        <i class="fab fa-whatsapp"></i>
                      </a>
                      <a :href="$settings.instagram_link" target="_blank" v-if="$settings.instagram_link != null && $settings.instagram_link != ''">
                        <i class="fab fa-instagram"></i>
                      </a>
                      <a :href="$settings.twitter_link" target="_blank" v-if="$settings.twitter_link != null && $settings.twitter_link != ''">
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a :href="$settings.facebook_link" target="_blank" v-if="$settings.facebook_link != null && $settings.facebook_link != ''">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </div>
                  </div>
                </li>
            </ul>
        </div>
        <div class="btn-back-mobile" v-if="$route.name !== 'home'" @click="back()">
          <i class="fas fa-chevron-left"></i>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: this.$menuList
    }
  },
  methods: {
    getCategoriesIds(travelProgram) {
      return travelProgram.categories.map(item => {
        return item.id
      })
    },

    showSearch() {
      this.$store.dispatch('showSearchBoxAction')
    },

    back() {
      if (history.length > 2) {
        this.$router.go(-1)
      } else {
        this.$router.push({name: 'home'})
      }
    },

    setActiveLink() {
      setTimeout(() => {
        let activeLink = ''
        $.each($(this.$refs.navbar).find('.list').children('.dropdown'), function (index, item) {
          const active = $(this).children('.dropmenu').has('li.active').parents('.dropdown')
          if (active.length) {
            active.addClass('active active-manual')
            activeLink = active[0]
          }
        })
        if (activeLink != '') {
          this.$navbarClass.setActive(activeLink)
        }
      }, 1000)
    },

    goToHome() {
      if (this.$route.name !== 'home' || (this.$route.name === 'home' && Object.keys(this.$route.query).length)) {
        this.$router.push({name: 'home'})
        this.$store.state.showSearchResult = false
      }
    }
  },
  computed: {
    getCategories() {
      const categories = []
      this.$menuList.forEach(program => {
        program.categories.forEach(category => {
          categories.push(category)
        })
      })
      return categories.map(item => {
        return item.id
      })
    },
  },
  watch: {
    '$route': {
      handler(route) {
        if (route.name === 'travels') {
          if (window.matchMedia("(min-width: 768px)").matches) {
            setTimeout(() => {
              if (!$(this.$refs.navbar).find('.active-manual').children('.dropmenu').has('li.active').length) {
                $(this.$refs.navbar).find('.active-manual').removeClass('active active-manual')
              }
              const activeLink = $(this.$refs.navbar).find('.list > li.active')[0]
              setTimeout(() => this.$navbarClass.setActive(activeLink))
            }, 100)
          }
        }
      },
      deep: true
    }
  },

  mounted() {
    if (this.$route.name === 'travels') {
      if (window.matchMedia("(min-width: 768px)").matches) {
        this.setActiveLink()
      }
    }
  }
}
</script>

