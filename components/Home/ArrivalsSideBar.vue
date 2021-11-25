<template>
<div id="ArrivalsSideBar">
  <div class="sidebar sidebar-home">
    <div class="row">
      <div class="col-sm-6 col-lg-12">
        <div class="widget widget-products">
          <h4 class="widget-title">{{ $t("Best Selling") }}</h4><!-- End .widget-title -->

          <div class="products" v-for="(product, index)  in  bestSelling" :key="'bestSellingProducts'+index">
            <small-product-card :product="product"></small-product-card>
          </div><!-- End .products -->
        </div><!-- End .widget widget-products -->
      </div><!-- End .col-sm-6 col-lg-12 -->

      <div class="col-sm-6 col-lg-12">
        <div class="widget widget-subscribe" style="background-image: url('/assets/images/bg-newsletter.jpg');">
          <h2 class="widget-title">{{ $t("Sign up for sms")}}<br>{{ $t("& stay connect ")}}</h2><!-- End .widget-title -->
          <p>{{ $t("Subcribe to get information about products and coupons") }}</p>

          <form action="#">
            <input type="tel" class="form-control" :placeholder="$t('Enter your number')" required>

            <input type="submit" class="btn btn-outline-white" :value="$t('Subscribe')">
          </form>

        </div><!-- End .widget widget-banner -->
      </div><!-- End .col-sm-6 col-lg-12 -->

      <div class="col-sm-6 col-lg-12">
        <div class="widget widget-banner">
          <div class="banner banner-overlay">
            <a href="#">
              <img src="/assets/images/banners/banner-5.jpg" alt="Banner">
            </a>

            <div class="banner-content">
              <h4 class="banner-subtitle"><a href="#">{{ $t("navbartext1") }}</a></h4><!-- End .banner-title -->
              <h3 class="banner-title"><a href="#">{{ $t("navbartext2") }} <br>{{ $t("navbartext3") }}</a></h3><!-- End .banner-title -->
              <a href="https://meem.ps/shop" class="banner-link">{{ $t("Shop Now") }}</a>
            </div><!-- End .banner-content -->
          </div><!-- End .banner -->
        </div><!-- End .widget widget-banner -->
      </div><!-- End .col-sm-6 col-lg-12 -->
    </div><!-- End .row -->
  </div><!-- End .sidebar sidebar-home -->

</div>
</template>

<script>
import SmallProductCard from "~/components/Elements/SmallProductCard";
export default {
  name: "ArrivalsSideBar",
  components: {SmallProductCard},
  data(){
    return{

    }
  },
  methods:{

  },
  computed:{
    bestSelling: function (){
      return this.$store.state.products.bestSelling
    }
  }
}
</script>

<style scoped>

</style>
