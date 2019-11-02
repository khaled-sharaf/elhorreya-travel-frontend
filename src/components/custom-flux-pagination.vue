<template>
  <div class="custom-flux-pagination">
    <ul class="list-pagiante">
      <li
        class="item-pagiante"
        :class="{active: indexActiveImage === idx}"
        v-for="(image, idx) in slider.images"
        :key="idx"
      >
        <span
          class="paginate-image"
          :style="{'background-image': `url('${slider.path + image}')`}"
          @click="goToImage(idx)"
        ></span>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  props: ['slider'],

  data() {
    return {
      indexActiveImage: 0,
      eleActiveImage: '',
      isDownPaginationDrag: false
    }
  },

  methods: {
    goToImage(index) {
      this.slider.showImage(index)
    },

    handelDragAndDropPagination() {
      const self = this
      const wrapperPagination = $('.custom-flux-pagination')
      const scrollWidth = wrapperPagination[0].scrollWidth
      const clientwidth = wrapperPagination.outerWidth()
      let startX,
          currentScroll

      if (scrollWidth > clientwidth) {
          wrapperPagination.on('mousedown',  function (event) {
              const ele = $(this)
              self.isDownPaginationDrag = true
              ele.addClass('touchDown')
              startX = event.pageX - ele[0].offsetLeft
              currentScroll = ele.scrollLeft()
          });
          /*****************************************************/
          $(window).on('mouseup', function () {
              self.isDownPaginationDrag = false
              wrapperPagination.removeClass('touchDown')
          });
          /*****************************************************/
          // wrapperPagination.on('moseleave', function () {
          //     self.isDownPaginationDrag = false
          //     $(this).removeClass('touchDown')
          // });
          /*****************************************************/
          wrapperPagination.on('mousemove', function (event) {
              if (self.isDownPaginationDrag) {
                const ele = $(this)
                ele.addClass('touchDown')
                let x = event.pageX - ele[0].offsetLeft,
                    walk = x - startX,
                    finalScroll = currentScroll - walk;
                ele.scrollLeft(finalScroll)
            }
          });
      }
    },

    addActiveToCurrentImage(index) {
      this.eleActiveImage = $('.custom-flux-pagination .list-pagiante').children('li')[index]
      const wrapperPagination = $('.custom-flux-pagination')
      wrapperPagination.animate({
          scrollLeft:
          this.eleActiveImage.offsetLeft -
              (wrapperPagination.outerWidth() / 2) +
              ($(this.eleActiveImage).outerWidth() / 2)
      }, 500)
    }
  },

  watch: {
    'slider._data': {
      handler(newData) {
        const index = this.slider.currentImage().index
        if (this.indexActiveImage !== index) {
          this.indexActiveImage = index
          if (!this.isDownPaginationDrag) {
            this.addActiveToCurrentImage(this.indexActiveImage)
          }
        }
      },
      deep: true
    }
  },

  mounted() {
    this.handelDragAndDropPagination()
  }
}
</script>

