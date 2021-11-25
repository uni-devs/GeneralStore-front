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
                {{ $t("password reset") }}
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="row">
              <div class="co mt-1">
                <h5 class="my-2 ">{{ $t("we have sent a code to ") }} {{phone }}</h5>
                <p >{{ $t("enter the sent code and the new password") }} .</p>
              </div>

            </div>
            <div class="row mt-2">
              <div class="col">
                <div class="input-group">
                  <input v-model="otpCode" type="text" class="form-control" :placeholder='$t("enter the code")'  required>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <div class="input-group">
                  <input v-model="password" type="password" class="form-control" :placeholder='$t("enter the new password")'  required>
                </div>
              </div>

            </div>
            <div class="row mt-2">
              <div class="col">
                <button @click="changePassword" class="btn btn-primary w-100 h-100">{{ $t("change Password") }} <i class="mdi mdi-check-circle"></i></button>

              </div>
            </div>



          </div><!-- End .tab-content -->
        </div><!-- End .form-tab -->
      </div><!-- End .form-box -->
    </div><!-- End .container -->
  </div>
</template>

<script>
import login from "~/pages/auth/login";

export default {
  middleware: function (context){
      if(context.$auth.user || (context.from&&(context.from.name!=='resetPassword')) || !context.from){
        return context.redirect(context.from?context.from.path:'/')
      }
      return true
    },
  name: 'login',
  methods: {
    changePassword: async function (){
      const validator = await this.validatePage()
      if(!validator.isValid){
        this.$swal.fire({
          title:validator.title,
          text:validator.message,
          icon:'warning',
          confirmButtonText:this.$t("OK")
        })
        return false;
      }
      try{
        await this.$repo.Auth.applyNewPassword(this.phone, this.otpCode, this.password)
        this.$swal.fire({
          title:this.$t("Password has been changed successfully"),
          icon:"success",
          confirmButtonText:this.$t("Log In")
        }).then(res=>{
          if(res.isConfirmed){
            this.$router.push({name:"login"})
          }
          if(res.isCanceled){
            this.$router.push({name:'home'})
          }
          this.resetForm()
        })
      }catch (err){
        this.$swal.fire({
          title:this.$t("Operation Failed"),
          text:err.response.data.message,
          icon:'error'
        })
        return false
      }

    },
    resetForm: function (){
      this.password = ''
      this.otpCode = ''
    },
    validatePage: async function (){
      const validator = {
        isValid:true,
        message:'',
        title:''
      }
      if(!this.otpCode){
        validator.isValid = false
        validator.message = this.$t("verification code is required")
        validator.title = this.$t("Missing data")
        return validator
      }
      if(!this.password){
        validator.isValid = false
        validator.message = this.$t("password is required")
        validator.title = this.$t("Missing data")
        return validator
      }
      try{
        await this.$repo.Auth.checkOTP(this.phone, this.otpCode)
      }catch (err){
        validator.title = this.$t("Operation Failed")
        validator.isValid = false
        validator.message = err.response.data.message
        return validator
      }
      return validator
    }
  },
  head () {
    return {
      title: this.$t('password reset')
    }
  },
  computed:{
    phone: function (){
      return this.$route.query.phone
    }
  },
  data () {
    return {
      otpCode:'',
      password:''
    }
  },
  mounted() {
  }
}
</script>

<style>
@import "assets/scss/showHeader.scss";
</style>
