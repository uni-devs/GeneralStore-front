<template>
  <div id="app" class="app-app ">
    <div class="page-wrapper">
      <HeaderDefault />
      <main class="main">
        <nuxt />
      </main>
      <FooterDefault />
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu-overlay"></div><!-- End .mobil-menu-overlay -->
    <button id="scroll-top" title="Back to Top"><i class="icon-arrow-up"></i></button>
    <mobile-menu></mobile-menu>

  </div>
</template>

<script>
import HeaderDefault from '~/components/Header/HeaderDefault'
import FooterDefault from '~/components/Footer/FooterDefault'
import MobileMenu from "~/components/Header/MobileMenu/MobileMenu";


export default {
  name: 'default',
  components: {MobileMenu, FooterDefault, HeaderDefault },
  mounted () {

  }
}
</script>

<style scoped>

</style>
