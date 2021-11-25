<template>
  <footer class="footer">
    <div class="footer-top" style="background-image: url(/assets/images/demos/demo-31/footer-bg.jpg)">
      <div class="container">
        <div class="newsletter justify-content-center pt-7 pb-7">
          <div class="newsletter-heading text-center">
            <h3 class="newsletter-title text-white">Get The Latest Deals</h3><!-- End .cta-title -->
            <p class="newsletter-desc font-weight-normal">Sign up & receive 10% off your first order</p><!-- End .cta-desc -->
          </div><!-- End .text-center -->

          <form action="#">
            <div class="input-group">
              <input type="email" class="form-control" placeholder="Enter your Email Address" aria-label="Email Adress" required>
              <div class="input-group-append">
                <button class="btn btn-white" type="submit" title="Sing up">SUBSCRIBE</button>
              </div><!-- .End .input-group-append -->
            </div><!-- .End .input-group -->
          </form>
        </div><!-- End .cta -->
      </div><!--End .container-->
    </div><!--End .footer-top-->

    <div class="container">
      <div class="footer-middle pt-5">
        <div class="row">
          <div class="col-sm-6 col-lg-3">
            <div class="widget widget-about">
              <h3 class="widget-title text-white font-weight-normal">About Molla</h3>
              <p class="font-weight-normal">Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. </p>

              <div class="social-icons">
                <a href="#" class="social-icon" title="Facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-icon" title="Twitter" target="_blank"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon" title="Instagram" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-icon" title="Youtube" target="_blank"><i class="fab fa-youtube"></i></a>
              </div><!-- End .soial-icons -->
            </div><!-- End .widget about-widget -->
          </div><!-- End .col-sm-6 col-lg-3 -->

          <div class="col-sm-6 col-lg-3">
            <div class="widget">
              <h4 class="widget-title text-white font-weight-normal">Useful Links</h4><!-- End .widget-title -->

              <ul class="widget-list">
                <li><a href="about.html">About Molla</a></li>
                <li><a href="#">How to shop on Molla</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="contact.html">Contact us</a></li>
                <li><a href="login.html">Log in</a></li>
              </ul><!-- End .widget-list -->
            </div><!-- End .widget -->
          </div><!-- End .col-sm-6 col-lg-3 -->

          <div class="col-sm-6 col-lg-3">
            <div class="widget">
              <h4 class="widget-title text-white font-weight-normal">Customer Service</h4><!-- End .widget-title -->

              <ul class="widget-list">
                <li><a href="#">Payment Methods</a></li>
                <li><a href="#">Money-back guarantee!</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Terms and conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul><!-- End .widget-list -->
            </div><!-- End .widget -->
          </div><!-- End .col-sm-6 col-lg-3 -->

          <div class="col-sm-6 col-lg-3">
            <div class="widget">
              <h4 class="widget-title text-white font-weight-normal">My Account</h4><!-- End .widget-title -->

              <ul class="widget-list">
                <li><a href="#">Sign In</a></li>
                <li><a href="cart.html">View Cart</a></li>
                <li><a href="#">My Wishlist</a></li>
                <li><a href="#">Track My Order</a></li>
                <li><a href="#">Help</a></li>
              </ul><!-- End .widget-list -->
            </div><!-- End .widget -->
          </div><!-- End .col-sm-6 col-lg-3 -->
        </div><!-- End .row -->
      </div><!--End .footer-middle-->

      <div class="footer-bottom pb-3">
        <figure class="footer-payments mb-4">
          <img src="assets/images/demos/demo-31/payments.png" alt="Footer payments" width="272" height="20" class="footer-payments">
        </figure><!--End .footer-payments-->

        <figure class="footer-logo mb-4">
          <img src="assets/images/demos/demo-31/footer-logo.png" alt="Footer logo" width="111" height="105" class="footer-logo">
        </figure><!--End .footer-logo-->

        <p class="footer-cotyright font-weight-normal">Copyright © 2020 Molla Store. All Rights Reserved.</p>
      </div><!--End .footer-bottom-->
    </div><!--End .container-->
  </footer><!--End .footer-->

</template>

<script>
import FooterTop from "~/components/Footer/FooterTop";
import FooterMiddle from "~/components/Footer/FooterMiddle";
import FooterBottom from "~/components/Footer/FooterBottom";
export default {
  name: 'FooterDefault',
  components: {FooterBottom, FooterMiddle, FooterTop}
}
</script>

<style scoped>

</style>
