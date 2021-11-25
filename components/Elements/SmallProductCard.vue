<template>
  <div class="product product-sm my-2" >
    <figure class="product-media">
      <router-link :to="{name:'singleView', params:{id:product.id}}">
        <img v-if="product.colors[0].image" :src="product.colors[0].image" alt="Product image" class="product-image">
        <img v-else src="/assets/images/meem/defaultProductPicture.jpg" alt="Product image" class="product-image">
      </router-link>
    </figure>

    <div class="product-body">
      <div class="product-cat">
        <router-link :to="{name:'shop', query:{category:product.category}}">{{ product.category.name }}</router-link>
      </div><!-- End .product-cat -->
      <h5 class="product-title"><router-link :to="{name:'singleView', params:{id:product.id}}">{{ product.name }}</router-link></h5><!-- End .product-title -->
      <div class="product-price" v-if="product.discount">
        <span class="new-price">{{$t("Now")}} {{ product.discount.price }} ₪</span>
        <span class="old-price">{{ $t("Was") }} {{product.price}} ₪</span>
      </div><!-- End .product-price -->
      <div class="product-price" v-else>
        {{product.price}} ₪
      </div><!-- End .product-price -->
    </div><!-- End .product-body -->
  </div><!-- End .product product-sm -->

</template>

<script>
export default {
  name: "SmallProductCard",
  props:{
    product:{
      type:Object
    },
  },
}
</script>

<style scoped>

</style>
