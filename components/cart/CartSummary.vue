<template>
<div id="CartSummaryElement">
  <div class="summary summary-cart">
    <h3 class="summary-title">{{ $t("Cart Total") }}</h3><!-- End .summary-title -->

    <table class="table table-summary">
      <tbody>
      <tr class="summary-title">
        <td>{{$t("products in cart")}}:</td>
        <td>{{ totalInCart }} ₪</td>
      </tr>
      <tr class="summary-title">
        <td > <div class="text-left my-2">{{$t("promo code")}}:</div>
          <div class="row my-2 ml-4">
            <div class="col-md-11">

              <div class="row ml-1">
                {{$t("the coupon")}} : {{ $t(!cartPromoCode.code?'No promo code':cartPromoCode.code) }}
              </div>
              <div class="row ml-1 mb-1">
                {{$t("the discount amount")}} : {{ cartPromoCode.discount }} {{cartPromoCode.discount_type==='percent'?'%':'₪'}}
              </div>
            </div>

          </div>

        </td>
        <td class="justify-content-center">
            <a href="#!" @click="deletePromoCode" class="btn-remove"
               :title="$t('Delete promo code')" :class="{inactiveLink :!cartPromoCode.code}"><i class="icon-close"></i></a>
        </td>
      </tr>
      <tr class="summary-total">
        <td>{{ $t("Total") }}:</td>
        <td>{{ totalWithPromo }} ₪</td>
      </tr><!-- End .summary-total -->
      </tbody>
    </table><!-- End .table table-summary -->
    <div class="my-3">
      <div class="cart-discount">
        <form action="#">
          <div class="input-group">
            <input type="text" class="form-control" required :placeholder="$t('promo code')" v-model="promoCode">
            <div class="input-group-append">
              <button class="btn btn-outline-primary-2" type="submit" @click.prevent="checkPromoCode"
              ><i class="icon-long-arrow-left"></i></button>
            </div><!-- .End .input-group-append -->
          </div><!-- End .input-group -->
        </form>
      </div><!-- End .cart-discount -->
    </div>
    <button @click="checkoutRouting" class="btn btn-outline-primary-2 btn-order btn-block">{{ $t("PROCEED TO CHECKOUT") }}</button>
  </div><!-- End .summary -->
</div>
</template>

<script>
import login from "~/pages/auth/login";

export default {
  name: "CartSummary",
  data(){
    return{
      shipping:0,
      promoCode:''
    }
  },
  methods:{
    checkPromoCode: async function (){
      const validator = this.validatePromoCode()
      if(!validator.isValid){
        this.$swal.fire({
          title:this.$t('Missing data'),
          text:validator.message,
          icon:'warning'
        })
        return false;
      }
      let promoCode
      try{
         promoCode = await this.$repo.Orders.promoCodeCheck({code:this.promoCode})
      }catch (err){
        this.$swal.fire({
          toast:true,
          title:this.$t(err.response.data.message),
          icon:"info",
          position:'top-start',
          showConfirmButton:false,
          timer:2000,
          timerProgressBar:true,
          width:250
        })
        return false;
      }
      this.$store.commit('setPromoCode', promoCode.data.data)
      this.$swal.fire({
        toast:true,
        title:this.$t("Promo code added successfully"),
        icon:"success",
        position:'top-start',
        showConfirmButton:false,
        timer:2000,
        timerProgressBar:true,
        width:250
      })
      this.resetForm()
    },
    checkoutRouting: function (){
      const validator = this.validatePage()
      if(!validator.isValid){
        this.$swal.fire({
          title:this.$t('Missing data'),
          text:validator.message,
          icon:'warning'
        })
        return false;
      }
      this.$router.push({name:'checkout'})
    },
    validatePromoCode: function (){
      const validator = {
        isValid: true,
        message:''
      }
      if(this.promoCode.length===0 ){
        validator.isValid = false
        validator.message = `${this.$t("promo code")} ${this.$t("is required")}`
        return validator
      }
      if(this.cartProducts.length===0 ){
        validator.isValid = false
        validator.message = `${this.$t("you can't add promo code because your cart is empty")}`
        return validator
      }
      return validator
    },
    validatePage: function (){
      const validator = {
        isValid: true,
        message:''
      }
      if(this.cartProducts.length===0){
        validator.isValid = false
        validator.message = `${this.$t("there are no products in you cart")}`
        return validator
      }
      if(!this.$auth.user.verified){
        validator.isValid = false
        validator.message = `${this.$t("your account is not verified, please verify the account to checkout")}`
        return validator
      }
      return validator
    },
    resetForm: function (){
      this.promoCode = ''
    },
    deletePromoCode: function (){
      this.$store.commit('deletePromoCode')
      this.resetForm()
      this.$swal.fire({
        toast:true,
        title:this.$t("promo code deleted"),
        icon:"success",
        position:'top-start',
        showConfirmButton:false,
        timer:2000,
        timerProgressBar:true,
        width:250
      })
    }
  },
  computed:{
    cartProducts: function (){
      return this.$store.state.cart.products
    },
    totalInCart: function (){
      let sum = 0
      for(let i=0,arr=this.$store.state.cart.products;i<arr.length;i++){
        sum += (Number(arr[i].qty) * arr[i].price)
      }
      return sum
    },
    cartPromoCode: function (){
      return this.$store.state.cart.promoCode
    },
    totalWithPromo: function (){
      let discount = 0
      if(this.$store.state.cart.promoCode.discount_type === 'amount'){
        discount = this.$store.state.cart.promoCode.discount
      }else if(this.$store.state.cart.promoCode.discount_type === 'percent'){
        discount = ((this.$store.state.cart.promoCode.discount/100) * this.totalInCart)
      }
      return this.totalInCart - (discount) <0?0:this.totalInCart - (discount)
    }
  }
}
</script>

<style scoped>

.inactiveLink{
  pointer-events: none;
  cursor: default;
  color: #c4c4c4!important;
}
</style>
