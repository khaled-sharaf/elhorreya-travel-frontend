<template>
  <div class="category-box">
    <div class="wrapper-category-box shadow5">
      <flux-parallax class="wrapper-link" v-if="imageHeader != ''" :src="imageHeader" height="350px" offset="150%" :type="propertyType">
        <router-link class="overlay-box" :to="redirect">
          <div class="title">
            {{ category.name }}
          </div>
        </router-link>
      </flux-parallax>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    },
    propertyType: {
      type: String,
      default: 'relative'
    },
    redirect: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      imageHeader: this.$domain + this.category.image
    }
  }
}
</script>

