<template>
  <div id="blogs">
    <flux-parallax class="parallax-header blogs-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">مدونات ومقالات عن الرحلات والسياحة</span>
          </h1>
        </div>
      </div>
    </flux-parallax>

    <div class="blogs-content main-content">

      <b-container>
        <div class="wrapper-loading" v-if="showLoading">
          <div class="loading-view">
            <div class="icon">
              <i class="fas fa-circle-notch fa-spin"></i>
            </div>
            <div class="text">من فضلك انتظر قليلا...</div>
          </div>
        </div>

        <div class="blogs-boxs-view" v-else>
          <div class="data" v-if="Object.keys(blogs).length && blogs.data.length">

            <div class="blog" v-for="blog in blogs.data" :key="blog.id">
              <b-row>
                <b-col lg="4">
                  <div class="image" :style="{'background-image': `url('${$domain + blog.image}')`}"></div>
                </b-col>

                <b-col lg="8">
                  <div class="content">
                    <div class="title">
                      <h3 class="text" v-text="blog.title"></h3>
                    </div>
                    <p class="paragraph" v-read-more="{limit: 400}" v-html="blog.content"></p>
                    <!-- .replace(/(?:\r\n|\r|\n)/g, '<br>') -->
                    <div class="show-more">
                      <router-link :to="{name: 'blog', params: {id: blog.id, blog: blog}}">
                        المزيد
                      </router-link>
                    </div>
                  </div>
                </b-col>

              </b-row>
            </div>
          </div>

          <b-row v-else>
            <b-col cols="12">
              <div class="wrapper-empty-travels">
                <h4 class="message">
                  <span>
                    ليس هناك مدونات مضافة حاليا
                  </span>
                </h4>
              </div>
            </b-col>
          </b-row>

          <div class="footer-page-boxs">

            <paginate
              v-show="Object.keys(blogs).length && blogs.data.length"
              v-model="blogs.current_page"
              :page-count="Math.ceil(blogs.total / blogs.per_page)"
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
      </b-container>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageHeader: '',
      blogs: {},
      showLoading: true,
      urlGetBlogs: '/blogs'
    }
  },


  methods: {
    getBlogs(url = this.urlGetBlogs) {
      this.showLoading = true
      axios.get(url).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.blogs = data.blogs
          this.showLoading = false
        } else {
          setTimeout(() => this.getBlogs(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getBlogs(), 500)
      })
    },

    paginateClick(pageNum) {
      this.getBlogs(this.urlGetBlogs + '?page=' + pageNum)
    },
  },


  mounted() {
    this.getBlogs()
    this.$nextTick(() => {
      this.imageHeader = ''
      setTimeout(() => {
        this.imageHeader = this.$settings.blogs_page_bg != null ? this.$domain + this.$settings.blogs_page_bg : ''
      })
    })
  }
}
</script>

