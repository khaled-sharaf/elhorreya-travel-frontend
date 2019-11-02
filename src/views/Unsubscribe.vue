<template>
  <div id="unsubscribe">
    <flux-parallax class="parallax-header unsubscribe-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">إلغاء الإشتراك فى خدمة القائمة البريدية</span>
          </h1>
        </div>
      </div>
    </flux-parallax>

    <div class="unsubscribe-content main-content">
      <b-container>
        <div class="form-unsubscribe">
          <form @submit.prevent="unsubscribe()">
            <div class="section-title-center">
              <h2 class="text">
                إلغاء الإشتراك فى خدمة القائمة البريدية
              </h2>
            </div>
            <div class="form-group">
              <input
                v-model="formUnsubscribe.email"
                class="form-control"
                :class="{ 'is-invalid': formUnsubscribe.errors.has('email') }"
                placeholder="البريد الإليكترونى الذى تريد إلغائه من الخدمة"
              >
              <has-error :form="formUnsubscribe" field="email"></has-error>
            </div>
              <b-button block variant="warning" :disabled="formUnsubscribe.busy" type="submit">
                <span v-if="!formUnsubscribe.busy">
                  إلغاء
                </span>
                <i v-else class="fas fa-circle-notch fa-spin icon-loading"></i>
              </b-button>
            <b-alert
              class="message-success"
              :show="messageDoneSendMail != ''"
              dismissible
              @dismissed="messageDoneSendMail = ''"
              variant="success">
              {{ messageDoneSendMail }}
            </b-alert>
          </form>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageHeader: this.$settings.home_page_bg != null ? this.$domain + this.$settings.home_page_bg : '',
      formUnsubscribe: new Form({
        email: '',
      }),
      messageDoneSendMail: ''
    }
  },

  methods: {
    unsubscribe() {
      this.formUnsubscribe.post('/mailing_list/unsubscribe').then(response => {
        const data = response.data
        if (response.status === 200) {
          if (typeof data === 'object') {
            if (data.status) {
              this.messageDoneSendMail = data.message
              this.formUnsubscribe.reset()
            }
          }
        }
      })
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.imageHeader = this.$settings.home_page_bg != null ? this.$domain + this.$settings.home_page_bg : ''
    })
  }
}
</script>

