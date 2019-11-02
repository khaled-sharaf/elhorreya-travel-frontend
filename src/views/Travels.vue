<template>
  <div id="travels">
    <flux-parallax class="parallax-header categories-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">
              {{ category.name }}
            </span>
          </h1>
        </div>

        <div class="header-left">
          <!-- in desktop -->
          <div class="discount d-none d-md-flex">
              <span class="main-color">
                عروض
                <br>
                و
                <br>
                خصومات
              </span>
              <span>تصل <br> إلى</span>
              <span class="number main-color"> {{ category.discount }}% </span>
          </div>
        </div>

      </div>
    </flux-parallax>

    <section class="box-search" v-show="$store.state.showSearchBoxPages">
      <b-container>
        <search-box></search-box>
      </b-container>
    </section>

    <div class="travels-content main-content">
      <travel-boxs-page
        :showLoading="showLoadingTravels"

        :changePrice="changePrice"
        :changeStars="changeStars"
        :changeHotel="changeHotel"
        :changeAddress="changeAddress"
        :changeUmrahDate="changeUmrahDate"
        :sorting="sorting"

        :category="category"
        :paginateClick="goToPage"
        :paginateData="travelsData"
      ></travel-boxs-page>
    </div>

  </div>
</template>

<script>

import SearchBox from '@/components/SearchBox'
import TravelBoxsPage from '@/components/TravelBoxsPage'

export default {
  name: 'travels',
  components: {
    SearchBox,
    TravelBoxsPage
  },

  data () {
    return {
      category: {},
      imageHeader: '',
      filters: {
        category_id: '',
        hotel_address: '',
        filter_price: '',
        filter_stars: 7,
        filter_hotel: '',
        umrah_date: '',
        sortBy: '',
        page: 1
      },
      showLoadingTravels: true,
      travelsData: {}
    }
  },

  methods: {
    resetFilter() {
      this.filters.category_id = '',
      this.filters.hotel_address = '',
      this.filters.filter_price = '',
      this.filters.filter_stars = 7,
      this.filters.filter_hotel = '',
      this.filters.umrah_date = '',
      this.filters.sortBy = '',
      this.filters.page = 1
    },

    getCategory (id) {
      this.resetFilter()
      const categories = []
      this.$menuList.forEach(program => {
        program.categories.forEach(category => {
          categories.push(category)
        })
      })
      this.category = categories.find(item => {
        return item.id == id
      })
      if (typeof this.category === 'object' && Object.keys(this.category).length) {
        this.imageHeader = ''
        this.$nextTick(() => {
          setTimeout(() => {
            this.imageHeader = this.category.image != null ? this.$domain + this.category.image : ''
          })
          this.$route.meta.title = this.category.name
          this.filters.category_id = this.category.id
          this.getTravels()
        })
      } else {
        this.$router.push({name: '404'})
      }
    },


    getTravels(filters = this.filters) {
      this.showLoadingTravels = true
      axios.get('/get-travels-by-category', {params: filters}).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.travelsData = data.travels
          this.showLoadingTravels = false
        } else {
          setTimeout(() => this.getTravels(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getTravels(), 500)
      })
    },

    sorting(sortBy) {
      this.filters.sortBy = sortBy
      this.filters.page = 1
      this.getTravels()
    },

    changePrice(price) {
      this.filters.filter_price = price
      this.filters.page = 1
      this.getTravels()
    },

    changeStars(star) {
      this.filters.filter_stars = star
      this.filters.page = 1
      this.getTravels()
    },

    changeHotel(hotelId) {
      this.filters.filter_hotel = hotelId
      this.filters.page = 1
      this.getTravels()
    },

    changeAddress(address) {
      this.filters.hotel_address = address
      this.filters.page = 1
      this.getTravels()
    },

    changeUmrahDate(date) {
      this.filters.umrah_date = date
      this.filters.page = 1
      this.getTravels()
    },

    goToPage(pageNum) {
      this.filters.page = pageNum
      this.getTravels()
    },
    // ======================================================================================


  },

  watch: {
    '$route.params.id' (id) {
      this.getCategory(id)
    }
  },
  created () {
    this.getCategory(this.$route.params.id)
  }
}
</script>
