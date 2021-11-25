<template>
  <div id="CartPage">
    <div class="page-header text-center" style="background-image: url(/assets/images/page-header-bg.jpg)">
      <div class="container">
        <h1 class="page-title">{{ $t("Shopping Cart") }}</h1>
      </div><!-- End .container -->
    </div><!-- End .page-header -->

    <div class="page-content">
      <div class="cart">
        <div class="container">
          <div class="row mt-2">
            <div class="col-lg-9">

              <CartProductsTable></CartProductsTable>

              <div class="cart-bottom">

<!--                <a href="#" class="btn btn-outline-dark-2"><span>UPDATE CART</span><i class="icon-refresh"></i></a>-->
              </div><!-- End .cart-bottom -->
            </div><!-- End .col-lg-9 -->
            <aside class="col-lg-3">

              <cart-summary></cart-summary>

              <router-link :to="{name:'shop'}" class="btn btn-outline-dark-2 btn-block my-1"><span>{{ $t("CONTINUE SHOPPING") }}</span><i class="icon-refresh"></i></router-link>
              <button @click.prevent="emptyCart" class="btn btn-outline-danger btn-block mdi mdi-trash-can"> {{ $t("Empty cart") }}</button>
            </aside><!-- End .col-lg-3 -->
          </div><!-- End .row -->
        </div><!-- End .container -->
      </div><!-- End .cart -->
    </div><!-- End .page-content -->
<!--    <button @click="tets">sssssssssssssssss</button>-->
<!--    <button @click="tetsGet">gggggggggggggg</button>-->
  </div><!-- End .main -->

</template>

<script>
import CartProductsTable from "~/components/cart/CartProductsTable";
import CartSummary from "~/components/cart/CartSummary";
export default {
  name: "cart",
  components: {CartSummary, CartProductsTable},
  async asyncData({$repo, store}){

  },
  methods:{
    emptyCart: function (){
      if(this.$store.state.cart.products.length ===0){
        this.$swal.fire({
          title:this.$t("cart is already empty"),
          icon:"warning",
        })
        return
      }
      this.$store.commit('emptyCart')
      this.$store.commit('deletePromoCode')
      this.$swal.fire({
        toast:true,
        title:this.$t("cart has been emptied"),
        icon:"success",
        position:'top-start',
        showConfirmButton:false,
        timer:2000,
        timerProgressBar:true,
        width:250
      })
    },
    tets: async function(){
      const cart = this.$store.state.cart.products
      await this.$repo.User.cartSync({cart:cart})
    },
    tetsGet: async function(){
      const cart = await this.$repo.User.getCart()
      console.log(cart)
    }
  }
}
</script>

<style>
.header-11 {
  position: relative !important;
  background: #333;
}
.header .container {
  height: 86px;
}
</style>
