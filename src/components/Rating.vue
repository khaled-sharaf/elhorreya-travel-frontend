<template>
  <div class="wrapper-rating-stars">
    <i class="rating-stars">
      <i class="regular" :style="{backgroundImage: `url(${regularBg})`}"></i>
      <i class="solid" :style="{width: number + '%', backgroundImage: `url(${solidBg})`}"></i>
    </i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      regularBg: require('@/assets/images/5-stars-regular.png'),
      solidBg: require('@/assets/images/5-stars-solid.png')
    }
  }
}
</script>
