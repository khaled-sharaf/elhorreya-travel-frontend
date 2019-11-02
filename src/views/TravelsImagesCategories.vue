<template>
  <div id="travels_images">
    <flux-parallax class="parallax-header travels-images-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">صور عروض الرحلات والسياحة</span>
          </h1>
        </div>
      </div>
    </flux-parallax>

    <div class="travels-images-content main-content">
      <b-container>

        <div class="travel-program" v-for="travelProgram in $menuList" :key="travelProgram.id">

          <div class="side-title">
            <h3 class="text" v-text="travelProgram.name"></h3>
          </div>

          <div class="travels-images main-content-boxs">
            <b-row>
              <b-col lg="6" v-for="category in travelProgram.categories" :key="category.id">
                  <category-box :category="category" propertyType="fixed" :redirect="{name: 'images-category', params: {id: category.id}}"></category-box>
              </b-col>
            </b-row>
          </div>

        </div>

      </b-container>
    </div>
  </div>
</template>

<script>
import CategoryBox from '@/components/CategoryBox'
export default {
  components: {
    CategoryBox
  },

  data() {
    return {
      imageHeader: ''
    }
  },

  mounted() {
    this.imageHeader = ''
    setTimeout(() => {
      this.imageHeader = this.$settings.images_page_bg != null ? this.$domain + this.$settings.images_page_bg : ''
    })
  }
}
</script>

