<template>
<div id="footerUpper">

  <div class="row">
    <div class="col-sm-6 col-lg-3">
      <div class="icon-box icon-box-side">
                                <span class="icon-box-icon">
                                    <i class="icon-rocket"></i>
                                </span>

        <div class="icon-box-content">
          <h3 class="icon-box-title">{{ $t("footertext1") }}</h3><!-- End .icon-box-title -->
          <p>{{ $t("textdesc1") }} {{ minimumFreeShipping }} {{$t("Shakel")}}</p>
        </div><!-- End .icon-box-content -->
      </div><!-- End .icon-box -->
    </div><!-- End .col-sm-6 col-lg-3 -->

    <div class="col-sm-6 col-lg-3">
      <div class="icon-box icon-box-side">
                                <span class="icon-box-icon">
                                    <i class="icon-rotate-left"></i>
                                </span>

        <div class="icon-box-content">
          <h3 class="icon-box-title">{{ $t("footertext2") }}</h3><!-- End .icon-box-title -->
          <p>{{ $t("textdesc2") }}</p>
        </div><!-- End .icon-box-content -->
      </div><!-- End .icon-box -->
    </div><!-- End .col-sm-6 col-lg-3 -->

    <div class="col-sm-6 col-lg-3">
      <div class="icon-box icon-box-side">
                                <span class="icon-box-icon">
                                    <i class="icon-info-circle"></i>
                                </span>

        <div class="icon-box-content">
          <h3 class="icon-box-title">{{ $t("footertext3") }}</h3><!-- End .icon-box-title -->
          <p>{{ $t("textdesc3") }}</p>
        </div><!-- End .icon-box-content -->
      </div><!-- End .icon-box -->
    </div><!-- End .col-sm-6 col-lg-3 -->

    <div class="col-sm-6 col-lg-3">
      <div class="icon-box icon-box-side">
                                <span class="icon-box-icon">
                                    <i class="icon-life-ring"></i>
                                </span>

        <div class="icon-box-content">
          <h3 class="icon-box-title">{{ $t("footertext4") }}</h3><!-- End .icon-box-title -->
          <p>{{ $t("textdesc4") }}</p>
        </div><!-- End .icon-box-content -->
      </div><!-- End .icon-box -->
    </div><!-- End .col-sm-6 col-lg-3 -->
  </div><!-- End .row -->



</div>
</template>

<script>
export default {
  name: "FooterTop",
  computed:{
    minimumFreeShipping: function (){
      return this.$store.state.generals.ordersInfo.min_free_shipping
    }
  }
}
</script>

<style scoped>

</style>
