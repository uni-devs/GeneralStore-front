<template>
  <client-only>
    <div class="container ">
      <h4 class="title">{{title}}</h4>
          <div class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow">
            <ProductCard7 v-for="(product, index) in offers" :key="'offer'+index" :product="product" />
          </div><!-- End .owl-carousel -->
    </div>

  </client-only>
</template>

<script>
import ProductCard7 from '~/components/Elements/ProductCard7'
export default {
  name: 'ProductsSlider',
  components: { ProductCard7 },
  props:{
    isOffers:{
      type:Boolean
    },
    title:{
      type:String
    }
  },
  computed:{
    offers : function (){
      if(this.isOffers)
      return this.$store.state.products.offers
    }
  },
  mounted () {
    var owlSettings = {
      nav: false,
      navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
      dots: true,
      margin: 20,
      loop: false,
      rtl:true,
      touchDrag:true,
      responsive: {
        "0": {
          "items":1
        },
        "480": {
          "items":2
        },
        "768": {
          "items":3
        },
        "992": {
          "items":4
        },
        "1200": {
          "items":4,
          "nav": true,
          "dots": false
        }
      }
    };
    setTimeout(()=>{
      $(".owl-carousel").owlCarousel(owlSettings)
    },500)
  }
}
</script>

<style scoped>

</style>
