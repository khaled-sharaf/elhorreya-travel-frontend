
<template>
  <div id="c_search_box">
    <div class="search-box-wrapper" @mouseenter="showBtnReset = true" @mouseleave="showBtnReset = false">
      <div class="header">
        <h3 class="title">ابحث عن رحلتك</h3>
        <b-button size="sm" variant="warning" class="reset-form" v-if="showBtnReset" @click="resetForm()">
          <i class="fas fa-times"></i>
        </b-button>
      </div>

      <div class="search-form">
        <form @submit.prevent="search()">
          <b-form-row>
            <b-col md="3">
              <div class="form-group">
                <span class="title-input">اختر قسم الرحلة</span>
                <select
                  v-model="form.category"
                  class="custom-select"
                  :class="{ 'is-invalid': form.errors.has('category') }"
                  >
                  <option value=""></option>
                  <optgroup v-for="program in categories" :key="program.id" :label="program.name">
                    <option v-for="category in program.categories" :key="category.id" :value="category.id" v-text="category.name"></option>
                  </optgroup>
                </select>
                <has-error :form="form" field="category"></has-error>
              </div>
            </b-col>
            <!-- ./col -->



            <b-col md="3" class="col-go-and-back">
              <div class="form-group">
                <div class="wrapper-go-and-back">
                  <div class="custom-control custom-radio">
                    <input
                      type="radio"
                      :id="'go_only_' + type"
                      :name="'go_and_back_' + type"
                      class="custom-control-input"
                      v-model="form.go_and_back"
                      :value="0"
                    >
                    <label class="custom-control-label" :for="'go_only_' + type">ذهاب</label>
                  </div>

                  <div class="custom-control custom-radio">
                    <input
                      type="radio"
                      :id="'go_and_back_' + type"
                      :name="'go_and_back_' + type"
                      class="custom-control-input"
                      v-model="form.go_and_back"
                      :value="1"
                    >
                    <label class="custom-control-label" :for="'go_and_back_' + type">ذهاب وعودة</label>
                  </div>
                </div>
              </div>
            </b-col>
            <!-- ./col -->

            <div class="w-100 separator"></div>

            <b-col md="3">
              <div class="form-group">
                <span class="title-input">اختر المدينة</span>
                <select
                  v-model="form.hotel_address"
                  class="custom-select"
                  :class="{ 'is-invalid': form.errors.has('hotel_address') }"
                  :disabled="disabledAddress"
                  >
                  <option value=""></option>
                  <option v-for="address in hotelsAddress" :key="address" :value="address" v-text="address"></option>
                </select>
                <has-error :form="form" field="hotel_address"></has-error>
              </div>
            </b-col>
            <!-- ./col -->

            <b-col md="3">
              <div class="form-group">
                <span class="title-input">ذهاب</span>
                <div class="wrapper-input-date">
                  <date-picker
                    v-model="form.date_from"
                    placeholder="2012-12-30"
                    width="100%"
                    :lang="langDates"
                    value-type="format"
                  ></date-picker>
                </div>
              </div>
            </b-col>
            <!-- ./col -->

            <b-col md="3">
              <div class="form-group">
                <span class="title-input">عودة</span>
                <div class="wrapper-input-date">
                  <date-picker
                    v-model="form.date_to"
                    placeholder="2012-12-30"
                    width="100%"
                    :lang="langDates"
                    value-type="format"
                  ></date-picker>
                </div>
              </div>
            </b-col>
            <!-- ./col -->


            <!-- <b-col md="4">
              <div class="form-group">
                <span class="title-input">العدد</span>
                <div class="count-people form-control">
                  <input
                    v-model="form.adults"
                    type="number"
                    placeholder="بالغ"
                    min="0"
                    max="100"
                  >

                  <input
                    v-model="form.children"
                    type="number"
                    placeholder="طفل"
                    min="0"
                    max="100"
                  >

                </div>
              </div>
            </b-col> -->
            <!-- ./col -->

            <b-col md="3">
              <div class="form-group">
                <b-button variant="warning" :disabled="$store.state.showLoading" block class="waves-effect waves-light btn-submit-search" type="submit">
                  <span v-if="!$store.state.showLoading">
                    بحث
                    <i class="fas fa-search"></i>
                  </span>
                  <i v-else class="fas fa-circle-notch fa-spin icon-loading"></i>
                </b-button>
              </div>
            </b-col>
            <!-- ./col -->
          </b-form-row>
        </form>
      </div>

    </div>
  </div>
</template>



<script>
export default {
  props: {
    type: {
      type: String,
      default: 'pages'
    }
  },
  data() {
    return {
      langDates: {
          days: this.$store.state.days,
          months: this.$store.state.months
      },
      showBtnReset: false,
      disabledAddress: false,
      form: new Form({
        search: 'search',
        category: '',
        hotel_address: '',
        go_and_back: 1,
        date_from: '',
        date_to: '',
        filter_to_price: '',
        filter_from_price: '',
        filter_stars: 7,
        filter_hotel: '',
        sortBy: '',
        page: 1
      }),
      categories: this.$menuList,
      hotelsAddress: []
    }
  },

  methods: {
    search() {
      this.form.page = 1
      this.$store.dispatch('getSearchData', [this, this.form])
    },

    resetForm() {
      this.form.reset()
      this.$store.dispatch('resetAndHideSearch')
    },

    fillSearchForm() {
      if (Object.keys(this.$store.state.searchForm).length) {
        this.form.fill(this.$store.state.searchForm)
      }
    },

    getCategory(id) {
      const categories = []
      this.$menuList.forEach(program => {
        program.categories.forEach(category => {
          categories.push(category)
        })
      })
      return categories.find(item => {
        return item.id == id
      })
    },

    addHotelsAddress() {
      const getAddress = setInterval(() => {
        if (this.$store.state.hotels.length) {
          clearInterval(getAddress)
          this.hotelsAddress = this.$store.state.hotels.map(hotel => {
            return hotel.address
          }).filter((value, index, self) => {
              return self.indexOf(value) === index
          })
        }
      }, 500)
    },

    handelPropsWhenChangeFormAndMounted(category) {
      const getAddress = setInterval(() => {
        if (this.$store.state.hotels.length) {
          clearInterval(getAddress)
          if (category.type === 4) {
            const hotelsExternal = this.$store.state.hotels.filter((hotel) => {
              if (hotel.travels.length) {
                return hotel.travels[0].type === 'external'
              }
            })
            this.hotelsAddress = hotelsExternal.map(hotel => {
              return hotel.address
            }).filter((value, index, self) => {
                return self.indexOf(value) === index
            })
          }

          if (category.type === 3) {
            this.form.hotel_address = ''
            if (this.hotelsAddress.indexOf(category.name) != -1) {
              this.disabledAddress = true
            } else {
              this.disabledAddress = false
            }
          }

        }
      }, 500)
    }
  },

  watch: {
    '$store.state.searchForm': {
      handler(form) {
        this.fillSearchForm()
      },
      deep: true
    },

    'form.category'(newCategory) {
      this.addHotelsAddress()
      if (newCategory !== '') {
        const category = this.getCategory(newCategory)
        if (category.type === 1 || category.type === 2) {
          this.disabledAddress = true
          this.form.hotel_address = ''
        } else {
          if (category.type !== 3) {
            this.disabledAddress = false
          }
        }
        this.handelPropsWhenChangeFormAndMounted(category)
      } else {
        this.disabledAddress = false
      }
    },

    'form.hotel_address'(newVal) {
        this.form.filter_hotel = ''
    }
  },



  mounted() {
    this.$nextTick(() => {
      this.addHotelsAddress()
      this.fillSearchForm()
      if (this.form.category !== '') {
        const category = this.getCategory(this.form.category)
        this.handelPropsWhenChangeFormAndMounted(category)
      }
    })
  }
}
</script>

