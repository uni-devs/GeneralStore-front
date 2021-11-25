<template>
  <div id="shopPage">
    <div class="page-header text-center" style="background-image: url('/assets/images/backgrounds/cta/bg-7.jpg')">
      <div class="container">
        <h1 class="shop-page-title">{{ $t("search results") }} {{$t("for")}} "{{$route.query.search}}"</h1>
      </div><!-- End .container -->
    </div><!-- End .page-header -->

    <div class="page-content">
      <div class="container">
        <div class="row mt-2">
          <div class="col-lg-12">

<!--            <div class="toolbox">-->
<!--              <div class="toolbox-left">-->
<!--                <div class="toolbox-info">-->
<!--                  {{ $t("Showing") }} <span>{{ products.length }} {{ $t("of") }} {{ totalCount }}</span> {{ $t("Products") }}-->
<!--                </div>&lt;!&ndash; End .toolbox-info &ndash;&gt;-->
<!--              </div>&lt;!&ndash; End .toolbox-left &ndash;&gt;-->

<!--            </div>&lt;!&ndash; End .toolbox &ndash;&gt;-->


            <div class="products mb-3">
              <div class="row justify-content-center">

                <div v-for="product in products" :key="product.id+'product'" class="col-6 col-md-4 col-lg-4">
                  <ProductCard :product="product"/>
                </div>

              </div><!-- End .row -->
            </div><!-- End .products -->
<!--            <pagination v-if="productsFound"></pagination>-->

<!--            <div class="row justify-content-center">-->
<!--              <button class="btn btn-outline-primary-2 btn-more w-100 "-->
<!--                      @click="loadCache"-->
<!--              :class="{'disabled-hidden':cacheLength===0}">{{$t("Discovre More")}}</button>-->

<!--            </div>-->
            <div class="row ">
              <div class="col ">
                  <img src="/assets/images/meem/noProductsImage.jpg" v-if="!productsFound" class="m-auto">
              </div>
            </div>
          </div><!-- End .col-lg-9 -->
<!--          <aside class="col-lg-3 order-lg-first">-->
<!--            <filter-bar></filter-bar>-->
<!--          </aside>&lt;!&ndash; End .col-lg-3 &ndash;&gt;-->
        </div><!-- End .row -->
      </div><!-- End .container -->
    </div><!-- End .page-content -->
  </div>

</template>

<script>
import ProductCard from "~/components/Elements/ProductCard";
import FilterBar from "~/components/Elements/FilterBar";
import Pagination from "~/components/Elements/pagination";
import login from "~/pages/auth/login";
export default {
  name: "shop",
  components: {Pagination, FilterBar, ProductCard},
  async asyncData({$repo, route, store}){
    let page = 1, perPage = 3
    try{
      const search = route.query.search
        const products = await $repo.Products.productsSearch(search, perPage, page)
      store.commit('initSearchProduct', products.data)
    }catch (err){
      console.log("error in asyncData shop")
      console.log(err)
      return false
    }
    return {page:page, perPage:perPage}
  },
  mounted() {
  },
  data(){
    return{
    }
  },
  methods:{
  },
  computed:{
    products: function (){
      return this.$store.state.products.searchProducts;
    },
    productsFound: function (){
      return this.$store.state.products.searchProducts.length !== 0;
    },
    totalCount: function (){
      return this.$store.state.products.searchProductsCount
    }
  },
  watch:{
    $route:async function (){
      let page = 1, perPage = 3
      try{
        const search = this.$route.query.search
        const products = await this.$repo.Products.productsSearch(search, perPage, page)
        this.$store.commit('initSearchProduct', products.data)
      }catch (err){
        console.log("error in asyncData search")
        console.log(err)
        return false
      }
    }
  },
  head() {
    return {
      title:this.$t("search results") + this.$t("for") + '"'+this.$route.query.search+'"'
    };
  },
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
.shop-page-title{
  color: white !important;
}
</style>
