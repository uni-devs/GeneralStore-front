<template>
<div id="PrivacyPolicyPage">
    <div class="page-header text-center" style="background-image: url('/assets/images/page-header-bg.jpg')">
      <div class="container">
        <h1 class="page-title">{{ $t("Returns") }}</h1>
      </div><!-- End .container -->
    </div><!-- End .page-header -->

    <div class="page-content pb-3">
      <div class="container mt-2">
        <div class="row mt-2 justify-content-center">
          <img src="/assets/images/meem/returnBanner.png" alt="Return Banner">
        </div>
        <div class="row mb-2">
          <div class="col-lg-10 offset-lg-1">
            <div class="about-text text-center mt-3">
              <div>
                <p class="privecyText mb-2">- يجب أن يكون المنتج غير مستخدم أو متلف  ويجب أن يكون في نفس الحالة الأصلية التي تلقيته عليها.
                </p>
                <p class="privecyText mb-2">- لا يمكنك إرجاع أي منتج تم استهلاكه أو تم استخدامه ، المنتجات القابلة للكسر ، المنتجات المتعلقة بالنظافة ، الملابس الداخلية ، الجوارب ، الكتب ، ملابس السباحة ، مستحضرات التجميل والعطور</p>
                <p class="privecyText mb-2">- المنتجات المسترجعة لا تقبل إذا كانت تفقد علامات الأسعار ، الأسماء ، التعبئة الأصلية (تم اعادة تعبئتها) ، المنتجات المجانية ، وملحقات المنتجات.</p>
                <p class="privecyText mb-2">- يتم رد المبلغ إلى بطاقة الائتمان الخاصة بك إذا تم سداد الطلب بواسطة بطاقة الائتمان خلال 7 أيام من استلام المنتج المراد إرجاعه في مستودعاتنا.</p>
                <p class="privecyText mb-2">- يتم رد المبلغ المسترد على شكل رصيد / قسيمة للمتجر في حالة طلب الدفع عن طريق (الدفع عند الاستلام) خلال 3 أيام من استلام المنتج المراد إرجاعه في مستودعنا.</p>
                <p class="privecyText mb-2"></p>
              </div>
            </div><!-- End .about-text -->
          </div><!-- End .col-lg-10 offset-1 -->
        </div><!-- End .row -->
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <div class="about-text text-center mt-3">
              <h2 class="title text-center mb-2">كيف تعيد منتج ؟</h2><!-- End .title text-center mb-2 -->
              <div>
                <p class="privecyText mb-2">- يجب أن يكون المنتج غير مستخدم أو متلف  ويجب أن يكون في نفس الحالة الأصلية التي تلقيته عليها.
                </p>
                <p class="privecyText mb-2">من أجل ضمان رضاء عملائنا الأحباء ، فإن جميع مشترياتهم في ميم قابلة للإرجاع أو الاستبدال مجانًا خلال 7 ايام من تاريخ التسليم. يجب عليك القيام​​ بالتواصل معنا عبر الايميل info@meem.ps أو رقم الواتس اب 972566992800
                </p>
              </div>
            </div><!-- End .about-text -->
          </div><!-- End .col-lg-10 offset-1 -->
        </div><!-- End .row -->
      </div><!-- End .container -->

    </div><!-- End .page-content -->



</div>
</template>

<script>
export default {
  name: "privacyPolicy",
  head(){
    return{
      title:"سياسة إرجاع المنتجات",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'من أجل ضمان رضا عملائنا الأحباء ، فإن جميع مشترياتهم في متجر ميم   قابلة للإرجاع أو الاستبدال مجانًا خلال 7  ايام من تاريخ التسليم'
        },

        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://meem.ps/returnPolicy'
        },

        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },

        {
          hid: 'og:title',
          name: 'og:title',
          content: 'متجر ميم  - سياسة إرجاع المنتجات'
        },

        {
          hid: 'og:description',
          name: 'og:description',
          content: 'من أجل ضمان رضا عملائنا الأحباء ، فإن جميع مشترياتهم في متجر ميم   قابلة للإرجاع أو الاستبدال مجانًا خلال 7  ايام من تاريخ التسليم'
        },

        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://meem.ps/assets/images/meem/ogimage.png'
        },

        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },

         {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'متجر ميم  - سياسة إرجاع المنتجات'
        },

        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'من أجل ضمان رضا عملائنا الأحباء ، فإن جميع مشترياتهم في متجر ميم   قابلة للإرجاع أو الاستبدال مجانًا خلال 7  ايام من تاريخ التسليم'
        },
                {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://meem.ps/assets/images/meem/ogimage.png'
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
