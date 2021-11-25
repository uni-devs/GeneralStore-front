<template>
  <div class="product product-4">
    <figure class="product-media">
      <router-link :to="{name:'singleView',params:{id:product.id}}">
<!--        <span v-if="product.new" class="product-label label-new">{{ $t("New") }}</span>-->
        <span v-if="product.discount || product.offer" class=" product-label label-sale">{{ $t("Sale") }}</span>
<!--        <span v-if="product.top" class="product-label label-top">{{ $t("Top") }}</span>-->
        <span v-if="isOutOfStock" class=" product-label label-out">{{ $t("Out of Stock") }}</span>

        <img v-if="productHasNoImages" src="/assets/images/meem/defaultProductPicture.jpg"
             :class="{'disabled-img':isOutOfStock}" alt="Product image" class="product-image">
        <div  v-else>
          <img :src="product.colors[productColorIndex].image"
               :class="{'disabled-img':isOutOfStock}" alt="Product image" class="product-image fade-in">
          <img :src="product.images[0] || product.colors[hoverImage].image"
               :class="{'disabled-img':isOutOfStock}" alt="Product image" class="product-image-hover">
        </div>
      </router-link>

      <div class="product-action">
        <router-link :to="{name:'singleView', params:{id:product.id}}" class="btn-product "><span class="mdi mdi-dots-horizontal-circle"> {{ $t("Show Details") }}</span></router-link>
      </div><!-- End .product-action -->
    </figure><!-- End .product-media -->
    <div class="product-body">
      <div class="product-cat" v-if="product.category">
        <router-link :to='`/shop?category=${product.category.id}`' >{{product.category.name}}</router-link>
      </div><!-- End .product-cat -->

      <div class="product-cat" v-else>
        <router-link :to='`/shop?category=${null}`' >{{ $t("Uncategorized") }}</router-link>
      </div><!-- End .product-cat -->

      <div class="product-cat">
        <span>{{ $t("Tags") }}:</span>
        <router-link v-for="(tag, index) in product.tags" :to='`/shop?tag=${encodeURI(tag)}`' :key="tag+index">
          {{ tag }},
        </router-link>

      </div><!-- End .product-cat -->

      <h3 class="product-title">
        <router-link :to="{name:'singleView',params:{id:product.id}}">{{product.name}}</router-link>
      </h3><!-- End .product-title -->

      <div v-if="product.discount" class="product-price">
        <span class="new-price"><b>{{ $t("Now") }} {{product.discount.price}} ₪</b></span>
        <span class="old-price">{{ $t("Was") }} {{product.price}} ₪</span>
      </div>
      <div class="product-price" v-else>
        {{product.price}} ₪
      </div><!-- End .product-price -->

<!--      <div class="product-price" v-if="product.offer">-->
<!--        {{$t("get")}} {{product.offer.amount}} {{$t("forOffer")}} {{product.offer.price}} ₪ {{$t("instead of")}} {{ product.offer.amount * (product.discount?product.discount.price:product.price)}} ₪-->
<!--      </div>&lt;!&ndash; End .product-price &ndash;&gt;-->

      <div class="product-nav product-nav-dots mx-1">
        <a v-for="(color, index) in product.colors"
           :class="{active:index===colorIndex}"
           :style="`background: ${color.hexCode};`"
          disabled="disabled"
           @click="colorIndex = index"
           :title="color.name"
        ></a>

      </div>

    </div><!-- End .product-body -->
  </div><!-- End .product -->
</template>

<script>
import Vue from 'vue'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type:Object
    }
  },
  methods:{
    test:function (){


    },

    getPrice: function (){
      return this.product.discount? this.product.discount.price:this.product.price
    },

  },
  computed:{
    isOutOfStock: function (){
      for(let i=0, arr=this.product.colors[this.colorIndex].sizes;i<arr.length;i++){
        if(typeof arr[i].qty==='string'){
          if(arr[i].qty!=='0')return false
        }else{
          if(arr[i].qty!== 0)return false

        }
      }
      return true
    },
    productHasNoImages: function (){
      for(let i=0, arr = this.product.colors; i<arr.length;i++){
        if(arr[i].image) return false;
      }
      return true
    },
    productColorIndex: function (){
      if(this.colorIndex>0) return this.colorIndex
      for(let i=0, arr = this.product.colors; i<arr.length;i++){
        if(arr[i].image){
          this.colorIndex = i
          return i
        }
      }
    },
    maxQty: function (){
      return this.product.colors[this.colorIndex].sizes[0].qty
    },
    hoverImage: function (){
      if(this.productColorIndex+1 < this.product.colors.length)
        return this.productColorIndex+1
      if(this.productColorIndex-1 >= 0)
        return this.productColorIndex-1
      return this.productColorIndex
    }
  },
  data(){
    return{
      colorIndex : 0,
    }
  },
}
</script>

<style >
@media screen and (max-width: 480px){
  .product-action{
    visibility: visible !important;
    opacity: 1!important;
    transform: translateY(0) !important;
  }
}

.disabled-img{
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
}

</style>
