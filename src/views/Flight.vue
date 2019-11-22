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

    <div class="travels-content main-content">
      <travel-boxs-page
        :showLoading="showLoadingTravels"

        :changeToPrice="changeToPrice"
        :changeFromPrice="changeFromPrice"
        :changeStars="changeStars"
        :changeName="changeName"
        :changeHotel="changeHotel"
        :changeAddress="changeAddress"
        :sorting="sorting"

        :category="category"
        :paginateClick="goToPage"
        :paginateData="travelsData"
      ></travel-boxs-page>
    </div>

  </div>
</template>

<script>
import TravelBoxsPage from '@/components/TravelBoxsPage'

export default {
  name: 'travels',
  components: {
    TravelBoxsPage
  },

  data () {
    return {
      category: {
        name: "عروض الطيران",
        discount: "15",
        type: 4
      },
      imageHeader: '',
      filters: {
        category_id: 'external',
        hotel_address: '',
        filter_to_price: '',
        filter_from_price: '',
        filter_stars: 7,
        filter_name: '',
        filter_hotel: '',
        sortBy: '',
        page: 1
      },
      showLoadingTravels: true,
      travelsData: {}
    }
  },

  methods: {
    resetFilter() {
      this.filters.category_id = 'external',
      this.filters.hotel_address = '',
      this.filters.filter_to_price = '',
      this.filters.filter_from_price = '',
      this.filters.filter_stars = 7,
      this.filters.filter_name = '',
      this.filters.filter_hotel = '',
      this.filters.sortBy = '',
      this.filters.page = 1
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

    changeFromPrice(price) {
      this.filters.filter_from_price = price
      this.filters.page = 1
      this.getTravels()
    },

    changeToPrice(price) {
      this.filters.filter_to_price = price
      this.filters.page = 1
      this.getTravels()
    },

    changeStars(star) {
      this.filters.filter_stars = star
      this.filters.page = 1
      this.getTravels()
    },

    changeName(name) {
      setTimeout(() => {
        this.filters.filter_name = name
        this.filters.page = 1
        this.getTravels()
      }, 1000)
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

    goToPage(pageNum) {
      this.filters.page = pageNum
      this.getTravels()
    },
    // ======================================================================================


  },
  created () {
    this.$nextTick(() => {
      this.getTravels()
      this.imageHeader = ''
      setTimeout(() => {
        this.imageHeader = this.$settings.fight_page_bg != null ? this.$domain + this.$settings.fight_page_bg : ''
      })
    })
  }
}
</script>
