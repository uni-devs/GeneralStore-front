<template>
<div id="MyAccountPage">
    <div class="page-header text-center" style="background-image: url('/assets/images/page-header-bg.jpg')">
      <div class="container">
        <h1 class="page-title">{{$t("Welcome")}} {{ $auth.user.first_name }}<span>{{ $t("Profile") }}</span></h1>
      </div><!-- End .container -->
    </div><!-- End .page-header -->

    <div class="page-content">
      <div class="dashboard">
        <div class="container">
          <div class="row mt-2">
            <aside class="col-md-4 col-lg-3">
              <ul class="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                <li class="nav-item">
                  <a class="nav-link" :class="{active:!pageQuary}" id="tab-dashboard-link"
                     data-toggle="tab" href="#tab-dashboard" role="tab" aria-controls="tab-dashboard"
                     aria-selected="true" @click="routingCheck('')">{{ $t("Dashboard") }}</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " :class="{active:pageQuary==='orders'}" id="tab-orders-link"
                     data-toggle="tab" href="#tab-orders" role="tab" aria-controls="tab-orders"
                     aria-selected="false" @click="routingCheck('orders')">{{ $t("Orders") }}</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{active:pageQuary==='address'}" id="tab-address-link"
                     data-toggle="tab" href="#tab-address" role="tab" aria-controls="tab-address"
                     aria-selected="false" @click="routingCheck('address')">{{ $t("Addresses") }}</a>
                </li>
<!--                <li class="nav-item">-->
<!--                  <a class="nav-link" :class="{active:pageQuary==='accountDetails'}" id="tab-account-link" data-toggle="tab" href="#tab-account" role="tab" aria-controls="tab-account" aria-selected="false">Account Details</a>-->
<!--                </li>-->
                <li class="nav-item" >
                  <a @click="logout" class="nav-link text-danger"  href="javascript:void(0);">{{ $t("Log Out") }}</a>
                </li>
              </ul>
            </aside><!-- End .col-lg-3 -->

            <div class="col-md-8 col-lg-9">
              <account-tabs></account-tabs>
            </div><!-- End .col-lg-9 -->
          </div><!-- End .row -->
        </div><!-- End .container -->
      </div><!-- End .dashboard -->
    </div><!-- End .page-content -->
</div>
</template>

<script>
import AccountTabs from "~/components/account/AccountTabs";
export default {
  name: "myAccount",
  middleware: 'auth',
  auth:'user',
  components: {AccountTabs},
  async asyncData({store, $repo}){
    try{
      const states = await $repo.General.getStates()
      store.commit('initStates', states.data.data)
    }catch (err) {
      console.log("error in asyncData myAccount -> status loading")
      console.log(err)
      return false
    }

    try{
      const addresses = await $repo.User.getAllAddresses()
      store.commit('initAddresses', addresses.data.data)
    }catch (err) {
      console.log("error in asyncData myAccount -> addresses loading")
      console.log(err)
      return false
    }

    try{
      const ordersHistory = await $repo.Orders.ordersHistory()
      store.commit('initOrdersHistory', ordersHistory.data.data)
    }catch (err) {
      console.log("error in asyncData myAccount -> ordersHistory loading")
      console.log(err)
      return false
    }



  },
  methods:{
    logout: function () {
      this.$store.commit('destroyAddresses')
      this.$store.commit('destroyOrdersHistory')
      this.$router.push({name:'home'}).then(()=>{
        this.$auth.logout();
      })
    },
    routingCheck: function (tabName=''){
      if(this.$route.query.name !== tabName){
        this.$router.push({name:'myAccount',query:{page:tabName}})
      }
    },
  },
  mounted(){
    document.getElementById('AppBody').className-='mmenu-active'
  },
  computed:{
    pageQuary:function (){
      return this.$route.query.page
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
</style>
