<template>
  <div id="images_category">
    <flux-parallax class="parallax-header images-category-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline" v-text="$route.params.id === 'testimonials' ? 'أراء العملاء' : 'صور ' + category.name "></span>
          </h1>
        </div>
      </div>
    </flux-parallax>

    <div class="images-category-content main-content">

      <div class="wrapper-travels-boxs">
        <b-container>
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
                <b-row v-if="Object.keys(images).length && images.data.length">
                  <b-col sm="6" v-for="(image, idx) in images.data" :key="image.id">
                    <div class="image-box box-flat">
                      <div
                        class="wrapper-link"
                        :style="{'background-image': `url('${$domain + image.name}')`}"
                        @click="showImage(idx)"
                      >
                      </div>
                    </div>
                  </b-col>
                </b-row>

                <b-row v-else>
                  <b-col cols="12">
                    <div class="wrapper-empty-travels">
                      <h4 class="message">
                        <span>
                          هذا القسم لا يحتوى على صور فى الوقت الحالى
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
                v-show="Object.keys(images).length && images.data.length"
                v-model="images.current_page"
                :page-count="Math.ceil(images.total / images.per_page)"
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
          <!-- ========================================================================= -->
        </b-container>
      </div>


      <div class="overlay-show-images" v-if="showCarousel" @click.self="showCarousel = false">
        <div class="images-container">
          <carousel
            class="my-carousel-images"
            :nav="true"
            :items="1"
            :dots="false"
            :loop="true"
            :smartSpeed="500"
            :startPosition="currentImageShow"
            :navText="[`<span class='waves-effect'><i class='fas fa-chevron-left'></i></span>`, `<span class='waves-effect'><i class='fas fa-chevron-right'></i></span>`]"
          >
            <div
              class="image-item-carousel"
              v-for="image in images.data" :key="image.id"
            >
              <div class="image">
                <img :src="$domain + image.name" :alt="$route.params.id === 'testimonials' ? 'الحرية للسياحة - صور أراء العملاء' : 'الحرية للسياحة صور قسم - ' +  image.category.name">
              </div>
            </div>
          </carousel>
        </div>
      </div>

    </div>
  </div>
</template>



<script>
import carousel from 'vue-owl-carousel2'

export default {
  components: {
    carousel
  },
  data() {
    return {
      category: {},
      imageHeader: '',
      images: {},
      showLoading: true,
      urlGetImages: '/images-by-category',
      currentImageShow: 1,
      showCarousel: false
    }
  },

  methods: {
    getCategory (id) {
      const categories = []
      this.$menuList.forEach(program => {
        program.categories.forEach(category => {
          categories.push(category)
        })
      })
      this.category = categories.find(item => {
        return item.id == id
      })

      this.imageHeader = ''
      if ((typeof this.category === 'object' && Object.keys(this.category).length)) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.imageHeader = this.category.image != null ? this.$domain + this.category.image : ''
          })
          this.$route.meta.title = 'صور ' + this.category.name
          this.getImages()
        })
      } else if (id === 'testimonials') {
        this.$nextTick(() => {
          setTimeout(() => {
            this.imageHeader = require('@/assets/images/testimonials-bg.jpg')
          })
          this.$route.meta.title = 'أراء العملاء'
          this.getImages()
        })
      } else {
        this.$router.push({name: '404'})
      }
    },

    getImages(url = this.urlGetImages) {
      this.showLoading = true
      const category_id = this.$route.params.id === 'testimonials' ? 999999999 : this.category.id
      axios.get(url, {params: {category_id: category_id}}).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.images = data.images
          this.showLoading = false
        } else {
          setTimeout(() => this.getImages(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getImages(), 500)
      })
    },

    paginateClick(pageNum) {
      this.getImages(this.urlGetImages + '?page=' + pageNum)
    },

    showImage(index) {
      this.currentImageShow = index
      this.$nextTick(() => {
        this.showCarousel = true
      })
    }
  },

  watch: {
    '$route.params.id' (id) {
      this.getCategory(id)
    }
  },
  created () {
    this.getCategory(this.$route.params.id)
  }
}
</script>

