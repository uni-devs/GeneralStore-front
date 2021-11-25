<template>
  <div class="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
       style="background-image: url('/assets/images/backgrounds/login-bg.jpg')"
  >
    <div class="container">
      <div class="form-box">
        <div class="form-tab">
          <ul class="nav nav-pills nav-fill" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="register-tab-2" data-toggle="tab" href="#register-2" role="tab"
                 aria-controls="register-2" aria-selected="true"
              >
              <h1>  {{ $t('Register') }} </h1>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade show active" id="register-2" role="tabpanel" aria-labelledby="register-tab-2">
              <form @submit.prevent="register" action="#">
                <div class="form-group">
                  <label for="first_name">
                    {{ $t('First Name') }}
                  </label>
                  <input :class="{'is-invalid':errors['first_name']}" v-model="user.first_name" id="first_name"
                         type="text" class="form-control"
                  >
                  <small class="text-danger">{{ errors['first_name'] }}</small>
                </div>
                <div class="form-group">
                  <label for="last_name">
                    {{ $t('Last Name') }}
                  </label>
                  <input :class="{'is-invalid':errors['last_name']}" v-model="user.last_name" type="text" id="last_name"
                         class="form-control"
                  >
                  <small class="text-danger">{{ errors['last_name'] }}</small>
                </div>
                <div class="form-group">
                  <label for="phone">
                    {{ $t('Phone') }}
                  </label>
                  <input :class="{'is-invalid':errors['phone']}" v-model="user.phone" id="phone"
                         type="tel"
                         class="form-control"
                  >
                  <small class="text-danger">{{ errors['phone'] }}</small>
                </div>
                <div class="form-group">
                  <label for="password">
                    {{ $t('Password') }}
                  </label>
                  <input :class="{'is-invalid':errors['password']}" v-model="user.password" id="password"
                         type="password" class="form-control"
                  >
                  <small class="text-danger">{{ errors['password'] }}</small>
                </div>


                <div class="form-footer">
                  <button :disabled="loading" type="submit" class="btn btn-outline-primary-2">
                    <span>{{ $t('Register') }}</span>
                    <i class="icon-long-arrow-right"></i>
                  </button>
                </div><!-- End .form-footer -->
              </form>

              <div class="form-choice">
                <p class="text-center">أو التسجيل من خلال</p>
                <div class="row">
                  <div class="col-sm-6">
                    <a href="#" class="btn btn-login btn-g">
                      <i class="icon-google"></i>
                      التسجيل من خلال جوجل
                    </a>
                  </div><!-- End .col-6 -->
                  <div class="col-sm-6">
                    <a href="#" class="btn btn-login  btn-f">
                      <i class="icon-facebook-f"></i>
                      التسجيل من خلال فيس بوك
                    </a>
                  </div><!-- End .col-6 -->
                </div><!-- End .row -->
              </div><!-- End .form-choice -->

            </div><!-- .End .tab-pane -->
          </div><!-- End .tab-content -->
        </div><!-- End .form-tab -->
      </div><!-- End .form-box -->
    </div><!-- End .container -->
  </div>
</template>

<script>
import { ValidationMixin } from '~/mixins/validation'

export default {
  middleware: 'auth',
  auth: 'guest',
  name: 'signUp',
  mixins: [ValidationMixin],
  methods: {
    register: async function ()   {
      this.hasError = false;
      this.loading = true
      const validate = this.validate(this.user, this.rules)
      if (this.hasError) {
        this.loading = false
        return
      }
      /////// Just a code until i ask u youssef

      const validator = this.validatePhone()
      if(!validator.isValid){
        this.$swal.fire({
          title:this.$t('Missing data'),
          text:validator.message,
          icon:'warning'
        })
        this.loading = false
        return false;
      }

      //////////////////////////////////////



      try {
        const { data } = await this.$repo.Auth.register(this.user)
        if (data.status) {
          this.$auth.loginWith('laravelPassport', {
            data: {
              username: this.user.phone,
              password: this.user.password,
            }
          }).then(()=>{
            this.loading = false
            this.$router.push({name:'accountVerification'})
          }).catch(e => {
            console.log(e.message)
          })
        }
      } catch (e) {
        this.$swal.fire(this.$t("Something Went Wrong"),e.response.data.message,'error')
        this.loading = false
      }
    },
    validatePhone: function (){
      const validator = {
        isValid:true,
        message:''
      }
      if(this.user.phone[0]!=='0'||this.user.phone[1]!=='5'){
        validator.isValid = false
        validator.message = `${this.$t("phone number must start with")}05`
        return validator
      }
      if(this.user.phone.length!==10){
        validator.isValid = false
        validator.message = `${this.$t("phone number must be 10 digits")}`
        return validator
      }
      return validator
    },
  },
  head () {
    return {
      title: this.$t('Register')
    }
  },
  data () {
    return {
      user: {
        phone: null,
        first_name: null,
        last_name: null,
        password: null
      },
      rules: {
        first_name: {
          required: true
        },
        last_name: {
          required: true
        },
        phone: {
          required: true
        },
        password: {
          required: true,
          min: 6
        }

      },
      loading: false
    }
  },
}
</script>

<style>
@import "assets/scss/showHeader.scss";
</style>
