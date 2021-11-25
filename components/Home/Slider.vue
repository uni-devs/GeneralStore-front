<template>
  <div class="intro-slider-container mb-3 mb-lg-5">
    <div class="intro-slider owl-carousel owl-theme owl-nav-inside owl-light" >
      <div v-for="slider in sliders" class="intro-slide" :style="`background-image: url(${slider.Image});`">
        <div class="container">
          <div class="intro-content text-center">
            <h3 class="intro-subtitle cross-txt text-primary">{{ slider.title }}</h3><!-- End .h3 intro-subtitle -->
            <h1 class="intro-title text-white">{{ slider.sub_title_1 }}</h1><!-- End .intro-title -->
            <div class="intro-text text-white">{{ slider.sub_title_2 }}</div><!-- End .intro-text -->
            <div class="intro-action cross-txt">
              <router-link :to="slider.link.href" class="btn btn-outline-white">
                <span>{{ slider.link.text }}</span>
              </router-link>
            </div>
          </div>
        </div><!-- End .intro-content -->
      </div><!-- End .intro-slide -->
<!--      <div class="intro-slide" style="background-image: url(/assets/images/slider/slide-1.jpg);">-->
<!--        <div class="container">-->
<!--          <div class="intro-content text-center">-->
<!--            <h3 class="intro-subtitle cross-txt text-primary">{{ $t("slider1text1") }}</h3>&lt;!&ndash; End .h3 intro-subtitle &ndash;&gt;-->
<!--            <h1 class="intro-title text-white">{{ $t("slider1text2") }}</h1>&lt;!&ndash; End .intro-title &ndash;&gt;-->
<!--            <div class="intro-text text-white">{{ $t("slider1text3") }}</div>&lt;!&ndash; End .intro-text &ndash;&gt;-->
<!--            <div class="intro-action cross-txt">-->
<!--              <router-link :to="{name:'shop'}" class="btn btn-outline-white">-->
<!--                <span>{{ $t("slidersdowntext") }}</span>-->
<!--              </router-link>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>&lt;!&ndash; End .intro-content &ndash;&gt;-->
<!--      </div>&lt;!&ndash; End .intro-slide &ndash;&gt;-->

<!--      <div class="intro-slide" style="background-image: url(/assets/images/slider/slide-2.jpg);">-->
<!--        <div class="container">-->
<!--          <div class="intro-content text-center mx-auto">-->
<!--            <h3 class="intro-subtitle text-primary cross-txt">{{ $t("slider2text1") }}</h3>&lt;!&ndash; End .h3 intro-subtitle &ndash;&gt;-->
<!--            <h1 class="intro-title text-white">{{ $t("slider2text2") }}</h1>&lt;!&ndash; End .intro-title &ndash;&gt;-->
<!--            <div class="intro-text text-white">{{ $t("slider2text3") }}</div>&lt;!&ndash; End .intro-text &ndash;&gt;-->
<!--            <div class="intro-action cross-txt">-->
<!--              <router-link :to="{name:'shop'}" class="btn btn-outline-white">-->
<!--                <span>{{ $t("slidersdowntext") }}</span>-->
<!--              </router-link>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>&lt;!&ndash; End .intro-content &ndash;&gt;-->
<!--      </div>&lt;!&ndash; End .intro-slide &ndash;&gt;-->
    </div><!-- End .intro-slider owl-carousel owl-simple -->
    <span class="slider-loader text-white"></span><!-- End .slider-loader -->
  </div><!-- End .intro-slider-container -->

</template>

<script>
export default {
  name: 'Slider',
  props: {
    slides: {
      type: "Array"
    }
  },
  mounted () {
    var owlSettings = {
      items: 1,
      loop: true,
      margin: 0,
      responsiveClass: true,
      nav: true,
      navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
      dots: true,
      smartSpeed: 400,
      autoplay: true,
      touchDrag:true,
      autoplayTimeout: 15000,
      rtl: true
    };
    $(".intro-slider").owlCarousel(owlSettings)
  },
  computed:{
    sliders: function (){
      return this.$store.state.generals.sliders
    }
  }
}
</script>

<style scoped>

</style>
