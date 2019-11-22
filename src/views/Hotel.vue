<template>
  <div id="hotel">
    <flux-parallax class="parallax-header hotel-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">فندق {{ hotel.name }}</span>
          </h1>

          <div class="desc">
            <h3 class="text">
              <span class="icon">
                <i class="fas fa-map-marker-alt"></i>
              </span>
              {{ hotel.address }}
            </h3>
            <!-- <div class="rating">
                <span class="number"> {{ (hotel.rating / 20).toFixed(1) }} </span>
                <rating :number="hotel.rating"></rating>
            </div> -->
          </div>
        </div>
      </div>
    </flux-parallax>

    <!-- ================================================================================ -->

    <div class="hotel-content hotel-and-travel-content main-content">
      <div class="wrapper-loading" v-if="showLoading">
        <div class="loading-view">
          <div class="icon">
            <i class="fas fa-circle-notch fa-spin"></i>
          </div>
          <div class="text">من فضلك انتظر قليلا...</div>
        </div>
      </div>

      <div v-else>
        <div class="carousel-and-features">
          <b-container>
            <b-row>
              <b-col
                class="col-12"
                :class="{'col-xl-9 col-lg-8': (hotel.latitude != null && hotel.longitude != null) || hotel.features.length}"
                v-if="hotel.gallery.length > 1"
              >
                <div class="carousel-flux">
                  <vue-flux
                    v-if="showFluxSlider"
                    :options="fluxOptions"
                    :images="hotel.gallery.map(item => item.value)"
                    :transitions="fluxTransitions"
                    :path="$domain"
                    ref="slider">
                      <flux-controls v-if="showFluxControls" slot="controls"></flux-controls>
                      <custom-pagination v-if="mounted" slot="pagination" :slider="$refs.slider"></custom-pagination>
                  </vue-flux>

                  <div class="custom-controll">
                    <div class="btn-prev waves-effect waves-light" @click="$refs.slider.showImage('previous')">
                      <i class="fas fa-chevron-left"></i>
                    </div>

                    <div class="btn-next waves-effect waves-light" @click="$refs.slider.showImage('next')">
                      <i class="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </b-col>

              <!-- ================================================================================ -->

              <b-col :class="hotel.gallery.length > 1 ? 'col-xl-3 col-lg-4' : 'col-lg-12'">
                <b-row>
                  <b-col
                    class="col-12"
                    :class="{'col-lg-12': hotel.gallery.length > 1, 'col-md-12': hotel.latitude != null && hotel.longitude != null}"
                  >
                    <div class="sharing" :class="{'not-full-width': hotel.gallery.length < 2}">
                      <h3 class="label">مشاركة</h3>
                      <social-sharing
                        class="wrapper-social"
                        :url="$domain + $route.fullPath.substr(1)"
                        :title="'فندق ' + hotel.name"
                        :description="'فندق ' + hotel.name + ' ---------- ' + hotel.info.substr(0, 300) + '...'"
                        :twitter-user="$settings.site_name_ar"
                        inline-template>
                        <div>
                            <network class="network waves-effect" network="facebook">
                              <i class="fab fa-facebook-f"></i>
                            </network>
                            <network class="network waves-effect" network="twitter">
                              <i class="fab fa-twitter"></i>
                            </network>
                            <network class="network waves-effect" network="whatsapp">
                              <i class="fab fa-whatsapp"></i>
                            </network>
                            <network class="network waves-effect" network="email">
                              <i class="fas fa-envelope"></i>
                            </network>
                        </div>
                      </social-sharing>
                    </div>
                  </b-col>

                  <!-- ================================================================================ -->

                  <b-col
                    class="col-12"
                    :class="{'col-lg-12': hotel.gallery.length > 1, 'col-md-6': hotel.latitude != null && hotel.longitude != null}"
                    v-if="hotel.features.length"
                  >
                    <div class="features">
                      <h3 class="label-box">
                        مميزات الفندق
                      </h3>
                      <ul class="list-features">
                        <li v-for="feature in hotel.features" :key="feature.id" v-text="feature.value"></li>
                      </ul>
                    </div>
                  </b-col>

                  <!-- ================================================================================ -->

                  <b-col
                    class="col-12"
                    :class="{'col-lg-12': hotel.gallery.length > 1, 'col-md-6': hotel.features.length}"
                    v-if="hotel.latitude != null && hotel.longitude != null"
                  >
                    <div class="location">
                      <h3 class="label-box">
                        موقع الفندق
                      </h3>
                      <div class="map-company" id="map_company" :data-lat="hotel.latitude" :data-long="hotel.longitude">
                          <div id="location_map_company"></div>
                      </div>
                    </div>
                  </b-col>
                  <!-- ================================================================================ -->
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </div>

        <b-container>
          <div class="informations hotel-info" v-if="hotel.info != '' && hotel.info != null">
              <div class="side-title">
                <h3 class="text">معلومات عن فندق {{ hotel.name }}</h3>
              </div>
              <p class="info-text view-text-editor" v-read-more:toggle="{limit: 500, textBtnRead: 'اقرأ المزيد', textBtnUnread: 'اقرأ أقل'}">
                <!-- <span v-html="hotel.info.replace(/(?:\r\n|\r|\n)/g, '<br>')"></span> -->
                <span v-html="hotel.info"></span>
              </p>
          </div> <!-- informations -->

          <!-- ================================================================================ -->


          <div class="rooms-table" v-if="hotel.rooms.length">
            <div class="side-title">
              <h3 class="text">الغرف المتاحة بالفندق</h3>
            </div>

            <div class="wrapper-table-rooms">
              <b-table responsive bordered :items="hotel.rooms.filter(item => item.display === 1)" :fields="room_fields">

                <!-- <template v-slot:cell(price_night)="data">
                  <div class="text-center">
                    <b class="main-color-dark">{{ data.value }}</b> جنية
                  </div>
                </template>

                <template v-slot:cell(offer_price)="data">
                  <div v-if="data.value == null || data.value == ''">
                    <b class="text-danger">---</b>
                  </div>
                  <div v-else class="offer-price">
                    <b class="price">{{ data.value }} جنية</b>
                    فى
                    <b class="days">{{ handelNightsPeriod(data.item.offer_days) }}</b>
                  </div>
                </template> -->

              </b-table>
            </div>
          </div> <!-- rooms -->

          <!-- ================================================================================ -->


          <div class="boxs-others hotels-others">
            <div class="side-title">
              <h3 class="text">فنادق أخرى فى {{ hotel.address }}</h3>
            </div>

            <div class="boxs">
              <div class="wrapper-loading" v-if="showLoadingOthers">
                <div class="loading-view">
                  <div class="icon">
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </div>
                  <div class="text">من فضلك انتظر قليلا...</div>
                </div>
              </div>

              <div v-else>
                <div v-if="others.length">
                  <b-row>
                    <b-col sm="6" lg="4" v-for="hotel in others" :key="hotel.id">
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
                </div>
                <div v-else>
                  <b-row>
                    <b-col cols="12">
                      <div class="wrapper-empty-travels">
                        <h4 class="message">
                          <span>
                            لا توجد فنادق أخرى فى
                            {{ hotel.address }}
                            فى الوقت الحالى..
                            <router-link class="main-color" :to="{name: 'hotels'}">مزيد من الفنادق</router-link>
                          </span>
                        </h4>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </div> <!-- boxs others -->
          <!-- ================================================================================ -->

        </b-container>

      </div> <!-- else loading -->
    </div> <!-- hotel-and-travel-content -->
  </div>
</template>



<script>

import Rating from '@/components/Rating'
import { VueFlux, FluxPagination, FluxControls, Transitions } from 'vue-flux'
import customPagination from '@/components/custom-flux-pagination'

export default {
  components: {
    Rating,
    VueFlux,
    FluxPagination,
    FluxControls,
    customPagination
  },

  data() {
    return {
      mounted: false,
      showFluxControls: false,
      slider: null,
      showFluxSlider: false,
      fluxOptions: {
         autoplay: true,
         bindKeys: true,
         fullscreen: true,
         autohideTime: 700
      },
      fluxTransitions: {
         transitionExplode: Transitions.transitionExplode,
         transitionRound1: Transitions.transitionRound1,
         transitionWave: Transitions.transitionWave,
         transitionBlocks1: Transitions.transitionBlocks1,
         transitionZip: Transitions.transitionZip,
         transitionWarp: Transitions.transitionWarp,
         transitionWaterfall: Transitions.transitionWaterfall,
         transitionRound2: Transitions.transitionRound2,
      },
      imageHeader: '',
      showLoading: true,
      showLoadingOthers: true,
      hotel: {},
      others: [],
      room_fields: [
        {
          key: 'info',
          label: 'معلومات الغرفة',
          sortable: true
        },
        {
          key: 'options',
          label: 'نوع الإقامة',
          sortable: true
        },
        // {
        //   key: 'price_night',
        //   label: 'سعر الليلة',
        //   sortable: true
        // },
        // {
        //   key: 'offer_price',
        //   label: 'العروض',
        //   sortable: true
        // },
      ]
    }
  },

  methods: {
    async getHotel(id) {
      let hotel = {}
      this.showLoading = true
      await axios.get('/hotel', {params: {id: id}}).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.hotel = data.hotel
          hotel = this.hotel
          this.$nextTick(() => {
            this.handelPropsAfterGetHotel()
          })
        } else {
          setTimeout(() => this.getHotel(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getHotel(), 500)
      })
      return hotel
    },


    getOthers() {
      axios.get('/hotels-others', {params: {id: this.hotel.id, address: this.hotel.address}}).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.others = data.hotels
          this.showLoadingOthers = false
        } else {
          setTimeout(() => this.getOthers(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getOthers(), 500)
      })
    },


    showMap() {
      let scriptMap = document.createElement('script');
      const idMap = 'myScriptMap';
      const oldScript = document.getElementById(idMap)
      if (oldScript) {
        oldScript.parentNode.removeChild(oldScript)
      }
      document.body.appendChild(scriptMap);
      scriptMap.id = idMap;
      scriptMap.setAttribute('async', true);
      scriptMap.setAttribute('defer', true);
      scriptMap.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyADsFcbM6g-A_nUwh41pFn9EgDdlRC6lGY&language=ar&region=EG&callback=initMapCompany');
    },

    handelPropsAfterGetHotel() {
      this.imageHeader = ''
      this.showLoading = false
      this.$route.meta.title = 'فندق ' + this.hotel.name
      if (this.hotel.latitude != null && this.hotel.longitude != null) {
        this.showMap()
      }

      this.$nextTick(() => {
        this.imageHeader = this.hotel.image != null ? this.$domain + this.hotel.image : ''
        this.getOthers()
        if (this.hotel.gallery.length > 1) {
          setTimeout(() => {
            this.showFluxSlider = true
            this.$nextTick(() => {
              this.mounted = true
              this.slider = this.$refs.slider
            })
          }, 500)
        } else {
          this.slider = null
        }
      })
    },

    handelNightsPeriod(nights) {
      nights = parseInt(nights)
      let prefix = ''
      if (nights == 0) {
        prefix = ''
      } else if (nights == 1) {
        prefix = 'ليلة'
      } else if (nights == 2) {
        prefix = 'ليلتين'
      } else if (nights > 2 && nights < 11) {
        prefix = nights + ' ليالى'
      } else {
        prefix = nights + ' ليلة'
      }
      return prefix
    },

  },

  watch: {
    'slider._data': {
      handler(newData) {
        if (this.showFluxSlider) {
          if (this.hotel.gallery.length > 1) {
            if (this.$refs.slider.inFullscreen()) {
              this.showFluxControls = true
            } else {
              this.showFluxControls = false
            }
          }
        }
      },
      deep: true
    },
    "$route.params.id"(id) {
      if (this.$route.params.hotel) {
        this.showLoading = true
        this.hotel = this.$route.params.hotel
        this.$nextTick(() => {
          this.handelPropsAfterGetHotel()
        })
      } else {
        this.getHotel(this.$route.params.id)
      }
    }
  },

  created() {
    if (this.$route.params.hotel) {
      this.hotel = this.$route.params.hotel
      this.$nextTick(() => {
        this.handelPropsAfterGetHotel()
      })
    } else {
      this.getHotel(this.$route.params.id)
    }
  },

}
</script>

