<template>
  <div id="flight-visa">
    <flux-parallax class="parallax-header categories-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">
              {{ category.name }}
            </span>
          </h1>
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
              <span class="number main-color"> 15% </span>
          </div>
        </div>

      </div>
    </flux-parallax>


    <div class="flight-visas-content main-content">
      <b-container>
        <div class="wrapper-boxs-content">
          <div class="side-title">
            <h3 class="text"> {{ category.name }} </h3>
          </div>
          <div class="boxs-content">
            <div class="wrapper-loading" v-if="showLoadingTravels">
              <div class="loading-view">
                <div class="icon">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </div>
                <div class="text">من فضلك انتظر قليلا...</div>
              </div>
            </div>
            <div class="travels-boxs-view" v-else>
              <b-row v-if="Object.keys(travelsData).length && travelsData.data.length">
                <b-col cols="12" v-for="travel in travelsData.data" :key="travel.id">
                  <travel-box-flight :travel="travel" :showModalBooking="showModalBooking"></travel-box-flight>
                </b-col>
              </b-row>

              <b-row v-else>
                <b-col cols="12">
                  <div class="wrapper-empty-travels">
                    <h4 class="message">
                      <span>
                        لا يوحد عروض متوفرة الآن
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
              v-show="Object.keys(travelsData).length && travelsData.data.length"
              v-model="travelsData.current_page"
              :page-count="Math.ceil(travelsData.total / travelsData.per_page)"
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
    </div>  <!-- travels-content -->

    <!-- ================================================================================ -->

    <!-- Form Modal Booking -->
    <b-modal id="modal-booking" size="lg" centered :title="modalBookingData.title">
      <form @submit.prevent="booking()">

        <b-row>
          <b-col md="6">
            <div class="form-group required">
              <input
                v-model="formBooking.name"
                class="form-control"
                :class="{ 'is-invalid': formBooking.errors.has('name') }"
                placeholder="الاسم"
              >
              <has-error :form="formBooking" field="name"></has-error>
            </div>
          </b-col>

          <b-col md="6">
            <div class="form-group required">
              <input
                v-model="formBooking.phone"
                class="form-control"
                :class="{ 'is-invalid': formBooking.errors.has('phone') }"
                placeholder="رقم الهاتف"
              >
              <has-error :form="formBooking" field="phone"></has-error>
            </div>
          </b-col>

          <b-col md="4">
            <div class="form-group">
              <input
                v-model="formBooking.email"
                class="form-control"
                :class="{ 'is-invalid': formBooking.errors.has('email') }"
                placeholder="البريد الإليكترونى"
              >
              <has-error :form="formBooking" field="email"></has-error>
            </div>
          </b-col>

          <b-col md="4">
            <div class="form-group">
              <input
                type="number"
                v-model="formBooking.adults"
                class="form-control"
                :class="{ 'is-invalid': formBooking.errors.has('adults') }"
                placeholder="عدد البالغين"
                min="0"
                max="100"
              >
              <has-error :form="formBooking" field="adults"></has-error>
            </div>
          </b-col>

          <b-col md="4">
            <div class="form-group">
              <input
                type="number"
                v-model="formBooking.children"
                class="form-control"
                :class="{ 'is-invalid': formBooking.errors.has('children') }"
                placeholder="عدد الأطفال"
                min="0"
                max="100"
              >
              <has-error :form="formBooking" field="children"></has-error>
            </div>
          </b-col>


          <b-col cols="12">
            <div class="form-group">
              <textarea
                v-model="formBooking.message"
                class="form-control auto-resize"
                :data-height="140"
                :class="{ 'is-invalid': formBooking.errors.has('message') }"
                placeholder="تفاصيل الحجز"
              ></textarea>
              <has-error :form="formBooking" field="message"></has-error>
            </div>
          </b-col>
        </b-row>

      </form>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button block variant="warning" @click="booking()">
            <span v-if="!formBooking.busy">
              حجز
            </span>
            <i v-else class="fas fa-circle-notch fa-spin icon-loading"></i>
          </b-button>
        </div>
      </template>

    </b-modal>

    <!-- ================================================================================ -->

  </div>
</template>


<script>

import TravelBoxFlight from '@/components/TravelBoxFlight'

export default {
  name: 'flight-visa',

  components: {
    TravelBoxFlight
  },

  data () {
    return {
      imageHeader: '',
      category: {
        id: '',
        name: '',
        image: '',
      },

      showLoadingTravels: true,
      travelsData: {},
      urlGetFlightTravels: '/flight-visas-travels',

      modalBookingData: {
        title: ''
      },
      formBooking: new Form({
        name: '',
        email: '',
        phone: '',
        message: '',
        adults: '',
        children: '',
        travel_id: ''
      })
    }
  },


  methods: {

    getTravels(url = this.urlGetFlightTravels) {
      this.showLoadingTravels = true
      axios.get(url, {params: {name: this.category.id}}).then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.travelsData = data.travels
          this.showLoadingTravels = false
        } else {
          setTimeout(() => this.getTravels(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getTravels(), 500)
      })
    },


    paginateClick(pageNum) {
      this.getTravels(this.urlGetFlightTravels + '?page=' + pageNum)
    },

    showModalBooking(travel) {
      this.modalBookingData.title = 'حجز ' + travel.name
      this.formBooking.travel_id = travel.id
      this.formBooking.errors.clear()
      this.$bvModal.show('modal-booking')
      this.$nextTick(() => {
        this.autoResizeTextArea()
      })
    },


    booking() {
      this.formBooking.post('/booking-external').then(response => {
        const data = response.data
        if (response.status === 200) {
          if (typeof data === 'object') {
            if (data.status) {
              this.formBooking.reset()
              this.$bvModal.hide('modal-booking')
              Swal.fire({
                type: 'success',
                text: data.message,
                title: 'تم الحجز بنجاح',
                showConfirmButton: false,
                timer: 5000
              })
            }
          }
        }
      }).catch(error => {
        if (error.response.status !== 422) {
          Swal.fire({
            type: 'error',
            text: 'ربما يكون حدث خطأ غير معروف من جهة السيرفر، من فضلك حاول الحجز مرة أخرى',
            showConfirmButton: false
          })
        }
      })
    },



    autoResizeTextArea() {
      $('textarea.auto-resize').each(function () {
        var padding = window.parseFloat($(this).css('padding-top')) + window.parseFloat($(this).css('padding-bottom')),
          border  = window.parseFloat($(this).css('border-top-width')) + window.parseFloat($(this).css('border-bottom-width')),
          height  = window.parseFloat($(this).attr('data-height'));
        $(this).height(height);
        $(this).keyup(function () {
          var padding = window.parseFloat($(this).css('padding-top')) + window.parseFloat($(this).css('padding-bottom')),
            border  = window.parseFloat($(this).css('border-top-width')) + window.parseFloat($(this).css('border-bottom-width')),
            height  = window.parseFloat($(this).attr('data-height'));
          $(this).height(height);
          $(this).height($(this)[0].scrollHeight + border - padding);
        });
      });
    },



  },


  watch: {
    '$route.params.id' (id) {
      this.category.id = this.$route.params.id
      this.$nextTick(() => {
        this.getTravels()
      })
    }
  },


  created () {
    this.category.id = this.$route.params.id
    if (this.$route.params.id === 'flight') {
      this.category.name = 'عروض الطيران'
      this.category.image = this.$settings.flight_page_bg
    } else if (this.$route.params.id === 'visas') {
      this.category.name = 'عروض التأشيرات'
      this.category.image = this.$settings.visas_page_bg
    } else {
      this.$router.push({name: '404'})
    }

    this.$nextTick(() => {
      this.imageHeader = ''
      setTimeout(() => {
        this.$route.meta.title = this.category.name
        this.imageHeader = this.category.image != null ? this.$domain + this.category.image : ''
        this.getTravels()
      })
    })
  }
}
</script>

