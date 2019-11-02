<template>
  <div class="travel-box">
    <div class="wrapper-travel-box">
      <div class="header">
          <flux-parallax class="travel-box-bg" v-if="travelImage != ''" :src="travelImage" height="150px" offset="200%" type="relative">
            <router-link class="image-link" :to="{name: 'travel', params: {id: travel.id, travel: travel}}">
              <div class="discount" v-if="travel.discount != null && travel.discount != ''">
                خصم
                <span class="number">{{ travel.discount }}</span>
                %
              </div>
            </router-link>
          </flux-parallax>
      </div>
      <div class="content">
        <div class="name" v-text="travel.name"></div>

        <div class="box address">
          <span class="icon">
            <i class="fas fa-map-marker-alt"></i>
          </span>
          <span class="value" v-text="travel.type == 'pilgrimage' || travel.type == 'umrah' ? 'فندق ' + travel.hotel.name : travel.hotel.address"></span>
        </div>

        <div class="box time-period">
          <span class="icon">
            <i class="far fa-clock"></i>
          </span>
          <span class="value">
            {{ handelDaysPeriod(travel.offers[0].time_period) }}
            <div class="separator" v-if="travel.offers[0].time_period > 1">|</div>
            {{ handelNightsPeriod(travel.offers[0].time_period - 1) }}
          </span>
        </div>

        <div class="box rating">
          <span class="icon">
            <span class="number-rate">
              {{ (travel.hotel.rating / 20).toFixed(1) }}
            </span>
          </span>
          <span class="value">
            <rating :number="travel.hotel.rating"></rating>
          </span>
        </div>

      </div>

      <div class="footer">
        <div class="wrapper-price">
          <div class="side">
            السعر
            <br>
            يبدأ من
          </div>
          <div class="side">
            <money v-model="travel.offers[0].single_price" v-bind="{masked: true}"></money>
            <span class="price-number">{{travel.offers[0].single_price}}</span>
            <br>
            جنية
          </div>
        </div>

        <div class="booking">
          <b-button block variant="warning" :to="{name: 'travel', params: {id: travel.id, travel: travel}}">حجز</b-button>
          <div class="wrapper-details-booking">
            <h4 class="title">
              للحجز يرجى التواصل على
            </h4>
            <div class="box" v-if="$settings.mobile_1 != null && $settings.mobile_1 != ''">
              <span class="icon">
                <i class="fas fa-phone"></i>
              </span>
              <span class="value">
                {{ $settings.mobile_1 }}
              </span>
            </div>
            <div class="box" v-if="$settings.mobile_2 != null && $settings.mobile_2 != ''">
              <span class="icon">
                <i class="fas fa-phone"></i>
              </span>
              <span class="value">
                {{ $settings.mobile_2 }}
              </span>
            </div>
            <div class="box" v-if="$settings.email != null && $settings.email != ''">
              <span class="icon">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="value">
                <a :href="'mailto:' + $settings.email" v-text="$settings.email"></a>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>



<script>
import Rating from '@/components/Rating'

export default {
  props: {
    travel: {
      type: Object,
      required: true
    }
  },
  components: {
    Rating
  },

  data () {
    return {
      travelImage: ''
    }
  },

  methods: {
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
  },

  mounted () {
    this.$nextTick(() => {
      this.travelImage = this.travel.image != '' ? this.$domain + this.travel.image : ''
    })
  }
}
</script>

