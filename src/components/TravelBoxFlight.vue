<template>
  <div class="travel-box-flight">
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

      <div class="footer">
        <div class="content">

          <div class="address">
            {{ travel.address_from + ' - ' + travel.hotel.address }}
          </div>

          <div class="time-period">
            {{ handelDaysPeriod(travel.offers[0].time_period) }}
            <!-- <div class="separator" v-if="travel.offers[0].time_period > 1">|</div>
            {{ handelNightsPeriod(travel.offers[0].time_period - 1) }} -->
          </div>

          <div class="wrapper-price">
            <money v-model="travel.offers[0].single_price" v-bind="{masked: true}"></money>
            <span class="price-number">{{travel.offers[0].single_price}}</span>
            جنية
          </div>

        </div>

        <div class="booking">
          <b-button variant="warning" size="sm" :to="{name: 'travel', params: {id: travel.id, travel: travel}}">حجز</b-button>
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

export default {
  props: {
    travel: {
      type: Object,
      required: true
    }
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

