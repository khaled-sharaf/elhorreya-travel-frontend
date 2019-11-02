
<template>
  <div id="categories">
    <flux-parallax class="parallax-header categories-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">
              قسم
              {{ travelProgram.name }}
            </span>
          </h1>
          <div class="desc">
            <h3 class="text">
              {{ travelProgram.small_info }}
            </h3>
          </div>
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
              <span class="number main-color"> {{ travelProgram.discount }}% </span>
          </div>
          <!-- in mobile -->
          <div class="discount d-flex d-md-none">
              خصم
              <span class="number"> {{ travelProgram.discount }}% </span>
          </div>

        </div>

      </div>
    </flux-parallax>

    <section class="box-search" v-if="$store.state.showSearchBoxPages">
      <b-container>
        <search-box></search-box>
      </b-container>
    </section>

    <b-container>
      <div class="categories-content main-content">
        <div class="title-page">
          <h2 class="text">
            اختر من بين أفضل العروض
          </h2>
        </div>

        <div class="categories main-content-boxs">
          <category-box v-for="category in travelProgram.categories" :key="category.id" :category="category" :redirect="{name: 'travels', params: {id: category.id}}"></category-box>
        </div>

        <div class="description">
          <div class="side-title">
            <h3 class="text" v-text="travelProgram.name"></h3>
          </div>

          <div class="desc-content" v-text="travelProgram.big_info"></div>

        </div>
      </div>
    </b-container>

  </div>
</template>



<script>
import SearchBox from '@/components/SearchBox'
import CategoryBox from '@/components/CategoryBox'

export default {
  name: 'categories',
  components: {
    SearchBox,
    CategoryBox
  },

  data() {
    return {
      travelProgram: {},
      imageHeader: ''
    }
  },

  methods: {
    getTravelProgram(id) {
      this.travelProgram = this.$menuList.find(item => {
        return item.id == id
      })

      if (typeof this.travelProgram === 'object' && Object.keys(this.travelProgram).length) {
        this.imageHeader = ''
        setTimeout(() => {
          this.imageHeader = this.travelProgram.image != null ? this.$domain + this.travelProgram.image : ''
        })
        this.$nextTick(() => {
          this.$route.meta.title = this.travelProgram.name
        })
      } else {
        this.$router.push({name: '404'})
      }
    }
  },

  watch: {
    "$route.params.id"(id) {
      this.getTravelProgram(id)
    }
  },

  created() {
    this.getTravelProgram(this.$route.params.id)
  },
}
</script>

