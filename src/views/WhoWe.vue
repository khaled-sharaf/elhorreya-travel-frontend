<template>
  <div id="who_we">
    <flux-parallax class="parallax-header who-we-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">عن الحرية للسياحة</span>
          </h1>
        </div>

        <div class="header-left">
          <div class="visitor">
            <h3 class="title">انت الزائر رقم</h3>
            <div class="count-visitor">
              <span class="number" v-for="(num, idx) in getVisitors" :key="idx" v-text="num"></span>
            </div>
          </div>
        </div>
      </div>
    </flux-parallax>

    <div class="who-we-content main-content">

      <b-container>

        <div class="section-title-center">
          <h2 class="text">
            من نحن
          </h2>
        </div>

        <div class="content-text" v-html="$settings.who_we.replace(/(?:\r\n|\r|\n)/g, '<br>')"></div>


        <div class="section-title-center">
          <h2 class="text">
            خدمات شركة الحرية للسياحة
          </h2>
        </div>


        <div class="content-text" v-html="$settings.services.replace(/(?:\r\n|\r|\n)/g, '<br>')"></div>

      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageHeader: ''
    }
  },

  computed: {
    getVisitors() {
      return this.$store.state.visitors.toString().split('')
    }
  },

  mounted() {
    this.imageHeader = ''
    setTimeout(() => {
      this.imageHeader = this.$settings.who_we_page_bg != null ? this.$domain + this.$settings.who_we_page_bg : ''
    })
  }
}
</script>

