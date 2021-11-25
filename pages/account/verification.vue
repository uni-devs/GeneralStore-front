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
                {{ $t("Just 1 step away") }}
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="row">
              <div class="co mt-1">
                <h4 class="my-2 ">{{ $t("Verify your account now") }}</h4>
                <p >{{ $t("We will send you a verification code on") }} {{$auth.user.phone}} .</p>
              </div>

            </div>
            <div class="row mt-2">
              <div class="input-group">

                <input v-model="verificationCode" type="text" class="form-control" :placeholder='$t("enter the code")+"..."'  required>
                <button @click="submitCode" class="btn btn-outline-primary-2"><i class="mdi mdi-check"></i>{{ $t("Submit Code") }}</button>
              </div>
            </div>
            <div class="row mt-2">
              <button @click="sendCode" class="btn btn-link" :class="{disabled: isSendPressed}">
                {{ $t("Send Code") }}<i class="mdi mdi-arrow-left"></i></button>
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
  middleware: [
    'auth',
    function (context){
      if(context.$auth.user.verified){
        context.redirect(context.from?context.from.path:'/')
        return context.$swal?context.$swal.fire({
          title:'الحساب مفعل بالفعل',
          icon:'warning',
          toast:true,
          showConfirmButton:false,
          timer:2000,
          timerProgressBar:true,
          position:"top-start"
        }):false
      }
      return true
    }
  ],
  auth: 'user',
  name: 'login',
  methods: {
    sendCode: async function (){
      if(this.isSendPressed) return
      this.isSendPressed = true
      try{
      const request = await this.$repo.User.sendOTP()

        const remainingTime = request.data.data.remaining_time
        const text = remainingTime?
          this.$t("try again after") + ' : ' +remainingTime.split(' ')[0] + this.$t("minutes") :''
        this.$swal.fire({
          title:this.$t(request.data.message),
          text:text,
          toast:true,
          showConfirmButton:false,
          icon:"success",
          timer:2000,
          timerProgressBar:true,
          position:'top-start'
        })
      }catch (err){
        this.$swal.fire({
          title:this.$t("Operation Failed"),
          icon:'error'
        })
        console.log(err)
        return false
      }

      setTimeout(()=>{this.isSendPressed = false}, 300000)
    },
    submitCode: async function (){
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
        const request = await this.$repo.User.verifyOTP({otp:this.verificationCode})
        const isAccountVerified = request.data.message === 'ACCOUNT_VERIFIED' || request.data.message==='ACCOUNT_ALREADY_VERIFIED';
        this.$swal.fire({
          title:this.$t(request.data.message),
          text:isAccountVerified?this.$t("you will be redirected to home page"):'',
          icon:"success",
          showConfirmButton:false,
          timer:6000,
          timerProgressBar:true,
        }).then(()=>{
          if(isAccountVerified)
           this.$router.push({name:'home'})
        })
        await this.$auth.fetchUser()
      }catch (err){
        this.$swal.fire({
          title:this.$t("Operation Failed"),
          text:err.response.data.message,
          icon:'error'
        })
        return false
      }
      this.resetForm()
    },
    resetForm: function (){
      this.verificationCode = ''
    },
    validatePage: function (){
      const validator = {
        isValid:true,
        message:''
      }
      if(!this.verificationCode){
        validator.isValid = false
        validator.message = this.$t("verification code is required")
        return validator
      }

      return validator
    }
  },
  head () {
    return {
      title: this.$t('account verification')
    }
  },
  data () {
    return {
      verificationCode:'',
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
