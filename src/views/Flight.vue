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



    <div class="travels-images-content main-content">
      <b-container>
      <div class="travel-program">
        <div class="travels-images main-content-boxs">
          <div class="flight-page">
              <b-row>
                <b-col lg="6">
                    <category-box :category="flightCategory" propertyType="relative" :redirect="{name: 'flight-visa', params: {id: flightCategory.id}}"></category-box>
                </b-col>
                <b-col lg="6">
                    <category-box :category="visaCategory" propertyType="relative" :redirect="{name: 'flight-visa', params: {id: visaCategory.id}}"></category-box>
                </b-col>
              </b-row>
          </div>
        </div>
      </div>
      </b-container>
    </div>

  </div>
</template>

<script>
import CategoryBox from '@/components/CategoryBox'
export default {
  name: 'flight-offers',
  components: {
    CategoryBox
  },

  data () {
    return {
      imageHeader: '',

      category: {
        name: "عروض الطيران والتأشيرات",
        discount: "15",
        type: 4
      },

      flightCategory: {
        id: 'flight',
        name: 'عروض الطيران',
        image: this.$settings.flight_page_bg
      },
      visaCategory: {
        id: 'visas',
        name: 'عروض التأشيرات',
        image: this.$settings.visas_page_bg
      },
    }
  },

  methods: {


  },
  created () {
    this.$nextTick(() => {
      this.imageHeader = ''
      setTimeout(() => {
        this.imageHeader = this.$settings.flight_visas_page_bg != null ? this.$domain + this.$settings.flight_visas_page_bg : ''
      })
    })
  }
}
</script>
