<template>
  <div id="contact_us">
    <flux-parallax class="parallax-header contact-us-header" v-if="imageHeader != ''" :src="imageHeader" height="400px" offset="200%" type="relative">
      <div class="header-content between">
        <div class="header-right">
          <h1 class="header-title">
            <span class="mark-underline">تواصل معنا</span>
          </h1>
        </div>
      </div>
    </flux-parallax>

    <div class="contact-us-content main-content">
      <b-container>

        <div class="contact">
          <div class="section-title-center">
            <h2 class="text">
              للتواصل والاستفسار
            </h2>
          </div>

          <div class="content">
            <div class="row-contact">
              <div class="side" v-if="$settings.address_1 != null && $settings.address_1 != ''">
                <span class="icon">
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                <span class="text" v-text="$settings.address_1"></span>
              </div> <!-- ./side -->

              <div class="side" v-if="$settings.address_2 != null">
                <span class="icon">
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                <span class="text" v-text="$settings.address_2"></span>
              </div> <!-- ./side -->

            </div> <!-- ./row-contact -->

            <div class="row-contact">
              <div class="side" v-if="$settings.address_3 != null">
                <span class="icon">
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                <span class="text" v-text="$settings.address_3"></span>
              </div> <!-- ./side -->
            </div> <!-- ./row-contact -->

            <div class="row-contact">
              <div class="side" v-if="$settings.mobile_1 != null">
                <span class="icon">
                  <i class="fas fa-phone"></i>
                </span>
                <span class="text" v-text="$settings.mobile_1"></span>
              </div> <!-- ./side -->

              <div class="side" v-if="$settings.mobile_2 != null">
                <span class="icon">
                  <i class="fas fa-phone"></i>
                </span>
                <span class="text" v-text="$settings.mobile_2"></span>
              </div> <!-- ./side -->
            </div> <!-- ./row-contact -->

            <div class="row-contact">
              <div class="side" v-if="$settings.mobile_3 != null">
                <span class="icon">
                  <i class="fas fa-phone"></i>
                </span>
                <span class="text" v-text="$settings.mobile_3"></span>
              </div> <!-- ./side -->

              <div class="side" v-if="$settings.mobile_4 != null">
                <span class="icon">
                  <i class="fas fa-phone"></i>
                </span>
                <span class="text" v-text="$settings.mobile_4"></span>
              </div> <!-- ./side -->
            </div> <!-- ./row-contact -->

            <div class="row-contact">
              <div class="side" v-if="$settings.email != null">
                <span class="icon">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="text" v-text="$settings.email"></span>
              </div> <!-- ./side -->
            </div> <!-- ./row-contact -->

          </div>
        </div>
        <!-- ============================================================================ -->

        <div class="map" v-if="$settings.latitude != null && $settings.longitude != null">
          <div class="section-title-center">
            <h2 class="text">
              خريطة الفرع الرئيسى
            </h2>
          </div>

          <div class="content">
            <div class="map-company" id="map_company" :data-lat="$settings.latitude" :data-long="$settings.longitude">
                <div class="location_map_company"></div>
            </div>
          </div>
        </div>
        <!-- ============================================================================ -->



        <div class="section-title-center">
          <h2 class="text">
            فروعنا
          </h2>
        </div>

        <div class="branches">

          <div class="wrapper-loading" v-if="showLoadingBranches">
          <div class="loading-view">
            <div class="icon">
              <i class="fas fa-circle-notch fa-spin"></i>
            </div>
            <div class="text">من فضلك انتظر قليلا...</div>
          </div>
        </div>


        <div class="branches-wrapper" v-else>

          <div class="branch" v-for="branch in branches" :key="branch.id">


            <div class="branch-name" :class="{active: branchActive == branch.id}">
              <h3 class="text" @click="showBranch(branch.id)">
                {{ branch.branch_name }}
                <span class="icon">
                  <i class="fas fa-angle-left"></i>
                </span>
              </h3>
              <span class="span-border-effect-right"></span>
            </div>

            <vue-slide :active="branchActive == branch.id" :duration="600" :use-hidden="false">

              <div class="branch-content">

                <div class="contact">

                  <div class="content">
                    <div class="row-contact">
                      <div class="side" v-if="branch.address != null && branch.address != ''">
                        <span class="icon">
                          <i class="fas fa-map-marker-alt"></i>
                        </span>
                        <span class="text" v-text="branch.address"></span>
                      </div> <!-- ./side -->

                    </div> <!-- ./row-contact -->

                    <div class="row-contact">
                      <div class="side" v-if="branch.phone_1 != null">
                        <span class="icon">
                          <i class="fas fa-phone"></i>
                        </span>
                        <span class="text" v-text="branch.phone_1"></span>
                      </div> <!-- ./side -->

                      <div class="side" v-if="branch.phone_2 != null">
                        <span class="icon">
                          <i class="fas fa-phone"></i>
                        </span>
                        <span class="text" v-text="branch.phone_2"></span>
                      </div> <!-- ./side -->
                    </div> <!-- ./row-contact -->

                    <div class="row-contact">
                      <div class="side" v-if="branch.phone_3 != null">
                        <span class="icon">
                          <i class="fas fa-phone"></i>
                        </span>
                        <span class="text" v-text="branch.phone_3"></span>
                      </div> <!-- ./side -->

                      <div class="side" v-if="branch.phone_4 != null">
                        <span class="icon">
                          <i class="fas fa-phone"></i>
                        </span>
                        <span class="text" v-text="branch.phone_4"></span>
                      </div> <!-- ./side -->
                    </div> <!-- ./row-contact -->

                    <div class="row-contact">
                      <div class="side" v-if="branch.email != null">
                        <span class="icon">
                          <i class="fas fa-envelope"></i>
                        </span>
                        <span class="text" v-text="branch.email"></span>
                      </div> <!-- ./side -->
                    </div> <!-- ./row-contact -->

                  </div>
                </div>


                <div class="map" v-if="branch.latitude != null && branch.longitude != null">
                  <div class="content">
                    <div class="map-company" id="map_company" :data-lat="branch.latitude" :data-long="branch.longitude">
                        <div class="location_map_company"></div>
                    </div>
                  </div>
                </div>

              </div>

            </vue-slide>

          </div>

        </div>

        </div>


        <!-- ============================================================================ -->


        <div class="contact-form">
          <div class="section-title-center">
            <h2 class="text">
              شاركنا برأيك
            </h2>
          </div>

          <div class="content">
            <form @submit.prevent="sendMail()">

              <b-row>
                <b-col lg="8">
                  <b-row>
                    <b-col md="4">
                      <div class="form-group">
                        <input
                          v-model="formMail.name"
                          class="form-control"
                          :class="{ 'is-invalid': formMail.errors.has('name') }"
                          placeholder="الاسم"
                        >
                        <has-error :form="formMail" field="name"></has-error>
                      </div>
                    </b-col>

                    <b-col md="4">
                      <div class="form-group">
                        <input
                          v-model="formMail.email"
                          class="form-control"
                          :class="{ 'is-invalid': formMail.errors.has('email') }"
                          placeholder="البريد الإليكترونى"
                        >
                        <has-error :form="formMail" field="email"></has-error>
                      </div>
                    </b-col>

                    <b-col md="4">
                      <div class="form-group">
                        <input
                          v-model="formMail.phone"
                          class="form-control"
                          :class="{ 'is-invalid': formMail.errors.has('phone') }"
                          placeholder="رقم الهاتف"
                        >
                        <has-error :form="formMail" field="phone"></has-error>
                      </div>
                    </b-col>


                    <b-col cols="12">
                      <div class="form-group">
                        <textarea
                          v-model="formMail.message"
                          class="form-control auto-resize"
                          :data-height="140"
                          :class="{ 'is-invalid': formMail.errors.has('message') }"
                          placeholder="رسالتك"
                        ></textarea>
                        <has-error :form="formMail" field="message"></has-error>
                      </div>
                    </b-col>
                    <b-col cols="12">
                      <b-button block variant="warning" :disabled="formMail.busy" type="submit">
                        <span v-if="!formMail.busy">
                          إرسال
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
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </form>
          </div>

        </div>
        <!-- ============================================================================ -->

      </b-container>
    </div>

  </div>
</template>



<script>
export default {
  data() {
    return {
      imageHeader: '',
      formMail: new Form({
        name: '',
        email: '',
        phone: '',
        message: ''
      }),
      messageDoneSendMail: '',

      showLoadingBranches: true,
      branches: [],
      branchActive: ''
    }
  },

  methods: {
    showMap() {
      let scriptMap = document.createElement('script');
      const idMap = 'myScriptMap';
      const oldScript = document.getElementById(idMap)
      if (oldScript) {
        oldScript.parentNode.removeChild(oldScript)
      }
      document.body.appendChild(scriptMap);
      scriptMap.id = idMap;
      scriptMap.setAttribute('async', true);
      scriptMap.setAttribute('defer', true);
      scriptMap.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyADsFcbM6g-A_nUwh41pFn9EgDdlRC6lGY&language=ar&region=EG&callback=initMapCompany');
    },

    sendMail() {
      this.formMail.post('/contact_us').then(response => {
        const data = response.data
        if (response.status === 200) {
          if (typeof data === 'object') {
            if (data.status) {
              this.messageDoneSendMail = data.message
              this.formMail.reset()
            }
          }
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



    getBranches() {
      this.showLoadingBranches = true
      axios.get('/branches').then(response => {
        const data = response.data
        if (typeof data === 'object') {
          this.branches = data.branches
          this.showLoadingBranches = false
          this.showMap()
          this.showBranch(this.branches[0].id)
        } else {
          setTimeout(() => this.getBranches(), 500)
        }
      }).catch(error => {
        setTimeout(() => this.getBranches(), 500)
      })
    },


    showBranch(id) {
      if (this.branchActive == id) {
        this.branchActive = ''
      } else {
        this.branchActive = id
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.imageHeader = ''
      setTimeout(() => {
        this.imageHeader = this.$settings.contact_us_page_bg != null ? this.$domain + this.$settings.contact_us_page_bg : ''
        this.getBranches()
      })
      this.autoResizeTextArea()
    })
  }
}
</script>

