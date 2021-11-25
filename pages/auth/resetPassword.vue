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
                {{ $t("forgot your password") }} ؟
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="row">
              <div class="co mt-1">
                <h4 class="my-2 ">{{ $t("enter your phone number") }}</h4>
                <p >{{ $t("We will send you a verification code to reset password") }} .</p>
              </div>

            </div>
            <div class="row mt-2">
              <div class="input-group">

                <input v-model="phoneNumber" type="text" class="form-control" :placeholder='$t("your phone number")'  required>
                <button @click="sendCode" class="btn btn-outline-primary-2">{{ $t("send code") }}<i class="mdi mdi-email-send-outline"></i></button>
              </div>
<!--              <router-link :to="{name:'resetPasswordPhase2'}">sssssss</router-link>-->

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
      if(context.$auth.user){
        return context.redirect(context.from?context.from.path:'/')
      }
      return true
    },
  name: 'login',
  methods: {
    sendCode: async function (){
      const validator = this.validatePage()
      if(!validator.isValid){
        this.$swal.fire({
          title:this.$t('Missing data'),
          text:validator.message,
          icon:'warning',
          confirmButtonText:this.$t("OK")
        })
        return false;
      }
      try{
        const request = await this.$repo.Auth.sendResetPasswordOTP({phone:this.phoneNumber})
        this.$router.push({name:"resetPasswordPhase2", query:{phone:this.phoneNumber}}).then(()=>{
          this.$swal.fire({
            title:this.$t(request.data.message),
            toast:true,
            icon:"success",
            showConfirmButton:false,
            timer:2500,
            timerProgressBar:true,
            position:'top-start'
          })
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
      this.phoneNumber = ''
    },
    validatePage: function (){
      const validator = {
        isValid:true,
        message:''
      }
      if(!this.phoneNumber){
        validator.isValid = false
        validator.message = this.$t("phone number is required")
        return validator
      }
      if(this.phoneNumber[0]!=='0'||this.phoneNumber[1]!=='5'){
        validator.isValid = false
        validator.message = `${this.$t("phone number must start with")}05`
        return validator
      }
      if(this.phoneNumber.length!==10){
        validator.isValid = false
        validator.message = `${this.$t("phone number must be 10 digits")}`
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
  data () {
    return {
      phoneNumber:'',
      isSendPressed:false
    }
  },
  mounted() {
  }
}
</script>

<style>
@import "assets/scss/showHeader.scss";
</style>
