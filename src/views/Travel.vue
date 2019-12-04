<template>
  <div id="travel">
    <flux-parallax class="parallax-header hotel-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">{{ travel.name }}</span>
          </h1>

          <div class="desc" v-if="travel.type !==  'pilgrimage' && travel.type !== 'umrah'">
            <h3 class="text">
              <span class="icon">
                <i class="fas fa-map-marker-alt"></i>
              </span>
              {{ travel.hotel.address }}
            </h3>
          </div>
        </div>


        <div class="header-left" v-if="travel.discount != null">
          <div class="discount-travel">
              خصم
              <span class="number"> {{ travel.discount }} جنية</span>
          </div>
        </div>

      </div>
    </flux-parallax>

    <!-- ================================================================================ -->

    <div class="travel-content hotel-and-travel-content main-content">
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
                class="col-12 col-xl-9 col-lg-8"
                v-if="gallery.length > 1"
              >
                <div class="carousel-flux">
                  <vue-flux
                    v-if="showFluxSlider"
                    :options="fluxOptions"
                    :images="gallery.map(item => item.value)"
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

              <b-col :class="gallery.length > 1 ? 'col-xl-3 col-lg-4' : 'col-lg-12'">
                <b-row>
                  <b-col
                    class="col-12"
                    :class="{'col-lg-12': gallery.length > 1}"
                  >
                    <div class="sharing" :class="{'not-full-width': gallery.length < 2}">
                      <h3 class="label">مشاركة</h3>
                      <social-sharing
                        class="wrapper-social"
                        :url="$domain + $route.fullPath.substr(1)"
                        :title="travel.name"
                        :description="travel.name + ' ---------- ' + travel.hotel.info.substr(0, 300) + '...'"
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
                    :class="{'col-lg-12': gallery.length > 1}"
                  >
                    <div class="features contact-us">
                      <h3 class="label-box">
                        للإستفسار اتصل على
                      </h3>
                      <div class="info-contact">
                        <div class="row-contact">
                          <div class="side" v-if="$settings.mobile_1 != null">
                            <span class="icon">
                              <i class="fas fa-phone"></i>
                            </span>
                            <span class="text" v-text="$settings.mobile_1"></span>
                          </div> <!-- ./side -->

                          <div class="side" v-if="$settings.mobile_2 != null">
                            <span class="icon">
                              <i class="fas fa-phone"></i>
                            </span>
                            <span class="text" v-text="$settings.mobile_2"></span>
                          </div> <!-- ./side -->
                        </div> <!-- ./row-contact -->
                      </div>

                      <div class="booking-travel-now text-center mt-5">
                        <b-button variant="warning" @click="showPrices()">احجز الأن</b-button>
                      </div>
                    </div>
                  </b-col>
                  <!-- ================================================================================ -->

                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </div>

        <!-- ================================================================================ -->

        <b-container>


          <div class="travel-tabs">
            <ul class="tabs">
              <li
                class="tab"
                @click="showTab = 'desc'"
                :class="{active: showTab == 'desc'}"
              >
                تفاصيل الرحلة
                <span class="icon">
                  <i class="far fa-list-alt"></i>
                </span>
              </li>
              <li
                class="tab"
                @click="showTab = 'hotels'"
                :class="{active: showTab == 'hotels'}"
              >
                فنادق الرحلة
                <span class="icon">
                  <i class="fas fa-building"></i>
                </span>
              </li>
              <li
                class="tab"
                @click="showTab = 'price'"
                :class="{active: showTab == 'price'}"
              >
                أسعار الرحلة
                <span class="icon">
                  <i class="fas fa-money-bill-alt"></i>
                </span>
              </li>
            </ul>
          </div>

          <!-- ================================================================================ -->
          <vue-slide :active="showTab == 'desc'" :duration="600" :use-hidden="false">
            <div class="informations travel-info" v-if="travel.info !== null && travel.info !== ''">
                <div class="side-title">
                  <h3 class="text"> تفاصيل الرحلة</h3>
                </div>
                <div
                  class="info-text view-text-editor"
                  v-read-more:toggle="{limit: 500, textBtnRead: 'اقرأ المزيد', textBtnUnread: 'اقرأ أقل'}">
                    <span v-html="travel.info"></span>
                </div>
            </div> <!-- informations -->

          </vue-slide>
          <!-- ================================================================================ -->


          <!-- ================================================================================ -->
          <vue-slide :active="showTab == 'price'" :duration="600" :use-hidden="false">
            <div class="offers-tables">
              <div class="side-title">
                <h3 class="text">أسعار الرحلة</h3>
              </div>

              <div class="wrapper-tabel-offers">
                <div class="offer-box" v-for="(offer, idx) in travel.offers.filter(t => t.display === 1)" :key="offer.id">
                  <div class="offer-title">
                    <h4 class="text">
                      {{ offer.name_offer }}
                    </h4>
                  </div>

                  <div class="t-row" :class="{'custom-travel': travel.type !== 'umrah' && travel.type !== 'pilgrimage'}">
                    <div class="t-col">
                      <div class="label">
                        <span class="icon">
                          <i class="far fa-calendar-alt"></i>
                        </span>
                        من
                      </div>
                      <div class="value" v-text="formatDate(offer.date_from)"></div>
                    </div>
                    <!-- ====================================== -->

                    <div class="t-col">
                      <div class="label">
                        <span class="icon">
                          <i class="far fa-calendar-alt"></i>
                        </span>
                        إلى
                      </div>
                      <div class="value" v-text="formatDate(offer.date_to)"></div>
                    </div>
                    <!-- ====================================== -->

                    <div class="t-col">
                      <div class="label">
                        <span class="icon">
                          <i class="far fa-clock"></i>
                        </span>
                        الفترة
                      </div>
                      <div class="value">
                        <div class="time-period">
                          {{ handelDaysPeriod(offer.time_period) }}
                          <div class="separator" v-if="offer.time_period > 1">|</div>
                          {{ handelNightsPeriod(offer.time_period - 1) }}
                        </div>
                      </div>
                    </div>
                    <!-- ====================================== -->

                    <div class="t-col hotel-days" v-if="travel.type === 'umrah' || travel.type === 'pilgrimage'">
                      <div class="label">
                        <span class="icon">
                          <i class="far fa-clock"></i>
                        </span>
                        فندق مكة
                      </div>
                      <div class="value">
                        <div class="hotel-days-view">
                          <div class="hotel-name">
                            <router-link :to="{name: 'hotel', params: {hotel: travel.hotel, id: travel.hotel_id}}" v-text="travel.hotel.name"></router-link>
                          </div>
                          <div class="days">
                            {{ handelDaysPeriod(offer.hotel_days) }}
                          </div>
                          <div class="stay-type" v-text="offer.stay_type"></div>
                        </div>
                      </div>
                    </div>
                    <!-- ====================================== -->

                    <div class="t-col hotel-days" v-if="travel.type === 'umrah' || travel.type === 'pilgrimage'">
                      <div class="label">
                        <span class="icon">
                          <i class="far fa-clock"></i>
                        </span>
                        فندق المدينة
                      </div>
                      <div class="value">
                        <div class="hotel-days-view">
                          <div class="hotel-name">
                            <router-link :to="{name: 'hotel', params: {hotel: travel.hotel_2, id: travel.hotel_2_id}}" v-text="travel.hotel_2.name"></router-link>
                          </div>
                          <div class="days">
                            {{ handelDaysPeriod(offer.hotel_2_days) }}
                          </div>
                          <div class="stay-type" v-text="offer.stay_type_2"></div>
                        </div>
                      </div>
                    </div>
                    <!-- ====================================== -->

                    <div class="t-col" v-if="travel.type !== 'umrah' && travel.type !== 'pilgrimage'">
                      <div class="label">
                        <span class="icon">
                          <i class="fas fa-utensils"></i>
                        </span>
                        نوع الإقامة
                      </div>
                      <div class="value" v-text="offer.stay_type"></div>
                    </div>
                    <!-- ====================================== -->

                    <div class="t-col c-itinerary" v-if="travel.type === 'umrah' || travel.type === 'pilgrimage'">
                      <div class="label">
                        <span class="icon">
                          <i class="fas fa-bus-alt"></i>
                        </span>
                        خط السير
                      </div>
                      <div class="value">
                        <div class="itinerary">
                          <span v-text="travel.itinerary_1"></span> -
                          <span v-text="travel.itinerary_2"></span> -
                          <span v-text="travel.itinerary_3"></span>
                          {{ travel.itinerary_4 !== null ? ' - ' : '' }}
                          <span v-text="travel.itinerary_4 !== null ? travel.itinerary_4 : ''"></span>
                          {{ travel.itinerary_5 !== null ? ' - ' : '' }}
                          <span v-text="travel.itinerary_5 !== null ? travel.itinerary_5 : ''"></span>
                        </div>
                      </div>
                    </div>
                    <!-- ====================================== -->

                    <div class="t-col c-price">
                      <div class="label">
                        <span class="icon">
                          <i class="fas fa-money-bill-alt"></i>
                        </span>
                        السعر
                      </div>
                      <div class="value">
                        <div class="price">

                          <div class="price-1" v-if="travel.travel_category != null && travel.travel_category.name === 'شهر العسل'">
                            <money v-model="offer.single_price" v-bind="{masked: true}"></money>
                            <div class="price-label">
                              <!-- ثنائى -->
                            </div>
                            <span class="price-value">{{ offer.single_price }}</span> جنية
                          </div>

                          <div v-else class="prices">
                            <div class="price-1">
                              <money v-model="offer.single_price" v-bind="{masked: true}"></money>
                              <div class="price-label">
                                {{ travel.type === 'umrah' || travel.type === 'pilgrimage' ? 'ثنائى' : 'فردى' }}
                              </div>
                              <div class="price-value">{{ offer.single_price }}</div>
                            </div>
                            <div class="price-2" v-if="offer.twin_price != null">
                              <money v-model="offer.twin_price" v-bind="{masked: true}"></money>
                              <div class="price-label">
                                {{ travel.type === 'umrah' || travel.type === 'pilgrimage' ? 'ثلاثى' : 'ثنائى' }}
                              </div>
                              <div class="price-value">{{ offer.twin_price }}</div>
                            </div>
                            <div class="price-3" v-if="offer.triple_price != null">
                              <money v-model="offer.triple_price" v-bind="{masked: true}"></money>
                              <div class="price-label">
                                {{ travel.type === 'umrah' || travel.type === 'pilgrimage' ? 'رباعى' : 'ثلاثى' }}
                              </div>
                              <div class="price-value">{{ offer.triple_price }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- ====================================== -->

                    <div class="t-col">
                      <div class="label">
                        <span class="icon">
                          <i class="fas fa-cart-plus"></i>
                        </span>
                        الحجز
                      </div>
                      <div class="value">
                        <b-button size="sm" variant="warning" @click="showModalBooking(offer, idx)">احجز الآن</b-button>
                      </div>
                    </div>
                    <!-- ====================================== -->

                  </div> <!-- t-row -->

                  <div class="desc-offer">
                    <span class="bold" v-text="offer.info_offer"></span>
                  </div>

                  <div class="desc-offer" v-if="offer.transport === 1">
                    <span class="bold">العرض يشمل الانتقالات</span>
                  </div>

                  <div class="desc-offer" v-if="(travel.type === 'umrah' || travel.type === 'pilgrimage') && offer.child_price != null">
                    <span class="title">سعر الطفل:</span>
                    <b>{{ offer.child_price }}</b>
                    جنية
                  </div>

                  <div class="desc-offer" v-if="(travel.type === 'umrah' || travel.type === 'pilgrimage') && offer.baby_price != null">
                    <span class="title">سعر الرضيع:</span>
                    <b>{{ offer.baby_price }}</b>
                    جنية
                  </div>

                </div> <!-- offer-box -->
              </div> <!-- wrapper-tabel-offers -->
            </div> <!-- offers-tables -->
          </vue-slide>
          <!-- ================================================================================ -->



          <!-- ================================================================================ -->
          <vue-slide :active="showTab == 'hotels'" :duration="600" :use-hidden="false">

            <div class="hotels-tab">
              <div class="hotel-box">
                <b-row>
                  <b-col lg="7" xl="8" class="hotel-col-content">
                    <div class="content">
                      <div class="title">
                          <h3 class="text">
                            <router-link :to="{name: 'hotel', params: {hotel: travel.hotel, id: travel.hotel_id}}" v-text="travel.hotel.name"></router-link>
                          </h3>
                      </div>
                      <!-- =========================== -->
                      <div class="address">
                        <span class="icon">
                          <i class="fas fa-map-marker-alt"></i>
                        </span>
                        <span class="text" v-text="travel.hotel.address"></span>
                      </div>
                      <!-- =========================== -->

                      <div class="info-text view-text-editor" v-read-more:toggle="{limit: 200, after: handelBtnReadMore(travel.hotel, 'hotel')}">
                        <span v-html="travel.hotel.info"></span>
                      </div>

                      <b-button
                        variant="outline-secondary"
                        size="sm"
                        @click="showModalMap(travel.hotel)"
                        v-if="travel.hotel.latitude != null && travel.hotel.longitude != null"
                        >
                          اعرض الخريطة
                        </b-button>

                    </div>
                  </b-col>

                  <b-col lg="5" xl="4" class="hotel-col-image">
                    <router-link :to="{name: 'hotel', params: {hotel: travel.hotel, id: travel.hotel_id}}">
                      <div class="image" :style="{'background-image': `url('${$domain + travel.hotel.image}')`}"></div>
                    </router-link>
                  </b-col>

                </b-row>
              </div> <!-- hotel box -->

              <!-- ======================================================================= -->

              <div class="hotel-box" v-if="travel.hotel_2 !== null">
                <b-row>
                  <b-col lg="7" xl="8" class="hotel-col-content">
                    <div class="content">
                      <div class="title">
                        <h3 class="text">
                          <router-link :to="{name: 'hotel', params: {hotel: travel.hotel_2, id: travel.hotel_2_id}}" v-text="travel.hotel_2.name"></router-link>
                        </h3>
                      </div>
                      <!-- =========================== -->
                      <div class="address">
                        <span class="icon">
                          <i class="fas fa-map-marker-alt"></i>
                        </span>
                        <span class="text" v-text="travel.hotel_2.address"></span>
                      </div>
                      <!-- =========================== -->

                      <div class="info-text view-text-editor" v-read-more:toggle="{limit: 200, after: handelBtnReadMore(travel.hotel_2, 'hotel')}">
                        <span v-html="travel.hotel_2.info"></span>
                      </div>

                      <b-button
                        variant="outline-secondary"
                        size="sm"
                        @click="showModalMap(travel.hotel_2)"
                        v-if="travel.hotel_2.latitude != null && travel.hotel_2.longitude != null"
                        >
                          اعرض الخريطة
                        </b-button>

                    </div>
                  </b-col>

                  <b-col lg="5" xl="4" class="hotel-col-image">
                    <router-link :to="{name: 'hotel', params: {hotel: travel.hotel_2, id: travel.hotel_2_id}}">
                      <div class="image" :style="{'background-image': `url('${$domain + travel.hotel_2.image}')`}"></div>
                    </router-link>
                  </b-col>

                </b-row>
              </div> <!-- hotel_2 box -->
              <!-- ======================================================================= -->

            </div>
          </vue-slide>
          <!-- ================================================================================ -->



          <!-- ================================================================================ -->
          <b-modal id="modal-map" size="lg" centered :title="modalMapHotelData.title" hide-footer>
            <div class="hotel-map-in-travel-page">
              <div class="map-company" id="map_company" :data-lat="modalMapHotelData.hotel.latitude" :data-long="modalMapHotelData.hotel.longitude">
                  <div class="location_map_company"></div>
              </div>
            </div>
          </b-modal>
          <!-- ================================================================================ -->




          <!-- Form Modal Booking -->
          <b-modal id="modal-booking" size="lg" centered :title="modalBookingData.title">
            <form @submit.prevent="booking()">

              <b-row>
                <b-col md="6">
                  <div class="form-group required">
                    <input
                      v-model="formBooking.name"
                      class="form-control"
                      :class="{ 'is-invalid': formBooking.errors.has('name') }"
                      placeholder="الاسم"
                    >
                    <has-error :form="formBooking" field="name"></has-error>
                  </div>
                </b-col>

                <b-col md="6">
                  <div class="form-group required">
                    <input
                      v-model="formBooking.phone"
                      class="form-control"
                      :class="{ 'is-invalid': formBooking.errors.has('phone') }"
                      placeholder="رقم الهاتف"
                    >
                    <has-error :form="formBooking" field="phone"></has-error>
                  </div>
                </b-col>

                <b-col md="4">
                  <div class="form-group">
                    <input
                      v-model="formBooking.email"
                      class="form-control"
                      :class="{ 'is-invalid': formBooking.errors.has('email') }"
                      placeholder="البريد الإليكترونى"
                    >
                    <has-error :form="formBooking" field="email"></has-error>
                  </div>
                </b-col>

                <b-col md="4">
                  <div class="form-group">
                    <input
                      type="number"
                      v-model="formBooking.adults"
                      class="form-control"
                      :class="{ 'is-invalid': formBooking.errors.has('adults') }"
                      placeholder="عدد البالغين"
                      min="0"
                      max="100"
                    >
                    <has-error :form="formBooking" field="adults"></has-error>
                  </div>
                </b-col>

                <b-col md="4">
                  <div class="form-group">
                    <input
                      type="number"
                      v-model="formBooking.children"
                      class="form-control"
                      :class="{ 'is-invalid': formBooking.errors.has('children') }"
                      placeholder="عدد الأطفال"
                      min="0"
                      max="100"
                    >
                    <has-error :form="formBooking" field="children"></has-error>
                  </div>
                </b-col>


                <b-col cols="12">
                  <div class="form-group">
                    <textarea
                      v-model="formBooking.message"
                      class="form-control auto-resize"
                      :data-height="140"
                      :class="{ 'is-invalid': formBooking.errors.has('message') }"
                      placeholder="تفاصيل الحجز"
                    ></textarea>
                    <has-error :form="formBooking" field="message"></has-error>
                  </div>
                </b-col>
              </b-row>

            </form>

            <template v-slot:modal-footer>
              <div class="w-100">
                <b-button block variant="warning" @click="booking()">
                  <span v-if="!formBooking.busy">
                    حجز
                  </span>
                  <i v-else class="fas fa-circle-notch fa-spin icon-loading"></i>
                </b-button>
              </div>
            </template>

          </b-modal>

          <!-- ================================================================================ -->


          <div class="boxs-others travels-others">
            <div class="side-title">
              <h3 class="text">رحلات وعروض أخرى مشابهة</h3>
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
                    <b-col sm="6" lg="4" v-for="travel in others" :key="travel.id">
                      <div class="hotel box-flat">
                        <router-link
                          class="wrapper-link"
                          :to="{name: 'travel', params: {id: travel.id, travel: travel}}"
                          :style="{'background-image': `url('${$domain + travel.image}')`}"
                        >
                          <div class="content">
                            <h4 class="name" v-text="travel.name"></h4>
                            <div class="address" v-text="travel.hotel.address"></div>
                            <div class="time-period">
                              <span class="icon">
                                <i class="far fa-clock"></i>
                              </span>
                              <span class="value">
                                {{ handelDaysPeriod(travel.offers[0].time_period) }}
                                <div class="separator" v-if="travel.offers[0].time_period > 1">|</div>
                                {{ handelNightsPeriod(travel.offers[0].time_period - 1) }}
                              </span>
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
                            لا يوجد رحلات مشابهة لهذه الرحلة حاليا
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
    </div>

  </div>
</template>

<script>

// import Rating from '@/components/Rating'
import { VueFlux, FluxPagination, FluxControls, Transitions } from 'vue-flux'
import customPagination from '@/components/custom-flux-pagination'

export default {
  components: {
    // Rating,
    VueFlux,
    FluxPagination,
    FluxControls,
    customPagination
  },

  data() {
    return {
      showTab: 'desc', // desc, price, hotels
      mounted: false,
      showFluxControls: false,
      showFluxSlider: false,
      slider: null,
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
      travel: {},
      gallery: [],
      others: [],
      counterText: [
        'الأول',
        'الثانى',
        'الثالث',
        'الرابع',
        'الخامس',
        'السادس',
        'السابع',
        'الثامن',
        'التاسع',
        'العاشر',
        'الحادى عشر',
        'الثانى عشر',
        'الثالث عشر',
        'الرابع عشر',
        'الخامس عشر',
      ],
      modalBookingData: {
        title: ''
      },
      formBooking: new Form({
        name: '',
        email: '',
        phone: '',
        message: '',
        adults: '',
        children: '',
        travel_detail_id: '',
        offer_number: ''
      }),

      modalMapHotelData: {
        title: '',
        hotel: {}
      }
    }
  },

  methods: {
    async getTravel(id) {
      let travel = {}
      this.showLoading = true
      await axios.get('/travel', {params: {id: id}}).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.travel = data.travel
          travel = this.travel
          this.$nextTick(() => {
            this.handelPropsAfterGetTravel()
          })
        } else {
          setTimeout(() => this.getTravel(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getTravel(), 500)
      })
      return travel
    },

    getOthers() {
      axios.get('/travels-others', {
        params: {
          id: this.travel.id,
          name: this.travel.name,
          type: this.travel.type,
          hotel_address: this.travel.hotel.address,
        }
      }).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.others = data.travels
          this.showLoadingOthers = false
        } else {
          setTimeout(() => this.getOthers(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getOthers(), 500)
      })
    },

    showModalBooking(offer, idx) {
      this.modalBookingData.title = 'حجز العرض ' + this.counterText[idx]
      this.formBooking.travel_detail_id = offer.id
      this.formBooking.offer_number = this.counterText[idx]
      this.formBooking.errors.clear()
      this.$bvModal.show('modal-booking')
      this.$nextTick(() => {
        this.autoResizeTextArea()
      })
    },

    booking() {
      this.formBooking.post('/booking').then(response => {
        const data = response.data
        if (response.status === 200) {
          if (typeof data === 'object') {
            if (data.status) {
              this.formBooking.reset()
              this.$bvModal.hide('modal-booking')
              Swal.fire({
                type: 'success',
                text: data.message,
                title: 'تم الحجز بنجاح',
                showConfirmButton: false,
                timer: 5000
              })
            }
          }
        }
      }).catch(error => {
        if (error.response.status !== 422) {
          Swal.fire({
            type: 'error',
            text: 'ربما يكون حدث خطأ غير معروف من جهة السيرفر، من فضلك حاول الحجز مرة أخرى',
            showConfirmButton: false
          })
        }
      })
    },

    showModalMap(hotel)  {
      this.modalMapHotelData.title = 'خريطة فندق ' + hotel.name
      this.modalMapHotelData.hotel = hotel
      this.$bvModal.show('modal-map')
      this.$nextTick(() => {
        this.showMap()
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

    handelPropsAfterGetTravel() {
      this.imageHeader = ''
      this.$route.meta.title =  this.travel.name
      this.showLoading = false
      // merge hotel image in travel image
      const hotelGallery = []
      if (typeof this.travel.hotel.gallery === 'string' && this.travel.hotel.gallery != '') {
        this.travel.hotel.gallery.split(',').forEach((image, i) => {
          hotelGallery.push({value: image})
        })
      }

      const hotelFeatures = []
      if (typeof this.travel.hotel.features === 'string' && this.travel.hotel.features != '') {
        this.travel.hotel.features.split(',').forEach((feature, i) => {
          if (feature != '') {
            hotelFeatures.push({id: i, value: feature})
          }
        })
      }
      this.travel.hotel.features = hotelFeatures
      this.travel.hotel.gallery = hotelGallery

      this.gallery = hotelGallery.concat(this.travel.gallery)

      if (this.travel.hotel_2 != null) {
        const hotel2Gallery = []
        if (typeof this.travel.hotel_2.gallery === 'string' && this.travel.hotel_2.gallery != '') {
          this.travel.hotel_2.gallery.split(',').forEach((image, i) => {
            hotel2Gallery.push({value: image})
          })
        }

        const hotel2Features = []
        if (typeof this.travel.hotel_2.features === 'string' && this.travel.hotel_2.features != '') {
          this.travel.hotel_2.features.split(',').forEach((feature, i) => {
            if (feature != '') {
              hotel2Features.push({id: i, value: feature})
            }
          })
        }

        this.travel.hotel_2.features = hotel2Features
        this.travel.hotel_2.gallery = hotel2Gallery

        this.gallery = this.gallery.concat(hotel2Gallery)
      }



      this.$nextTick(() => {
        this.imageHeader = this.travel.image != null ? this.$domain + this.travel.image : ''
        this.getOthers()
        if (this.gallery.length > 1) {
          setTimeout(() => {
            this.showFluxSlider = true
            this.$nextTick(() => {
              this.mounted = true
              this.slider = this.$refs.slider
            })
          }, 1000)
        }
      })
    },

    handelDaysPeriod(days) {
      days = parseInt(days)
      let prefix = ''
      if (days == 0) {
        prefix = ''
      } else if (days == 1) {
        prefix = 'يوم واحد فقط'
      } else if (days == 2) {
        prefix = 'يومين'
      } else if (days > 2 && days < 11) {
        prefix = days + ' أيام'
      } else {
        prefix = days + ' يوم'
      }
      return prefix
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

    formatDate(date) {
      date = new Date(date)
      const monthNames = this.$store.state.months
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    },

    autoResizeTextArea() {
      $('textarea.auto-resize').each(function () {
        var padding = window.parseFloat($(this).css('padding-top')) + window.parseFloat($(this).css('padding-bottom')),
          border  = window.parseFloat($(this).css('border-top-width')) + window.parseFloat($(this).css('border-bottom-width')),
          height  = window.parseFloat($(this).attr('data-height'));
        $(this).height(height);
        $(this).keyup(function () {
          var padding = window.parseFloat($(this).css('padding-top')) + window.parseFloat($(this).css('padding-bottom')),
            border  = window.parseFloat($(this).css('border-top-width')) + window.parseFloat($(this).css('border-bottom-width')),
            height  = window.parseFloat($(this).attr('data-height'));
          $(this).height(height);
          $(this).height($(this)[0].scrollHeight + border - padding);
        });
      });
    },

    showPrices() {
      $('html, body').animate({
        scrollTop: $('.travel-tabs').offset().top - 20
      })
      this.showTab = 'price'
    },


    handelBtnReadMore(model, modelName) {
      const route = this.$router.resolve({name: modelName, params: {id: model.id}})
      return `
        <a class='btn btn-link btn-outer-link btn-router-link'
        href="${route.href}"
        data-name='${modelName}'
        data-params='{"${modelName}": ${JSON.stringify(model)}, "id": ${model.id}}'
        >للمزيد</a>
      `
    }

  },

  watch: {
    'slider._data': {
      handler(newData) {
        if (this.showFluxSlider) {
          if (this.gallery.length > 1) {
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
      if (this.$route.params.travel) {
        this.travel = this.$route.params.travel
        this.showLoading = true
        this.showFluxSlider = false
        this.mounted = false
        this.$nextTick(() => {
          this.handelPropsAfterGetTravel()
        })
      } else {
        this.getTravel(this.$route.params.id)
      }
    }
  },

  created() {
    if (this.$route.params.travel) {
      this.travel = this.$route.params.travel
      this.showLoading = true
      this.showFluxSlider = false
      this.mounted = false
      this.$nextTick(() => {
        this.handelPropsAfterGetTravel()
      })
    } else {
      this.getTravel(this.$route.params.id)
    }
  }

}
</script>

