<template>
    <div class="wrapper-travels-boxs" v-if="Object.keys(paginateData).length">
      <b-container>
        <div class="header-page-boxs">
          <b-row>
            <b-col cols="7" md="4" lg="3">
              <div class="title-filter">
                <h6 class="text">اختر رحلتك بالتفاصيل المناسبة</h6>
              </div>
            </b-col>

            <b-col cols="5" md="8" lg="9">
              <div class="wrapper-sorting">
                <div class="sorting">
                  <div class="title-sorting" @click.stop="showMenuSortingInMobile()">
                    <span class="icon">
                      <i class="fas fa-sort-amount-down-alt"></i>
                    </span>
                    <h6 class="text">ترتيب حسب</h6>
                  </div>
                  <ul class="list-sorting shadow5" ref="listSorting">
                    <li :class="{active: sortBy === 'price'}" @click="sortingLocale('price')">السعر</li>
                    <li :class="{active: sortBy === 'stars'}" @click="sortingLocale('stars')">عدد النجوم</li>
                    <li :class="{active: sortBy === 'days'}" @click="sortingLocale('days')">عدد الأيام</li>

                    <li
                       :class="{active: sortBy === 'favorite'}"
                      @click="sortingLocale('favorite')"
                    >تفضيلات الحرية</li>

                    <li
                      :class="{active: sortBy === 'haram_near'}"
                      @click="sortingLocale('haram_near')"
                      v-if="typeof category === 'object' && (category.type == 1 || category.type == 2)"
                    >الأقرب إلى الحرم</li>

                    <li
                      :class="{active: sortBy === 'haram_far'}"
                      @click="sortingLocale('haram_far')"
                      v-if="typeof category === 'object' && (category.type == 1 || category.type == 2)"
                    >الأبعد عن الحرم</li>

                  </ul>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <!-- ========================================================================= -->

        <b-row>

          <b-col md="4" lg="3">
            <div class="side-right">

              <div class="box price">
                <h5 class="title">السعر</h5>

                <div class="show-price">
                  من
                  <span class="from">
                    {{ from_price }}
                  </span>
                  إلى
                  <span class="to">
                    {{ to_price }}
                  </span>
                  جنية
                </div>

                <div class="price-range">
                  <range-slider
                    v-model="to_price"
                    class="price-range-slider"
                    :min="from_price"
                    :max="max_price"
                    :step="100"
                    @change="changePriceLocale()"
                  ></range-slider>
                </div>
              </div>

              <div class="box stars">
                <h5 class="title">عدد نجوم الفندق</h5>
                <div class="stars-icon">
                  <span class="star" v-for="star in 7" :key="star" @click="changeStarsLocale(star)">
                    <i class="fa-star" :class="{fas: star <= stars, far: star > stars}"></i>
                  </span>
                </div>
              </div>

              <div
                class="box umrah-dates"
                v-if="typeof category === 'object' && category.type == 2"
              >
                <h5 class="title">موعد العمرة</h5>
                <div class="select">
                  <div class="form-group">
                    <select
                      v-model="umrah_date"
                      class="custom-select custom-select-sm"
                      @change="changeUmrahDateLocale()"
                    >
                      <option value=""></option>
                      <option v-for="date in umrahDates" :key="date" :value="date" v-text="date"></option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                class="box city"
                v-if="typeof category === 'object' && (category.type === 5 || category.type === 4 || (category.type === 3 && showAddressInOtherCategory))"
              >
                <h5 class="title">المدينة</h5>
                <div class="select">
                  <div class="form-group">
                    <select
                      v-model="city"
                      class="custom-select custom-select-sm"
                      @change="changeAddressLocale()"
                    >
                      <option value=""></option>
                      <option v-for="address in hotelsAddress" :key="address" :value="address" v-text="address"></option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                class="box hotel"
                v-if="(typeof category === 'object' && (category.type != 1 && category.type != 2)) || (typeof category !== 'object' && category === 'search' && showHotels)"
              >
                <h5 class="title">الفندق</h5>
                <div class="select">
                  <div class="form-group">
                    <select
                      v-model="hotel"
                      class="custom-select custom-select-sm"
                      @change="changeHotelLocale()"
                      >
                      <option value=""></option>
                      <option v-for="hotel in hotelsName" :key="hotel.id" :value="hotel.id" v-text="hotel.name"></option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </b-col>
          <!-- ========================================================================= -->

          <b-col md="8" lg="9">
            <div class="wrapper-boxs-content">

              <div class="boxs-content">
                <div class="wrapper-loading" v-if="showLoading">
                  <div class="loading-view">
                    <div class="icon">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </div>
                    <div class="text">من فضلك انتظر قليلا...</div>
                  </div>
                </div>
                <div class="travels-boxs-view" v-else>
                  <b-row v-if="paginateData.data.length">
                    <b-col sm="6" md="12" lg="6" xl="4" v-for="travel in paginateData.data" :key="travel.id">
                      <travel-box :travel="travel"></travel-box>
                    </b-col>
                  </b-row>

                  <b-row v-else>
                    <b-col cols="12">
                      <div class="wrapper-empty-travels">
                        <h4 class="message">
                          <span v-if="typeof category === 'object'">
                            لا يوجد فى هذا القسم رحلات متاحة حاليا
                          </span>
                          <span v-else>
                            لا توجد رحلات مشابهة لما تبحث عنه، ابحث مرة أخرى ببيانات مختلفة
                          </span>
                        </h4>
                      </div>
                    </b-col>
                  </b-row>
                </div>

              </div>
              <!-- ========================================================================= -->

              <!-- ========================================================================= -->
              <div class="footer-page-boxs">

                <paginate
                  v-show="paginateData.data.length"
                  v-model="paginateData.current_page"
                  :page-count="Math.ceil(paginateData.total / paginateData.per_page)"
                  :click-handler="paginateClick"
                  :prev-text="`<i class='fas fa-arrow-right'></i>`"
                  :next-text="`<i class='fas fa-arrow-left'></i>`"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :next-class="'next-item'"
                  :prev-class="'prev-item'"
                  :break-view-class="'break-view-class'"
                  :hide-prev-next="true"
                >
              </paginate>

              </div>
            </div>
          </b-col>
          <!-- ========================================================================= -->

        </b-row>
      </b-container>
    </div>
</template>


<script>

import TravelBox from '@/components/TravelBox'

export default {
  components: {
    TravelBox
  },

  props: {
    paginateData: {
      type: Object,
      required: true
    },
    paginateClick: {
      type: Function,
      required: true
    },
    showLoading: {
      type: Boolean,
      required: true
    },
    category: {
      required: true
    },

    changePrice: {
      type: Function,
      required: true
    },

    changeStars: {
      type: Function,
      required: true
    },

    changeAddress: {
      type: Function
    },

    changeHotel: {
      type: Function
    },

    changeUmrahDate: {
      type: Function
    },

    sorting: {
      type: Function
    },
  },

  data () {
    return {
      from_price: 200,
      to_price: 70000,
      max_price: 70000,
      stars: 7,
      city: '',
      hotel: '',
      umrah_date: '',
      sortBy: '',

      umrahDates: [],

      hotelsAddress: [],
      hotelsInSearch: [],
      showAddressInOtherCategory: false,
      showHotels: true
    }
  },


  methods: {
    changePriceLocale() {
      this.changePrice(this.to_price)
    },

    changeStarsLocale(star) {
      if (this.stars === star) return
      this.stars = star
      this.changeStars(this.stars)
    },

    changeAddressLocale() {
      if (typeof this.changeAddress === 'function') {
        this.changeAddress(this.city)
      }
    },

    changeHotelLocale() {
      if (typeof this.changeHotel === 'function') {
        this.changeHotel(this.hotel)
      }
    },

    changeUmrahDateLocale() {
      if (typeof this.changeUmrahDate === 'function') {
        this.changeUmrahDate(this.umrah_date)
      }
    },

    sortingLocale(sortBy) {
      if (typeof this.sorting === 'function') {
        if (this.sortBy == sortBy) {
          this.sortBy = ''
        } else {
          this.sortBy = sortBy
        }
        this.sorting(this.sortBy)
      }
    },

    getMinMaxPrice() {
      axios.get('/min-max-price-travels').then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.from_price = data.min
          this.max_price = data.max
          this.to_price = this.max_price
          if (typeof this.category !== 'object' && this.category === 'search') {
            setTimeout(() => {
              if (Object.keys(this.$route.query).length) {
                if (this.$route.query.filter_price != '') {
                  this.to_price = this.$route.query.filter_price
                }
              }
            }, 200)
          }
        } else {
          setTimeout(() => {
            this.getMinMaxPrice()
          }, 500)
        }
      }).catch(errors => {
        setTimeout(() => {
          this.getMinMaxPrice()
        }, 500)
      })
    },

    getUmrahDates() {
      axios.get('/umrah-dates').then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.umrahDates = data.dates
        } else {
          setTimeout(() => {
            this.getUmrahDates()
          }, 500)
        }
      }).catch(errors => {
        setTimeout(() => {
          this.getUmrahDates()
        }, 500)
      })
    },

    showMenuSortingInMobile() {
      this.$refs.listSorting.classList.toggle('active')
    },

    getCategory(id) {
      const categories = []
      this.$menuList.forEach(program => {
        program.categories.forEach(category => {
          categories.push(category)
        })
      })
      return categories.find(item => {
        return item.id == id
      })
    },

    addHotelsAddress() {
      const getAddress = setInterval(() => {
        if (this.$store.state.hotels.length) {
          clearInterval(getAddress)
          this.hotelsAddress = this.$store.state.hotels.map(hotel => {
            return hotel.address
          }).filter((value, index, self) => {
              return self.indexOf(value) === index
          })
        }
      }, 500)
    },

    handelPropsWhenChangeRouteAndMounted() {
      const getAddress = setInterval(() => {
        if (this.$store.state.hotels.length) {
          clearInterval(getAddress)
          this.hotelsAddress = this.$store.state.hotels.map(hotel => {
            return hotel.address
          }).filter((value, index, self) => {
              return self.indexOf(value) === index
          })

          if (this.category.type === 4) {
            const hotelsExternal = this.$store.state.hotels.filter((hotel) => {
              if (hotel.travels.length) {
                return hotel.travels[0].type === 'external'
              }
            })
            this.hotelsAddress = hotelsExternal.map(hotel => {
              return hotel.address
            }).filter((value, index, self) => {
                return self.indexOf(value) === index;
            })
            console.log(this.category.name, this.hotelsAddress)
          }

          this.city = ''
          if (this.category.type === 3) {
            if (this.hotelsAddress.indexOf(this.category.name) != -1) {
              this.city = this.category.name
              this.showAddressInOtherCategory = false
            } else {
              this.city = ''
              this.showAddressInOtherCategory = true
            }
          }

        }
      }, 500)
    },


    handelCategoryWhenChangeSearchFormAndMounted(category) {
      const getAddress = setInterval(() => {
        if (this.$store.state.hotels.length) {
          clearInterval(getAddress)
          this.hotelsInSearch = this.$store.state.hotels

          if (category.type === 1 || category.type === 2) {
            this.showHotels = false
          } else {
            this.showHotels = true
          }

          if (category.type === 3) {
            if (this.hotelsAddress.indexOf(category.name) != -1) {
              if (this.$store.state.searchForm.hotel_address == '') {
                this.city = ''
              }
              this.hotelsInSearch = this.$store.state.hotels.filter((hotel) => {
                  return hotel.address == category.name
              })
            } else {
              if (this.$store.state.searchForm.hotel_address == '') {
                this.hotelsInSearch = []
              }
            }
          }

          if (category.type === 5 || category.type === 4) {
            if (this.$store.state.searchForm.hotel_address == '') {
              this.hotelsInSearch = []
            }
          }
        }
      }, 500)
    },
  },

  computed: {
    hotelsName () {
      if (this.city != '') {
        return this.$store.state.hotels.filter((hotel) => {
            return hotel.address == this.city
        })
      } else {
        if (typeof this.category !== 'object' && this.category === 'search') {
          return this.hotelsInSearch
        } else {
          return []
        }
      }
    }
  },

  watch: {
    '$store.state.searchForm': {
      handler(newForm) {
        if (typeof this.category !== 'object' && this.category === 'search') {
          this.addHotelsAddress()

          this.showHotels = true
          this.hotelsInSearch = []
          this.city = ''

          if (newForm.hotel_address != '') {
            this.city = newForm.hotel_address
          }

          if (newForm.category != '') {
            const category = this.getCategory(newForm.category)
            this.handelCategoryWhenChangeSearchFormAndMounted(category)
          }
        }
      },
      deep: true
    },

    '$route.params.id'() {
      this.handelPropsWhenChangeRouteAndMounted()
      this.to_price = this.max_price
      this.sortBy = ''
      this.stars = 7
      if (this.category.type === 2) {
        this.getUmrahDates()
      }
    },

    to_price(newVal) {
      if (typeof this.category !== 'object' && this.category === 'search') {
        this.$store.state.searchForm.filter_price = newVal
      }
    },

    hotel(newVal) {
      if (typeof this.category !== 'object' && this.category === 'search') {
        this.$store.state.searchForm.filter_hotel = newVal
      }
    },

    stars(newVal) {
      if (typeof this.category !== 'object' && this.category === 'search') {
        this.$store.state.searchForm.filter_stars = newVal
      }
    },

    city(newVal) {
      if (typeof this.category !== 'object' && this.category === 'search') {
        this.$store.state.searchForm.hotel_address = newVal
      } else {
        this.hotel = ''
        this.changeHotel(this.hotel)
      }
    },

  },

  mounted () {
    this.$nextTick(() => {
      this.addHotelsAddress()
      this.getMinMaxPrice()

      if (typeof this.category !== 'object' && this.category === 'search') {
        setTimeout(() => {
          if (Object.keys(this.$route.query).length) {
            this.hotel = this.$route.query.filter_hotel
            this.stars = this.$route.query.filter_stars
            this.city = this.$route.query.hotel_address
            if (this.$route.query.category != '') {
              const category = this.getCategory(this.$route.query.category)
              this.handelCategoryWhenChangeSearchFormAndMounted(category)
            }
          }
        }, 500)
      } else {
        this.handelPropsWhenChangeRouteAndMounted()
        if (this.category.type === 2) {
          this.getUmrahDates()
        }
      }

      document.querySelector('body').onclick = () => {
        if (this.$refs.listSorting) {
          this.$refs.listSorting.classList.remove('active')
        }
      }
    })
  }
}
</script>
