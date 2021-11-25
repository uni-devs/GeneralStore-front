<template>
  <div class="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
       style="background-image: url('/assets/images/backgrounds/login-bg.jpg')"
  >
    <div class="container">
      <div class="form-box">
        <div class="form-tab">
          <ul class="nav nav-pills nav-fill" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="signin-tab-2" data-toggle="tab" href="#signin-2" role="tab"
                 aria-controls="signin-2" aria-selected="false"
              >
              <h1>  {{ $t('Sign In') }} </h1>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade show active" id="signin-2" role="tabpanel" aria-labelledby="signin-tab-2">
              <form @submit.prevent="logIn" action="#">
                <div class="form-group">
                  <label for="login_username">
                    {{ $t('Phone') }}
                    *
                  </label>
                  <input v-model="user.username" type="tel" class="form-control"
                         id="login_username" name="username" required=""
                  >
                </div>

                <div class="form-group">
                  <label for="login_password">
                    {{ $t('Password') }} *
                  </label>
                  <input v-model="user.password" type="password" class="form-control"
                         id="login_password" name="password" required=""
                  >
                </div>

                <div class="form-footer">
                  <button type="submit" class="btn btn-outline-primary-2">
                    <span>{{ $t('Sign In') }}</span>
                    <i class="icon-long-arrow-right"></i>
                  </button>
                  <router-link :to="{name:'resetPassword'}" class="forgot-link">
                    {{ $t('Forgot Your Password ?') }}
                  </router-link>
                  <router-link :to="{name:'register'}" class="forgot-link">
                    {{ $t('Don\'t Have Account ?') }}
                  </router-link>
                </div><!-- End .form-footer -->
              </form>

<!--              <div class="form-choice">-->
<!--                <p class="text-center">او الدخول من خلال</p>-->
<!--                <div class="row">-->
<!--                  <div class="col-sm-6">-->
<!--                    <a href="#" class="btn btn-login btn-g">-->
<!--                      <i class="icon-google"></i>-->
<!--                      الدخول من خلال جوجل-->
<!--                    </a>-->
<!--                  </div>&lt;!&ndash; End .col-6 &ndash;&gt;-->
<!--                  <div class="col-sm-6">-->
<!--                    <a href="#" class="btn btn-login btn-f">-->
<!--                      <i class="icon-facebook-f"></i>-->
<!--                      الدخول من خلال الفيس بوك-->
<!--                    </a>-->
<!--                  </div>&lt;!&ndash; End .col-6 &ndash;&gt;-->
<!--                </div>&lt;!&ndash; End .row &ndash;&gt;-->
<!--              </div>&lt;!&ndash; End .form-choice &ndash;&gt;-->
            </div><!-- .End .tab-pane -->
          </div><!-- End .tab-content -->
        </div><!-- End .form-tab -->
      </div><!-- End .form-box -->
    </div><!-- End .container -->
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  name: 'login',
  methods: {
    logIn: function () {
      this.$auth.loginWith('laravelPassport', {
        data: {
          username: this.user.username,
          password: this.user.password,
          client_secret: process.env.CLIENT_SECRET,

        }
      }).catch(e => {
        this.$swal.fire(this.$t("Something Went Wrong"),e.response.data.message ?? "","error")
      })
    }
  },
  head () {
    return {
      title: this.$t('Sign In')
    }
  },
  data () {
    return {
      user: {
        username: null,
        password: null
      }
    }
  }
}
</script>

<style>
@import "assets/scss/showHeader.scss";
</style>
