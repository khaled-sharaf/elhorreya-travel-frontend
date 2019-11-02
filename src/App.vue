<style lang="scss">

</style>



<template>
  <div id="app">
    <v-navbar></v-navbar>
    <router-view class="router-view-general"></router-view>
    <v-navbar-bottom></v-navbar-bottom>
    <v-footer></v-footer>

    <div class="overlay-search-mobile" v-show="$store.state.showSearchBoxMobile" @click.self="hideSearch()">
      <section class="box-search">
        <b-container>
          <search-box type="global"></search-box>
        </b-container>
      </section>
    </div>
  </div>
</template>



<script>

import VNavbar from '@/components/Navbar'
import VNavbarBottom from '@/components/NavbarBottom'
import VFooter from '@/components/Footer'

import SearchBox from '@/components/SearchBox'

export default {
  components: {
    VNavbar,
    VNavbarBottom,
    VFooter,
    SearchBox,
  },

  data() {
    return {
      keyVisitorName: 'visitor_kdue40djwytmv5sjyeig4d0dcjgys014eh9w0f8gh'
    }
  },

  methods: {
    hideSearch() {
      this.$store.dispatch('hideSearchBoxAction')
    },

    hideLoader() {
      const loader = $('.loader-global')
      loader.addClass('hide-loader')
      $('body').removeAttr('style')
      setTimeout(() => {
        loader.remove()
      }, 1000);
    },

    getAddressHotels() {
      axios.get('/hotels-address').then(response => {
        if (response.status === 200) {
          const data = response.data
          if (typeof data === 'object') {
            this.$store.state.hotels = [...data.data]
          } else {
            setTimeout(() => {
              this.getAddressHotels()
            }, 500);
          }
        }
      }).catch(errors => {
        setTimeout(() => {
          this.getAddressHotels()
        }, 500);
      })
    },

    addNewVisitor() {
      axios.put('/visitor').then(response => {
        const data = response.data
        if (typeof data === 'object') {
          if (data.status) {
            this.$store.state.visitors = data.visitors
            localStorage.setItem(this.keyVisitorName, data.visitors)
          }
        } else {
          setTimeout(() => this.addNewVisitor(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.addNewVisitor(), 500)
      })
    },
  },
  created() {
    setTimeout(() => {
      this.hideLoader()
    }, 50)


    this.getAddressHotels()

    window.onresize = () => {
      if (!this.$store.state.showSearchBox) {
        this.$store.dispatch('hideSearchDownScreens')
      }
    }
    this.$store.dispatch('hideSearchDownScreens')


    this.$store.commit('setVisitors', this.$settings.visitors)

    if (!localStorage.getItem(this.keyVisitorName)) {
      this.addNewVisitor()
    }
  }

}
</script>
