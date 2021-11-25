<template>
<div id="OrderDonePage">

  <div class="page-header text-center" style="background-image: url('/assets/images/page-header-bg.jpg')">
    <div class="container">
      <h1 class="page-title">{{ $t("your order is done") }}</h1>
    </div><!-- End .container -->
  </div><!-- End .page-header -->
<div class="container my-3">
  <div class="row">
    <div class="col-md-6 col-6 my-5">
      <h3>{{ $t("text1 order done") }}</h3><br><br>
      <h4>{{ $t("text2 order done") }}</h4>
      <div class="row justify-content-end">
        <router-link :to="{name:'myAccount', query:{page:'orders'}}" class="btn btn-outline-primary-2" ><span class="mdi mdi-history mr-2"></span>{{ $t("Show order history") }}</router-link>
        <router-link :to="{name:'shop'}" class="btn btn-success mx-2" ><span class="mdi mdi-shopping mr-2"></span>{{ $t("CONTINUE SHOPPING") }}</router-link>
      </div>
    </div>
    <div class="col-md-6 col-6">
      <img src="/assets/images/meem/orderDone.png" alt="Order is Done" style="height: auto; width:50rem ">
    </div>
  </div>


  <div class="row ">
  </div>

</div>


</div>
</template>

<script>
export default {
  name: "orderDone"
}
</script>

<style scoped>

</style>
