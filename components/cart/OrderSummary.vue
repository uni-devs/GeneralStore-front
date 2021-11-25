<template>
<div id="OrderSummary">

  <div class="summary">
    <h3 class="summary-title">{{ $t("Your Order") }}</h3><!-- End .summary-title -->

    <table class="table table-summary">
      <thead>
      <tr>
        <th>{{ $t("Product") }}</th>
        <th>{{ $t("Total") }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="product in cartProducts">
        <td><router-link :to="{name:'singleView', params:{id:product.product_id}}">{{product.product_json.name}}</router-link></td>
        <td>{{product.price}}  ₪</td>
      </tr>

      <tr class="summary-subtotal">
        <td>{{ $t("Total Products") }}:</td>
        <td>{{ totalInCart }} ₪</td>
      </tr><!-- End .summary-subtotal -->
      <tr>
        <td>{{ $t("Shipping") }}:</td>
        <td>
          <span v-if="shippingCost===0 && shippingAddress" style="  color: #11c62a;" class="mx-1">({{$t("free shipping")}})</span>
          {{ shippingCost }} ₪</td>
      </tr>
      <tr>
        <td>{{ $t("promo code") }}:</td>
        <td>{{ discount }} ₪</td>
      </tr>
      <tr class="summary-total">
        <td>{{ $t("Total") }}:</td>
        <td>{{total }} ₪</td>
      </tr><!-- End .summary-total -->
      </tbody>
    </table><!-- End .table table-summary -->

    <div class="accordion-summary " id="accordion-payment">

      <div class="card" v-for="(payment,index) in paymentMethods">
        <div class="card-header" :id="`heading-${index}payment`">
          <h2 class="card-title">
            <a :class="{collapsed:index!==0}" role="button" data-toggle="collapse" :href="`#collapse-${index}payment`"
               aria-expanded="false" :aria-controls="`collapse-${index}payment`" @click="selectedPaymentMethod = index">
              {{$t(payment)}}
            </a>
          </h2>
        </div><!-- End .card-header -->
        <div :id="`collapse-${index}payment`" class="collapse" :class="{show:index===0}" :aria-labelledby="`heading-${index}payment`" data-parent="#accordion-payment">
          <div class="card-body">
            {{$t(payment)}}.
          </div><!-- End .card-body -->
        </div><!-- End .collapse -->
      </div><!-- End .card -->

<!--      <div class="card">-->
<!--        <div class="card-header" id="heading-4">-->
<!--          <h2 class="card-title">-->
<!--            <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-4" aria-expanded="false" aria-controls="collapse-4">-->
<!--              PayPal <small class="float-right paypal-link">What is PayPal?</small>-->
<!--            </a>-->
<!--          </h2>-->
<!--        </div>&lt;!&ndash; End .card-header &ndash;&gt;-->
<!--        <div id="collapse-4" class="collapse" aria-labelledby="heading-4" data-parent="#accordion-payment">-->
<!--          <div class="card-body">-->
<!--            Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.-->
<!--          </div>&lt;!&ndash; End .card-body &ndash;&gt;-->
<!--        </div>&lt;!&ndash; End .collapse &ndash;&gt;-->
<!--      </div>&lt;!&ndash; End .card &ndash;&gt;-->

<!--      <div class="card">-->
<!--        <div class="card-header" id="heading-5">-->
<!--          <h2 class="card-title">-->
<!--            <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-5" aria-expanded="false" aria-controls="collapse-5">-->
<!--              Credit Card (Stripe)-->
<!--              <img src="assets/images/payments-summary.png" alt="payments cards">-->
<!--            </a>-->
<!--          </h2>-->
<!--        </div>&lt;!&ndash; End .card-header &ndash;&gt;-->
<!--        <div id="collapse-5" class="collapse" aria-labelledby="heading-5" data-parent="#accordion-payment">-->
<!--          <div class="card-body"> Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit ame.-->
<!--          </div>&lt;!&ndash; End .card-body &ndash;&gt;-->
<!--        </div>&lt;!&ndash; End .collapse &ndash;&gt;-->
<!--      </div>&lt;!&ndash; End .card &ndash;&gt;-->
    </div><!-- End .accordion -->

    <button type="submit" class="btn btn-outline-primary-2 btn-order btn-block" @click.prevent="placeOrder">
      <span class="btn-text">{{ $t("Place Order") }}</span>
      <span class="btn-hover-text ">{{ $t("Order") }} <span class="icon-arrow-left"></span></span>
    </button>
  </div><!-- End .summary -->

</div>
</template>

<script>
export default {
  name: "OrderSummary",
  data(){
    return{
      selectedPaymentMethod:0,
    }
  },
  methods:{
    placeOrder: async function (){
      const validator = this.validatePage()
      if(!validator.isValid){
        this.$swal.fire({
          title:this.$t('Missing data'),
          text:validator.message,
          icon:'warning'
        })
        return false;
      }
      const order = {
        address_id:this.shippingAddress.id,
        payment_method:this.paymentMethods[this.selectedPaymentMethod],
        shipping_method:this.shippingCost===0?this.$store.state.generals.ordersInfo.shipping_methods.free:this.$store.state.generals.ordersInfo.shipping_methods.standard,
        items:this.cartProductsRefactor,
        promo_code: this.$store.state.cart.promoCode.code
      }
      try {
        await this.$repo.Orders.makeOreder(order)
      }catch (err){
        this.$swal.fire({
          title:this.$t("Operation Failed"),
          text:err.response.data.message,
          icon:'error'
        })
        return false
      }
        this.$store.commit('emptyCart')
        this.$store.commit('deletePromoCode')
        await this.$router.push({name: 'orderDone'}).then(()=>{
          let page = 1, perPage = 9
          try{
            const products =  $repo.Products.getAll(perPage, page)
            if(products.data.data.length) page++
            this.$store.commit('initProducts', products.data)
          }catch (err){
            console.log("error in order summary products loading ")
            console.log(err)
            return false
          }
        })

    },
    validatePage: function (){
      const validator = {
        isValid:true,
        message:''
      }
      if(!this.shippingAddress){
        validator.isValid = false
        validator.message = this.$t("please choose the address")
        return validator
      }

      const addressIdx = this.$store.state.generals.addresses.findIndex(address => address.id === this.shippingAddress.id)
       if(!addressIdx && addressIdx!==0)
       {
         validator.isValid = false
         validator.message = this.$t("please choose a valid Address")

         return validator
       }
         if(this.cartProducts.length===0){
        validator.isValid = false
        validator.message = this.$t("there are no products in you cart")
      }
      // there are more validations here for the selected payment method + shipping method @TODO when these features added
      return validator
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
    shippingCost: function (){
      if(this.shippingAddress)
      return this.totalInCart >= this.$store.state.generals.ordersInfo.min_free_shipping? 0 : this.shippingAddress.shipping_fees

      return 0
    },
    cartProductsRefactor: function (){
      return this.$store.state.cart.products.map(p=>{
        return{
          product_id:p.product_id,
          qty:p.qty,
          color:p.color, // color id
          size:p.size
        }
      })
    },
    discount: function (){
      return this.$store.state.cart.promoCode.discount_type === 'percent'? (this.$store.state.cart.promoCode.discount.toString() +'%') : this.$store.state.cart.promoCode.discount
    },
    total: function (){
      let discount = 0
      if(this.$store.state.cart.promoCode.discount_type === 'amount'){
        discount = this.$store.state.cart.promoCode.discount
      }else if(this.$store.state.cart.promoCode.discount_type === 'percent'){
        discount = ((this.$store.state.cart.promoCode.discount/100) * this.totalInCart)
      }
      return ((this.totalInCart - (discount) <0?0:this.totalInCart - (discount)) + this.shippingCost)
    },
    paymentMethods: function (){
      return this.$store.state.generals.ordersInfo.payment_methods
    },
    shippingAddress: function (){
      return this.$store.state.generals.addresses[this.shippingAddressIdx]
    }
  },
  props:{
    shippingAddressIdx:{
      type:Number
    }
  }
}
</script>

<style scoped>

</style>
