<style lang="scss" scoped>

</style>



<template>
  <div id="c_footer">
    <!--  wrapper-subscribe-mailing-list -->
    <div class="wrapper-subscribe-mailing-list">
      <b-container>
        <b-row>
          <b-col lg="6">
            <div class="box subscribe-form">
              <div class="title">
                <h4 class="text">اشترك فى قائمتنا البريدية ليصلك كل جديد</h4>
              </div>
              <div class="content">
                <b-form @submit.prevent="subscribe()">
                  <b-form-group class="required">
                    <b-input class="input-email" v-model="formSubscribe.email" placeholder="ادخل بريدك الإليكترونى"></b-input>
                    <div class="message">
                      <div class="error" v-if="formSubscribe.errors.has('email')">
                        {{ formSubscribe.errors.get('email') }}
                      </div>
                    </div>
                  </b-form-group>

                  <b-form-group>
                    <b-input class="input-phone" v-model="formSubscribe.phone" placeholder="رقم الموبايل"></b-input>
                    <div class="message">
                      <div class="error" v-if="formSubscribe.errors.has('phone')">
                        {{ formSubscribe.errors.get('phone') }}
                      </div>
                    </div>
                  </b-form-group>
                  <b-button :disabled="formSubscribe.busy" variant="warning" type="submit">
                    <span v-if="!formSubscribe.busy">
                      إرسال
                    </span>
                    <i v-else class="fas fa-circle-notch fa-spin icon-loading"></i>
                  </b-button>
                </b-form>
                <div class="message-alert">
                  <b-alert
                    class="message-success"
                    :show="messageDoneSubscribe != ''"
                    dismissible
                    @dismissed="messageDoneSubscribe = ''"
                    variant="success">
                    {{ messageDoneSubscribe }}
                  </b-alert>
                </div>
              </div>
            </div>
          </b-col>

          <b-col lg="6">
            <div class="box contact-us">
              <div class="title">
                <h4 class="text">أيضا تواصل معنا عبر وسائل التواصل</h4>
              </div>
              <div class="content">
                <div class="icons">
                  <a class="waves-effect" :href="$settings.whatsapp_link" target="_blank" v-if="$settings.whatsapp_link != null && $settings.whatsapp_link != ''">
                    <i class="fab fa-whatsapp"></i>
                  </a>
                  <a class="waves-effect" :href="$settings.instagram_link" target="_blank" v-if="$settings.instagram_link != null && $settings.instagram_link != ''">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a class="waves-effect" :href="$settings.twitter_link" target="_blank" v-if="$settings.twitter_link != null && $settings.twitter_link != ''">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a class="waves-effect" :href="$settings.facebook_link" target="_blank" v-if="$settings.facebook_link != null && $settings.facebook_link != ''">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </div>
              </div>
            </div>
          </b-col>

        </b-row>
      </b-container>
    </div>
    <!-- ./wrapper-subscribe-mailing-list -->
    <!-- ==================================================================================== -->
    
    <div class="wrapper-footer">
      <b-container>
        <b-row>
          <b-col sm="6" lg="3" class="col-desc">
            <div class="box">
              <h4 class="title-footer">
                {{ $settings.site_name_ar }}
              </h4>

              <div class="content">
                <div class="content-desc">
                  <p class="lead" v-text="$settings.footer_desc"></p>
                  <b-button variant="warning" class="more-desc" :to="{name: 'who-we'}">للمزيد</b-button>
                </div>
              </div>
            </div><!-- ./desc -->
          </b-col>
          <!-- ./col -->

          <b-col sm="6" lg="3" class="col-links">
            <div class="box">
              <h4 class="title-footer">
                روابط هامة
              </h4>

              <div class="content">
                <ul class="list">
                  <li><router-link :to="{name: 'home'}">الرئيسية</router-link></li>
                  <li
                    v-for="travelProgram in $menuList"
                    :key="travelProgram.id"
                  >
                    <router-link :to="{name: 'categories', params: {id: travelProgram.id}}"> {{ travelProgram.name }}</router-link>
                  </li>
                  <li><router-link :to="{name: 'hotels'}"> الفنادق </router-link></li>
                  <li><router-link :to="{name: 'travels-images-categories'}"> الصور </router-link></li>
                  <li><router-link :to="{name: 'blogs'}"> المدونة </router-link></li>
                  <li><router-link :to="{name: 'who-we'}"> من نحن </router-link></li>
                  <li><router-link :to="{name: 'contact-us'}"> اتصل بنا </router-link></li>
                </ul>
              </div>
            </div><!-- ./links -->
          </b-col>
          <!-- ./col -->

          <b-col sm="6" lg="3" class="col-our-location">
            <div class="box">
              <h4 class="title-footer">
                موقعنا
              </h4>

              <div class="content">
                <ul class="list">
                  <li v-if="$settings.address_1 != null && $settings.address_1 != ''">
                    <div class="icon">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="text">
                      {{ $settings.address_1 }}
                    </div>
                  </li>

                  <li v-if="$settings.address_2 != null && $settings.address_2 != ''">
                    <div class="icon">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="text">
                      {{ $settings.address_2 }}
                    </div>
                  </li>

                  <li v-if="$settings.mobile_1 != null && $settings.mobile_1 != ''">
                    <div class="icon">
                      <i class="fas fa-phone"></i>
                    </div>
                    <div class="text">
                      {{ $settings.mobile_1 }}
                    </div>
                  </li>

                  <li v-if="$settings.mobile_2 != null && $settings.mobile_2 != ''">
                    <div class="icon">
                      <i class="fas fa-phone"></i>
                    </div>
                    <div class="text">
                      {{ $settings.mobile_2 }}
                    </div>
                  </li>

                  <li v-if="$settings.email != null && $settings.email != ''">
                    <div class="icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="text">
                      <a :href="'mailto:' + $settings.email" v-text="$settings.email"></a>
                    </div>
                  </li>

                </ul>
              </div>
            </div><!-- ./my-website -->
          </b-col>
          <!-- ./col -->

          <b-col sm="6" lg="3" class="col-contact-us">
            <div class="box">
              <h4 class="title-footer">
                تواصل معنا
              </h4>

              <div class="content">
                <div class="social">
                  <div class="icons">
                    <a :href="$settings.whatsapp_link" target="_blank" v-if="$settings.whatsapp_link != null && $settings.whatsapp_link != ''">
                      <i class="fab fa-whatsapp"></i>
                    </a>
                    <a :href="$settings.instagram_link" target="_blank" v-if="$settings.instagram_link != null && $settings.instagram_link != ''">
                      <i class="fab fa-instagram"></i>
                    </a>
                    <a :href="$settings.twitter_link" target="_blank" v-if="$settings.twitter_link != null && $settings.twitter_link != ''">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a :href="$settings.facebook_link" target="_blank" v-if="$settings.facebook_link != null && $settings.facebook_link != ''">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </div>
                  <b-button
                    variant="warning"
                    class="send-message"
                    @click="goToFormContactUs()"
                  >أرسل لنا رسالة</b-button>
                </div>

              </div>
            </div><!-- ./contact-us -->
          </b-col>
          <!-- ./col -->

          <b-col cols="12" class="col-copyright">
            <div class="copyright text-center">
              جميع الحقوق محفوظة
              &copy;
              {{ new Date().getFullYear() }}
              <router-link class="site-name" :to="{name: 'home'}"> {{ $settings.site_name_ar }} </router-link>
            </div>
          </b-col>

        </b-row>
      </b-container>

      <div class="logo-footer">
        <div class="image">
          <img :src="$domain + $settings.footer_logo">
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {

  data() {
    return {
      formSubscribe: new Form({
        email: '',
        phone: ''
      }),
      messageDoneSubscribe: ''
    }
  },

   watch: {
    'formSubscribe.email'(newVal) {
      if (newVal.trim() === '') {
        this.formSubscribe.errors.clear('email')
      }
    }
  },

  methods: {
    goToFormContactUs() {
      this.$router.push({name: 'contact-us'})
      this.$nextTick(() => {
        $('html, body').scrollTop($('.contact-form').offset().top - 50)
      })
    },

    subscribe() {
      this.formSubscribe.post('/mailing_list/subscribe').then(response => {
        const data = response.data
        if (response.status === 200) {
          if (typeof data === 'object') {
            if (data.status) {
              this.messageDoneSubscribe = data.message
              this.formSubscribe.reset()
            }
          }
        }
      })
    },
  }
}
</script>

