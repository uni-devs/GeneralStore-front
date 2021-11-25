<template>
<div id="OffersElement">

  <div class="container">
    <div class="row">
      <aside class="col-lg-3">
        <div class="card card-dashboard">
          <div class="card-body">
            <h3 class="card-title">Card title</h3>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
          </div>
        </div>
      </aside><!-- End .col-lg-3 -->
      <div class="col-lg-9">
        <h2 class="title">{{ $t("Special Offers") }}</h2><!-- End .title -->
        <div class="products-container mb-7">
          <div class="row justify-content-center">
            <div v-for="(product, index) in offers" :key="product.id+'offer'" class="col-6 col-md-4">
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


    </div><!-- End .row -->

  </div><!-- End .container -->

</div>
</template>

<script>
import ProductCard from "~/components/Elements/ProductCard";
import ArrivalsSideBar from "~/components/Home/ArrivalsSideBar";
export default {
  name: "Offers",
  components: {ArrivalsSideBar, ProductCard},
  computed:{
    offers : function (){
      return this.$store.state.products.arrivals
    }
  }
}
</script>

<style scoped>

</style>
