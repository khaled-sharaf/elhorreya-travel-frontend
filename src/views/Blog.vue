<template>
  <div id="blog">
    <flux-parallax class="parallax-header blog-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline" v-text="blog.title"></span>
          </h1>
        </div>
      </div>
    </flux-parallax>

    <div class="blog-content main-content">
      <b-container>
        <div class="wrapper-loading" v-if="showLoading">
          <div class="loading-view">
            <div class="icon">
              <i class="fas fa-circle-notch fa-spin"></i>
            </div>
            <div class="text">من فضلك انتظر قليلا...</div>
          </div>
        </div>


        <div class="blog" v-else>
          <div class="title">
            <h2 class="text" v-text="blog.title"></h2>
          </div>
          <div class="created-at">
            <div class="icon">
              <i class="far fa-clock"></i>
            </div>
            <div class="show-date" v-html="handelDate(blog.created_at)"></div>
          </div>

          <div class="carousel-container">
            <carousel
              class="my-carousel-images"
              :nav="true"
              :items="1"
              :dots="false"
              :loop="true"
              :smartSpeed="500"
              :autoplay="true"
              :autoplaySpeed="800"
              :autoplayTimeout="4000"
              :autoplayHoverPause="true"
              :navText="[`<span class='waves-effect'><i class='fas fa-chevron-left'></i></span>`, `<span class='waves-effect'><i class='fas fa-chevron-right'></i></span>`]"
            >
              <div
                class="image-item-carousel"
                v-for="image in blog.gallery" :key="image.id"
              >
                <div class="image">
                  <img :src="$domain + image.value" :alt="'الحرية للسياحة - ' + blog.title">
                </div>
              </div>
            </carousel>
          </div>

          <p class="paragraph" v-html="blog.content.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
        </div>

      </b-container>
    </div>

  </div>
</template>

<script>

import carousel from 'vue-owl-carousel2'

export default {
  components: {
    carousel,
  },

  data() {
    return {
      imageHeader: '',
      blog: {},
      showLoading: true,
      urlGetBlog: '/blog'
    }
  },

  methods: {
    async getBlog(id) {
      let blog = {}
      this.showLoading = true
      await axios.get(this.urlGetBlog, {params: {id: id}}).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.blog = data.blog
          blog = this.blog
          this.$nextTick(() => {
            this.imageHeader = this.blog.image != null ? this.$domain + this.blog.image : ''
            this.showLoading = false
            this.$route.meta.title = this.blog.title
          })
        } else {
          setTimeout(() => this.getBlog(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getBlog(), 500)
      })
      return blog
    },

    handelDate(date) {
      let newDate = ''
      let dateObj = new Date(date)
      let morning_or_evening = parseInt(dateObj.getHours()) >= 12 ? 'مساءاً' : 'صباحاً'
      let hours = parseInt(dateObj.getHours())
      if (parseInt(dateObj.getHours()) === 0) {
        hours = 12
      } else if (parseInt(dateObj.getHours()) > 12) {
        hours = parseInt(dateObj.getHours()) - 12
      }
      if (hours < 10) {
        hours = '0' + hours
      }
      let minutes = dateObj.getMinutes()
      let day = dateObj.getDay()
      let dayDate = dateObj.getDate()
      let month = dateObj.getMonth()
      let year = dateObj.getFullYear()

      newDate =
                '<span class="time">' +
                hours + ':' +
                minutes + ' ' +
                morning_or_evening +
                '</span><span class="separator"> | </span><span class="date">' +
                this.$store.state.days[day] + ' ' +
                dayDate + ' ' +
                this.$store.state.months[month] + ' ' +
                year +
                '</span>'
      return newDate
    }
  },

  created() {
    if (this.$route.params.blog) {
      this.blog = this.$route.params.blog
      this.$nextTick(() => {
        this.imageHeader = this.blog.image != null ? this.$domain + this.blog.image : ''
        this.$route.meta.title = this.blog.title
        this.showLoading = false
      })
    } else {
      this.getBlog(this.$route.params.id)
    }
  },
}
</script>

