<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-9">
        <h2 class="title">{{ $t("Recent Arrivals") }}</h2><!-- End .title -->
        <div class="products-container mb-7">
          <div class="row justify-content-center">
            <div v-for="(product, index) in arrivals" :key="product.id+'arrival'" class="col-6 col-md-4">
              <product-card :product="product" ></product-card>
            </div><!-- End .col-sm-6 col-md-4 -->

          </div><!-- End .row -->

          <div class="more-container text-center mt-0 mb-0">
            <router-link to="/shop" class="btn btn-outline-primary-2 btn-more">
              <span>{{ $t("View more Products") }}</span>
            </router-link>
          </div><!-- End .more-container -->
        </div><!-- End .products -->
      </div><!-- End .col-lg-9 -->

      <aside class="col-lg-3">
        <arrivals-side-bar></arrivals-side-bar>
      </aside><!-- End .col-lg-3 -->
    </div><!-- End .row -->

  </div><!-- End .container -->

</template>

<script>
import ArrivalsSideBar from "~/components/Home/ArrivalsSideBar";
import ProductCard7 from "~/components/Elements/ProductCard7";
import ProductCard from "~/components/Elements/ProductCard";
export default {
  name: 'Arrivals',
  components: {ProductCard, ProductCard7, ArrivalsSideBar },
  computed:{
    arrivals: function (){
      return this.$store.state.products.arrivals
    }
  }
}
</script>

<style scoped>

</style>
