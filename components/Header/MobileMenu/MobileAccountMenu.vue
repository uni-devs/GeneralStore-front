<template>
  <li>
    <a href="javascript:void(0)" class="sf-with-ul"><span class="mdi mdi-account-circle mr-1 mdi-16px"></span>{{ $t("Account") }}</a>
    <ul v-if="$auth.user">
      <li><router-link class="mobile-menu-link" :to="{name:'myAccount'}"> <span class="mdi mdi-account-circle mr-1 mdi-16px"></span>
        {{ $t("Account") }}</router-link></li>
      <li><router-link class="mobile-menu-link" :to="{name:'myAccount', query:{page:'orders'}}">
        <span class="mdi mdi-cart mr-1 mdi-16px"></span>
        {{$t("Orders")}}</router-link></li>
      <li><router-link class="mobile-menu-link" :to="{name:'myAccount', query:{page:'address'}}">
        <span class="mdi mdi-map-marker mr-1 mdi-16px"></span>
        {{$t("Addresses")}}</router-link></li>
      <li><a @click="logout" href="javascript:void(0);" class="m-2 text-danger mobile-menu-link" style="font-size: 14px">
        <span class="mdi mdi-logout mr-1"></span>
        {{$t("Log Out")}}</a></li>
    </ul>
    <ul v-else>
      <li><router-link :to="{name:'login'}" class="m-2 text-success mobile-menu-link" style="font-size: 14px">
        <span class="mdi mdi-login mr-1"></span>
        {{$t("Log In")}}</router-link></li>
      <li><router-link :to="{name:'register'}" class="m-2 mobile-menu-link" style="font-size: 14px">
        <span class="mdi mdi-form-dropdown mr-1"></span>
        {{$t("Register")}}</router-link></li>
    </ul>
  </li>

</template>

<script>
export default {
  name: "MobileAccountMenu",
  methods:{
    logout: async function () {
      this.$store.commit('destroyAddresses')
      await this.$auth.logout();
    }
  }
}
</script>

<style scoped>

</style>
