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


        <!--pilgrimage and umrah  -->
        <div class="travel-program">
          <div class="side-title">
            <h3 class="text">  صور رحلات الحج والعمرة </h3>
          </div>
          <div class="travels-images main-content-boxs">
            <b-row>
              <b-col lg="6" v-for="category in categories.filter(cat => cat.type === 1 || cat.type === 2)" :key="category.id">
                  <category-box :category="category" propertyType="fixed" :redirect="{name: 'images-category', params: {id: category.id}}"></category-box>
              </b-col>
            </b-row>
          </div>
        </div>


        <!--testimonials  -->
        <div class="travel-program">
          <div class="side-title">
            <h3 class="text"> أراء العملاء </h3>
          </div>
          <div class="travels-images main-content-boxs">
            <b-row>
              <b-col lg="6">
                  <category-box :category="categoryTestimonials" propertyType="relative" :redirect="{name: 'images-category', params: {id: categoryTestimonials.id}}"></category-box>
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
      imageHeader: '',
      categories: [],
      categoryTestimonials: {
        id: 'testimonials',
        name: 'أراء العملاء',
        image: require('@/assets/images/testimonials-bg.jpg')
      }
    }
  },


  mounted() {
    this.imageHeader = ''
    setTimeout(() => {
      this.imageHeader = this.$settings.images_page_bg != null ? this.$domain + this.$settings.images_page_bg : ''
    })

    this.$menuList.forEach(program => {
      program.categories.forEach(category => {
        this.categories.push(category)
      })
    })
  }
}
</script>

