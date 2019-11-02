<style lang="scss" scoped>

</style>



<template>
  <div id="hotels">
    <flux-parallax class="parallax-header hotels-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">عروض الفنادق</span>
          </h1>
        </div>
      </div>
    </flux-parallax>

    <div class="hotels-content main-content">

      <div class="wrapper-travels-boxs">
        <b-container>
          <div class="header-page-boxs">
            <b-row>
              <b-col cols="7" md="4" lg="3">
                <div class="title-filter">
                  <h6 class="text">اختر الفندق المناسب لك</h6>
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
                      <li :class="{active: filters.sortBy === 'stars'}" @click="sorting('stars')">عدد النجوم</li>
                      <li :class="{active: filters.sortBy === 'rating'}" @click="sorting('rating')">التقييم</li>

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

                <div class="box stars">
                  <h5 class="title">عدد نجوم الفندق</h5>
                  <div class="stars-icon">
                    <span class="star" v-for="star in 7" :key="star" @click="changeStars(star)">
                      <i class="fa-star" :class="{fas: star <= filters.stars, far: star > filters.stars}"></i>
                    </span>
                  </div>
                </div>

                <div class="box city">
                  <h5 class="title">المدينة</h5>
                  <div class="select">
                    <div class="form-group">
                      <select
                        v-model="filters.city"
                        class="custom-select custom-select-sm"
                        @change="changeAddress()"
                      >
                        <option value=""></option>
                        <option v-for="address in hotelsAddress" :key="address" :value="address" v-text="address"></option>
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
                    <b-row v-if="Object.keys(hotelsPaginateData).length && hotelsPaginateData.data.length">
                      <b-col sm="6" lg="4" v-for="hotel in hotelsPaginateData.data" :key="hotel.id">
                        <div class="hotel box-flat">
                          <router-link
                            class="wrapper-link"
                            :to="{name: 'hotel', params: {id: hotel.id, hotel: hotel}}"
                            :style="{'background-image': `url('${$domain + hotel.image}')`}"
                          >
                            <div class="discount">
                              <span class="number">{{ hotel.stars }}</span>
                              نجوم
                            </div>
                            <div class="content">
                              <h4 class="name" v-text="hotel.name"></h4>
                              <div class="address" v-text="hotel.address"></div>
                              <div class="rating">
                                <span class="number" v-text="(hotel.rating / 20).toFixed(1)"></span>
                                <rating :number="hotel.rating"></rating>
                              </div>
                            </div>
                          </router-link>
                        </div>
                      </b-col>
                    </b-row>

                    <b-row v-else>
                      <b-col cols="12">
                        <div class="wrapper-empty-travels">
                          <h4 class="message">
                            <span>
                              لا توجد فنادق بهذه المواصفات
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
                    v-show="Object.keys(hotelsPaginateData).length && hotelsPaginateData.data.length"
                    v-model="hotelsPaginateData.current_page"
                    :page-count="Math.ceil(hotelsPaginateData.total / hotelsPaginateData.per_page)"
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

    </div>
  </div>
</template>



<script>
import Rating from '@/components/Rating'

export default {
  name: 'hotels',
  components: {
    Rating
  },

  data() {
    return {
      imageHeader: '',
      filters: {
        stars: 7,
        city: '',
        sortBy: '',
        page: 1
      },
      showLoading: true,
      hotelsPaginateData: {}
    }
  },


  methods: {
    sorting(sortBy) {
      if (this.filters.sortBy == sortBy) {
        this.filters.sortBy = ''
      } else {
        this.filters.sortBy = sortBy
      }
      this.filters.page = 1
      this.getHotels()
    },

    getHotels(filters = this.filters) {
      this.showLoading = true
      axios.get('/hotels', {params: filters}).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.hotelsPaginateData = data.hotels
          this.showLoading = false
        } else {
          setTimeout(() => this.getHotels(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getHotels(), 500)
      })
    },

    changeStars(star) {
      if (this.stars === star) return;
      this.filters.stars = star
      this.filters.page = 1
      this.getHotels()
    },

    changeAddress() {
      this.filters.page = 1
      this.getHotels()
    },

    paginateClick (pageNum) {
      this.filters.page = pageNum
      this.getHotels()
    },

    showMenuSortingInMobile() {
      this.$refs.listSorting.classList.toggle('active')
    },

  },

  computed: {
    hotelsAddress() {
      return this.$store.state.hotels.map(hotel => {
        return hotel.address
      }).filter((value, index, self) => {
          return self.indexOf(value) === index;
      })
    },
  },

  mounted () {
    this.$nextTick(() => {
      this.getHotels()
      document.querySelector('body').onclick = () => {
        if (this.$refs.listSorting) {
          this.$refs.listSorting.classList.remove('active')
        }
      }
      this.imageHeader = ''
      setTimeout(() => {
        this.imageHeader = this.$settings.hotels_page_bg != null ? this.$domain + this.$settings.hotels_page_bg : ''
      })
    })
  }



}
</script>

