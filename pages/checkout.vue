<template>
<div id="CheckoutPage">
  <div class="page-header text-center" style="background-image: url('/assets/images/page-header-bg.jpg')">
    <div class="container">
      <h1 class="page-title">{{ $t("Checkout") }}</h1>
    </div><!-- End .container -->
  </div><!-- End .page-header -->

  <div class="page-content">
    <div class="checkout">
      <div class="container">
        <form action="#">
          <div class="row mt-3">
            <div class="col-lg-9">
              <addresses-tab :selectable="true" v-on:AddressSelected="selectAddress($event)"></addresses-tab>
            </div><!-- End .col-lg-9 -->
            <aside class="col-lg-3">
              <order-summary :shippingAddressIdx="selectedAddress"></order-summary>
            </aside><!-- End .col-lg-3 -->
          </div><!-- End .row -->
        </form>
      </div><!-- End .container -->
    </div><!-- End .checkout -->
  </div><!-- End .page-content -->
</div>
</template>

<script>
import AddressesTab from "~/components/account/AddressesTab";
import OrderSummary from "~/components/cart/OrderSummary";
export default {
  name: "checkout",
  middleware: [
    'auth',
    function (context){
      if(context.store.state.cart.products.length<=0){

        context.redirect(context.from?context.from.path:'/')
        return  context.$swal?context.$swal.fire({
          title:'بيانات مفقوده',
          text:`لا توجد أية منتجات في العربة الخاصة بك`,
          icon:'warning'
        }):false
      }

      if(!context.$auth.user.verified){
        context.redirect(context.from?context.from.path:'/')
        return context.$swal?context.$swal.fire({
          title:'خطأ بالحساب',
          text:`حسابك غير مفعل ، رجاءًا فعل حسابك لاستكمال عملية الشراء`,
          icon:'warning'
        }):false
      }



      return true
    }
  ],
  auth:'user',
  components: {OrderSummary,  AddressesTab},
  async asyncData({store, $repo}){
    try{
      const states = await $repo.General.getStates()
      store.commit('initStates', states.data.data)
      const addresses = await $repo.User.getAllAddresses()
      store.commit('initAddresses', addresses.data.data)
    }catch (err) {
      console.log("error in asyncData checkOut")
      console.log(err)
      return false
    }
  },
  data(){
    return{
      selectedAddress:0
    }
  },
  methods:{
    selectAddress:function (addressIdx){
      this.selectedAddress = addressIdx
    }
  }
}
</script>

<style >
.header-11 {
  position: relative !important;
  background: #333;
}
.header .container {
  height: 86px;
}
</style>
