<template>
  <header class="header header-31">
    <div class="header-middle sticky-header">
      <div class="container">

        <left-head></left-head>
        <center-head></center-head>
        <right-head></right-head>

      </div><!-- End .container -->
    </div><!-- End .header-middle -->
  </header><!-- End .header -->

</template>

<script>

import LeftHead from "~/components/Header/leftPart/left";
import CenterHead from "~/components/Header/centerPart/center";
import RightHead from "~/components/Header/rightPart/right";
export default {
  name: 'HeaderDefault',
  components: {RightHead, CenterHead, LeftHead},
  mounted () {
    this.$nextTick(() => {
      // setTimeout(function () {
      //   if(this.$el.children[0].offsetHeight)
      //     document.querySelector(".sticky-wrapper").style.height = this.$el.children[0].offsetHeight+ 'px'
      // },1500);

    })
  }
}
</script>

<style >
.header .container {
  height: 160px !important;
}

</style>
