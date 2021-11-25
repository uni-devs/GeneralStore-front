<template>
<div id="AccountTabs">
  <div class="tab-content">

    <div class="tab-pane fade " :class="{active:!pageQuary, show:!pageQuary}" id="tab-dashboard" role="tabpanel" aria-labelledby="tab-dashboard-link">
      <div class="card m-2">
        <h4 v-if="!$auth.user.verified" class="card-title text-danger m-2"> <i class="mdi mdi-account-alert"></i>
          {{ $t("Your account is not Verified")}}</h4>
        <h4 v-else class="card-title text-success m-2"> <i class="mdi mdi-account-check"></i>
          {{ $t("Your account is Verified")}}</h4>
        <div class="card-body mx-3 my-2">
          <p v-if="!$auth.user.verified">{{ $t("press") }}
            <router-link :to="{name:'accountVerification'}">
              <b>{{ $t("here") }}</b>
            </router-link>
            {{ $t("to verify your account") }}</p>
          <p v-else>{{$t("You can shop freely now")}}</p>
        </div>
      </div>
    </div><!-- .End .tab-pane -->

    <div class="tab-pane fade " :class="{active:pageQuary==='orders', show:pageQuary==='orders'}" id="tab-orders" role="tabpanel" aria-labelledby="tab-orders-link">
      <div v-if="userOrdersHistory.length===0">
        <p>{{ $t("No order has been made yet") }}.</p>
        <router-link :to="{name:'shop'}" class="btn btn-outline-primary-2">
          <span>{{ $t("GO SHOP") }}</span>
          <i class="icon-long-arrow-left"></i>
        </router-link>

      </div>
      <div v-else>
        <order-history-card></order-history-card>
      </div>

    </div><!-- .End .tab-pane -->

    <div class="tab-pane fade" :class="{active:pageQuary==='address', show:pageQuary==='address'}" id="tab-address" role="tabpanel" aria-labelledby="tab-address-link">
      <addresses-tab></addresses-tab>
    </div><!-- .End .tab-pane -->

<!--    <div class="tab-pane fade" :class="{active:pageQuary==='accountDetails', show:pageQuary==='accountDetails'}" id="tab-account" role="tabpanel" aria-labelledby="tab-account-link">-->
<!--      <form action="#">-->
<!--        <div class="row">-->
<!--          <div class="col-sm-6">-->
<!--            <label>First Name *</label>-->
<!--            <input type="text" class="form-control" required>-->
<!--          </div>&lt;!&ndash; End .col-sm-6 &ndash;&gt;-->

<!--          <div class="col-sm-6">-->
<!--            <label>Last Name *</label>-->
<!--            <input type="text" class="form-control" required>-->
<!--          </div>&lt;!&ndash; End .col-sm-6 &ndash;&gt;-->
<!--        </div>&lt;!&ndash; End .row &ndash;&gt;-->

<!--        <label>Display Name *</label>-->
<!--        <input type="text" class="form-control" required>-->
<!--        <small class="form-text">This will be how your name will be displayed in the account section and in reviews</small>-->

<!--        <label>Email address *</label>-->
<!--        <input type="email" class="form-control" required>-->

<!--        <label>Current password (leave blank to leave unchanged)</label>-->
<!--        <input type="password" class="form-control">-->

<!--        <label>New password (leave blank to leave unchanged)</label>-->
<!--        <input type="password" class="form-control">-->

<!--        <label>Confirm new password</label>-->
<!--        <input type="password" class="form-control mb-2">-->

<!--        <button type="submit" class="btn btn-outline-primary-2">-->
<!--          <span>SAVE CHANGES</span>-->
<!--          <i class="icon-long-arrow-right"></i>-->
<!--        </button>-->
<!--      </form>-->
<!--    </div>&lt;!&ndash; .End .tab-pane &ndash;&gt;-->
  </div>

<!--  <div class="tab-content">-->
<!--    <dashboard></dashboard>-->
<!--    <orders></orders>-->
<!--    <addresses></addresses>-->
<!--    <account-details></account-details>-->
<!--  </div>-->

</div>
</template>

<script>
import AddressesTab from "~/components/account/AddressesTab";
import OrderHistoryCard from "~/components/account/OrderHistoryCard";
export default {
  name: "AccountTabs",
  components: {OrderHistoryCard, AddressesTab},
  data(){
    return{
      inputAddress:null,
      inputState:{
        cities:[]
      },
      inputPhone:null,
      inputCity:null
    }
  },
  methods:{
    addAddress: async function (){
      const address = Object.assign({},{
        state_id:this.inputState.id,
        city:this.inputCity,
        phone:this.inputPhone,
        address:this.inputAddress
      })
      await this.$repo.User.addAddress(address)
      await this.$auth.fetchUser()
      this.$store.commit('addAddress', {
        state: this.inputState.name,
        city:this.inputCity,
        phone:this.inputPhone,
        address:this.inputAddress,
        shipping_fees:this.inputState.shipping_fees
      })
      this.resetForm()
    },
    resetForm: function (){
      this.inputAddress = null
      this.inputCity = null
      this.inputState = {cities:[]}
      this.inputPhone = null
    }
  },
  computed: {
    pageQuary: function () {
      return this.$route.query.page
    },
    states: function (){
      return this.$store.state.generals.states
    },
    userAdresses: function(){
      return this.$store.state.generals.addresses
    },
    userOrdersHistory: function (){
      return this.$store.state.generals.ordersHistory
    }
  },
}
</script>

<style scoped>

</style>
