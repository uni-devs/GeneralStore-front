<template>
<div id="404Page">

    <div class="error-content text-center" style="background-image: url(/assets/images/backgrounds/error-bg.jpg)">
      <div class="container">
        <h1 class="error-title">{{ $t("Error") }} {{error.statusCode}}</h1><!-- End .error-title -->
        <p>{{ $t(error.message) }}.</p>
        <router-link :to="{name:'home'}" class="btn btn-outline-primary-2 btn-minwidth-lg">
          <span>{{ $t("BACK TO HOMEPAGE") }}</span>
          <i class="icon-long-arrow-right"></i>
        </router-link>
      </div><!-- End .container -->
    </div><!-- End .error-content text-center -->


</div>
</template>

<script>
export default {
  layout:'error_layout',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
}
</script>

<style scoped>

</style>
