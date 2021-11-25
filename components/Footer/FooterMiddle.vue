<template>
  <div class="footer-middle">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-lg-3">
          <div class="widget widget-about">
            <img src="/assets/images/meem/logo.png" class="footer-logo" alt="Footer Logo" width="82" height="25">
            <p>{{$t("The best and the safest way for online shopping")}}.</p>

            <div class="social-icons">
              <a href="https://www.facebook.com/meemps" class="social-icon" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
              <a href="https://www.instagram.com/meem.ps" class="social-icon" title="Instagram" target="_blank"><i class="icon-instagram"></i></a>
            </div><!-- End .soial-icons -->
          </div><!-- End .widget about-widget -->
        </div><!-- End .col-sm-6 col-lg-3 -->

        <div class="col-sm-6 col-lg-3">
          <div class="widget">
            <h4 class="widget-title">{{ $t("Useful Links") }}</h4><!-- End .widget-title -->

            <ul class="widget-list">
              <li><router-link :to="{name:'about'}">{{ $t("About Meem") }}</router-link></li>
<!--              <li><router-link to="">{{ $t("How to shop on Meem") }}</router-link></li>-->
              <li><router-link :to="{name:'faq'}" >{{ $t("FAQ") }}</router-link></li>
              <li><router-link to="">{{ $t("Contact us") }}</router-link></li>
<!--              <li><a href="login.html">Log in</a></li>-->
            </ul><!-- End .widget-list -->
          </div><!-- End .widget -->
        </div><!-- End .col-sm-6 col-lg-3 -->

        <div class="col-sm-6 col-lg-3">
          <div class="widget">
            <h4 class="widget-title">{{ $t("Customer Service") }}</h4><!-- End .widget-title -->

            <ul class="widget-list">
              <li><router-link :to="{name:'returnPolicy'}">{{ $t("Returns") }}</router-link></li>
              <li><router-link :to="{name:'shippingPolicy'}">{{ $t("Shipping") }}</router-link></li>
<!--              <li><router-link to="">{{ $t("Terms and conditions") }}</router-link></li>-->
              <li><router-link :to="{name:'privacyPolicy'}">{{ $t("Privacy Policy") }}</router-link></li>
            </ul><!-- End .widget-list -->
          </div><!-- End .widget -->
        </div><!-- End .col-sm-6 col-lg-3 -->

        <div class="col-sm-6 col-lg-3">
          <div class="widget">
            <h4 class="widget-title">{{ $t("My Account") }}</h4><!-- End .widget-title -->

            <ul class="widget-list">
              <li><router-link to="">{{ $t("Sign In") }}</router-link></li>
              <li><router-link :to="{name:'cart'}">{{ $t("View Cart") }}</router-link></li>
              <li><router-link to="">{{ $t("My Wishlist") }}</router-link></li>
            </ul><!-- End .widget-list -->
          </div><!-- End .widget -->
        </div><!-- End .col-sm-6 col-lg-3 -->
      </div><!-- End .row -->
    </div><!-- End .container -->
  </div><!-- End .footer-middle -->
</template>

<script>
export default {
  name: "FooterMiddle"
}
</script>

<style scoped>

</style>
