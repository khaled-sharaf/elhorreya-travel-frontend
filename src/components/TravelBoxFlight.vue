<template>
  <div class="travel-box-flight">
    <div class="wrapper-travel-box">
      <b-row>
        <b-col lg="4">
          <div class="header">
              <flux-parallax class="travel-box-bg" v-if="travelImage != ''" :src="travelImage" height="250px" offset="200%" type="relative">
                <div class="image-link">
                  <div class="discount" v-if="travel.discount != null && travel.discount != ''">
                    خصم
                    <span class="number">{{ travel.discount }}</span>
                    %
                  </div>
                </div>
              </flux-parallax>
          </div>
        </b-col>
        <b-col lg="8">
          <div class="content">

            <div class="title">
              <h3 class="text">
                {{ travel.name }}
              </h3>
            </div>

            <div class="address">
              <span class="icon">
                <i class="fas fa-map-marker-alt"></i>
              </span>
              <span class="value">
                {{ travel.address_from + ' - ' + travel.address_to }}
              </span>
            </div>

            <div class="desc view-text-editor">
              <div class="text" v-read-more:toggle="{limit: 200, textBtnRead: 'اقرأ المزيد...', textBtnUnread: 'اقرأ أقل'}" v-html="travel.info"></div>
            </div>


            <div class="booking">
              <b-button variant="warning" @click="showModalBookingLocale(travel)">احجز الآن</b-button>
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
            </div> <!-- booking -->

          </div> <!-- content -->


        </b-col>
      </b-row>

    </div> <!-- wrapper-travel-box -->
  </div>
</template>



<script>

export default {
  props: {
    travel: {
      type: Object,
      required: true
    },
    showModalBooking: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      travelImage: ''
    }
  },

  methods: {
    showModalBookingLocale(travel) {
      this.showModalBooking(travel)
    },
  },

  mounted () {
    this.$nextTick(() => {
      this.travelImage = this.travel.image != '' ? this.$domain + this.travel.image : ''
    })
  }
}
</script>

