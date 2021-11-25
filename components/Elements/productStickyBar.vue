<template>
<div id="ProductStickyBar">

  <div class="sticky-bar">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <figure class="product-media">
            <a href="#">
              <img v-if="product.colors[selectedColor].image" :src="product.colors[selectedColor].image" alt="product image">
              <img v-else src="/assets/images/meem/defaultProductPicture.jpg" alt="product image">

            </a>
          </figure><!-- End .product-media -->
          <h4 class="product-title"><a href="product.html">{{ product.name }}</a></h4><!-- End .product-title -->
        </div><!-- End .col-6 -->

        <div class="col-6 justify-content-end">
          <div class="product-price">
            {{product.price}} {{$t("EGP")}}
          </div><!-- End .product-price -->
          <div class="product-details-quantity">
            <input type="number" id="stickyBar-qty" class="form-control" value="1" min="1"
                   :max="maxQty" step="1" data-decimals="0" required @change="selectedQty = $event.target.value">
          </div><!-- End .product-details-quantity -->

          <div class="product-details-action">
            <a href="#" class="btn-product btn-cart"><span>{{ $t("add to cart") }}</span></a>
          </div><!-- End .product-details-action -->
        </div><!-- End .col-6 -->
      </div><!-- End .row -->
    </div><!-- End .container -->
  </div><!-- End .sticky-bar -->

</div>
</template>

<script>
export default {
  name: "productStickyBar",
  props:{
    product:{
      type:Object
    },
    selectedSize:{},
    selectedQty:{},
    selectedColor:{},
    selectedImage:{}
  },
  computed:{
    maxQty: function (){
      return this.selectedSize==='#'?10:this.product.colors[this.selectedColor].sizes[this.selectedSize].qty
    }
  }
}
</script>

<style scoped>

</style>
