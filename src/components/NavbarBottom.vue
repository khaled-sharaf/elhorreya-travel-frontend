
<template>
  <div id="c_navbar_bottom">
      <div class="navbar-bottom">

        <div class="nav-item">
          <div class="wrapper-nav-item" @click="showSidebar()">
            <div class="icon">
              <i class="fas fa-bars"></i>
            </div>
            <div class="text">
              القائمة
            </div>
          </div>
        </div>

        <!-- <div class="nav-item">
          <div class="wrapper-nav-item" @click="showSearch()">
            <div class="icon">
              <i class="fas fa-search"></i>
            </div>
            <div class="text">
              بحث
            </div>
          </div>
        </div> -->

        <div class="nav-item">
          <div class="wrapper-nav-item" @click="goToHome()">
            <div class="icon">
              <i class="fas fa-home"></i>
            </div>
            <div class="text">
              الرئيسية
            </div>
          </div>
        </div>

      </div>
  </div>
</template>



<script>
export default {
  methods: {
    showSearch() {
      this.$store.dispatch('showSearchBoxAction')
    },
    showSidebar() {
        this.$navbarClass.toggleSidebar()
    },
    goToHome() {
      if (this.$route.name !== 'home' || (this.$route.name === 'home' && Object.keys(this.$route.query).length)) {
        this.$router.push({name: 'home'})
        this.$store.state.showSearchResult = false
      }
    }
  }
}
</script>

