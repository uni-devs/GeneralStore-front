<template>
<div id="aboutPage">

    <div class="container mt-2">
      <div class="page-header page-header-big text-center" style="background-image: url('/assets/images/about-header-bg.jpg')">
        <h1 class="page-title text-white">{{ $t("About us") }}<span class="text-white">{{ $t("Who we are") }}</span></h1>
      </div><!-- End .page-header -->
    </div><!-- End .container -->


      <div class="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 mb-3 mb-lg-0">
              <h2 class="title">{{ $t("Who We Are") }}</h2><!-- End .title -->
                      <hr class="mt-4 mb-6">

              <p class="lead text-primary mb-3">متجر ميم هو وجهتك الأولى للحصول على المنتجات غير التقليدية؛ وعندما نقول غير تقليدية، فنحن نقصد أن المنتجات المعروضة على متجر ميم  تتميز بأنها ملفتة بطريقة مشوقة وممتعة وذكية.  <br> ويقدم لك الموقع تجربة تسوق عبر الانترنت بشكل مختلف؛ فالموقع يختص في بيع منتجات غير تقليدية للإستخدام في المنزل أو الجامعة أو المكتب، أو أي مكان تناسبها.

</p><!-- End .lead text-primary -->
              <p class="mb-2">مهمتنا الأولى هي أن نقدم لك تجربة تسوق عبر الانترنت أكثر سهولة وسرعة، بالإضافة إلى مجموعة كبيرة من الملابس المتنوعة.. متجر ميم  هو مقصدك الأول لشراء هدايا ممتعة لمن تحب، أو حتى لنفسك.
</p>
<p class="mb-2"> متجرنا الإلكتروني هو وجهتك الأولى الجديدة للتسوق عبر الانترنت؛ نعدك بتقديم تجربة تسوق سهلة وسريعة ومشوقة. كل ما عليك فعله هو تصفح الموقع وإضافة المنتجات التي أحببتها إلى سلة الشراء، ثم إدخال البيانات الخاصة بك لإنهاء عملية الشراء. بعد ذلك... طلبك في طريقه إليك!



  </p>
            </div><!-- End .col-lg-5 -->

            <div class="col-lg-6 offset-lg-1">
              <div class="about-images">
                <img src="/assets/images/about/img-1.jpg" alt="" class="about-img-front">
                <img src="/assets/images/about/img-2.jpg" alt="" class="about-img-back">
              </div><!-- End .about-images -->
            </div><!-- End .col-lg-6 -->
          </div><!-- End .row -->
        </div><!-- End .container -->
      </div><!-- End .bg-light-2 pt-6 pb-6 -->

        </div><!-- End .container -->

</template>

<script>
export default {
  name: "about",
  head(){
    return{
      title:"عن ميم",
      meta: [
           {
          hid: 'description',
          name: 'description',
          content: 'متجر ميم  هو وجهتك الأولى للتسوق عبر الانترنت؛ نعدك بتقديم تجربة تسوق سهلة وسريعة ومشوقة'
        },

        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://meem.ps/about'
        },

        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },

        {
          hid: 'og:title',
          name: 'og:title',
          content: 'متجر ميم  - عن ميم'
        },

        {
          hid: 'og:description',
          name: 'og:description',
          content: 'متجر ميم  هو وجهتك الأولى للتسوق عبر الانترنت؛ نعدك بتقديم تجربة تسوق سهلة وسريعة ومشوقة'
        },

        {
          hid: 'og:image',
          name: 'og:image',
          content: ''
        },

        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },

         {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'متجر ميم  - عن ميم'
        },

        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'متجر ميم  هو وجهتك الأولى للتسوق عبر الانترنت؛ نعدك بتقديم تجربة تسوق سهلة وسريعة ومشوقة'
        },
                {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: ''
        },
      ],

    }
  }
}
</script>

<style >
.header-11 {
  position: relative !important;
  background: #333;
}
.header .container {
  height: 86px;
}
.privecyText{
  font-size: 1.8rem!important;
}
</style>
