<template>
<div id="CartMenuProductElement">

  <div class="product">
    <div class="product-cart-details">
      <h4 class="product-title">
        <router-link :to="{name:'singleView', params:{id:product.product_id}}">{{product.product_json.name}}</router-link>
      </h4>

      <span class="cart-product-info">
        <span class="cart-product-qty"><b>{{product.qty}}</b></span>
          × {{product.price}} ₪
        </span>
      <br/>
      <span class="cart-product-size">
         {{$t("the size")}} {{product.size}}
      </span>
    </div><!-- End .product-cart-details -->

    <figure class="product-image-container">
      <router-link :to="{name:'singleView', params:{id:product.product_id}}"
                   class="product-image">
        <img v-if="product.product_json.colors[product.selected_color_index].image" :src="product.product_json.colors[product.selected_color_index].image" alt="product">
        <img v-else src="/assets/images/meem/defaultProductPicture.jpg" alt="product">
      </router-link>
    </figure>
    <a href="javascript:void(0)" @click="removeProduct" class="btn-remove" title="Remove Product"><i class="icon-close"></i></a>
  </div><!-- End .product -->


</div>
</template>

<script>
export default {
  name: "CartMenuProduct",
  props:{
    product:{
      type:Object
    }
  },
  methods:{
    removeProduct: function (){
      this.$store.commit('removeProductFromCart', this.product.product_id)
      this.$swal.fire({
        toast:true,
        title:this.$t("Product Removed"),
        icon:"success",
        position:'top-start',
        showConfirmButton:false,
        timer:2000,
        timerProgressBar:true,
        width:250
      })

    }
  }
}
</script>

<style scoped>

</style>
