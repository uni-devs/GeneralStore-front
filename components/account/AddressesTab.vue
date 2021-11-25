<template>
<div id="AddressesTab">

  <div class="row">
    <div v-for="(address, index) in userAdresses" class="col-lg-4">
      <address-card :address="address" :index="index"
                    :selectable="selectable" :selected="selectedAddress === index"
      v-on:selected="selectAddress($event)"></address-card>
    </div><!-- End .col-lg-6 -->

    <div class="col-lg-4">
      <div class="card card-dashboard ">
        <div class="card-body">
          <h3 class="card-title "><i class="mdi mdi-plus-box"></i> {{ $t("Add New Address") }}</h3>

          <form action="#">

            <div class="form-row">
              <label for="phone-input">{{ $t("Phone") }}*</label>
              <input type="text" id="phone-input" class="form-control" :placeholder="$t('Enter the phone number')" v-model="inputPhone" required>
            </div>

            <div class="form-row">
              <label for="state-input">{{ $t("State") }}*</label>
              <select type="text" id="state-input" class="form-control js-example-basic-single" v-model="inputState" required>
                <option value="#" selected>{{ $t("Choose the state") }}</option>
                <option v-for="state in states" :value="state.id">{{state.name}}</option>
              </select>
            </div>

            <div class="form-row" >
              <label for="city-input">{{ $t("City") }}*</label>
              <select v-if="inputState" type="text" id="city-input" class="form-control js-example-basic-single" v-model="inputCity" required>
                <option value="#" selected>{{ $t("Choose the city") }}</option>
                <option v-for="city in inputState.cities" :value="city">{{city}}</option>
              </select>
            </div>

            <div class="form-row">
              <label for="address-input">{{ $t("Address") }}*</label>
              <input type="text" id="address-input" class="form-control" :placeholder="$t('Describe your full address')" v-model="inputAddress" required>
            </div>

            <div class="form-footer">
              <button class="btn btn-primary w-100" @click.prevent="addAddress">{{ $t("Add Address") }}</button>
            </div>

          </form>

        </div>
      </div>
    </div><!-- End .col-lg-6 -->
  </div><!-- End .row -->


</div>
</template>

<script>
import AddressCard from "~/components/account/AddressCard";
import login from "~/pages/auth/login";
export default {
  name: "AddressesTab",
  components: {AddressCard},
  data(){
    return{
      inputAddress:null,
      inputState:{
        cities:[]
      },
      inputPhone:null,
      inputCity:null,
      selectedAddress:0
    }
  },
  methods:{
    addAddress: async function (){
      const validator = this.validatePage()
      if(!validator.isValid){
        this.$swal.fire({
          title:this.$t('Missing data'),
          text:validator.message,
          icon:'warning'
        })
        return false;
      }
      const address = Object.assign({},{
        state_id:this.inputState.id,
        city:this.inputCity,
        phone:this.inputPhone,
        address:this.inputAddress
      })
      let res
      try{
       res = await this.$repo.User.addAddress(address)
      }catch (err){
       this.$swal.fire({
         title:this.$t("Operation Failed"),
         text:err.response.data.message,
         icon:'error'
       })
        this.resetForm()
        return false
      }
      this.$store.commit('addAddress', res.data.data)
      this.$swal.fire({
        toast:true,
        title:this.$t("Address Added"),
        icon:"success",
        position:'top-start',
        showConfirmButton:false,
        timer:2000,
        timerProgressBar:true,
        width:250
      })
      this.resetForm()
    },
    resetForm: function (){
      this.inputAddress = null
      this.inputCity = null
      this.inputState = {cities:[]}
      this.inputPhone = null

      $(document).ready(function() {
        $('#state-input').val(null).trigger("change");
        $('#city-input').val(null).trigger("change");
      });

    },
    selectAddress: function (addressIdx){
        this.selectedAddress=addressIdx
      this.$emit('AddressSelected', addressIdx)
    },
    validatePage: function (){
      const validator = {
        isValid: true,
        message:''
      }
      if(!this.inputPhone){
        validator.isValid = false
        validator.message = `${this.$t("Phone Number")} ${this.$t("is required")}`
        return validator
      }
      if(this.inputPhone[0]!=='0'||this.inputPhone[1]!=='5'){
        validator.isValid = false
        validator.message = `${this.$t("phone number must start with")}05`
        return validator
      }
      if(this.inputPhone.length!==10){
        validator.isValid = false
        validator.message = `${this.$t("phone number must be 10 digits")}`
        return validator
      }
      if(!this.inputState.id){
        validator.isValid = false
        validator.message = `${this.$t("State")} ${this.$t("is required")}`
        return validator
      }
      if(!this.inputCity){
        validator.isValid = false
        validator.message = `${this.$t("City")} ${this.$t("is required")}`
        return validator
      }
      if(!this.inputAddress){
        validator.isValid = false
        validator.message = `${this.$t("Address")} ${this.$t("is required")}`
        return validator
      }
      return validator
    }
  },
  computed: {

    states: function (){
      return this.$store.state.generals.states
    },
    userAdresses: function(){
      return this.$store.state.generals.addresses

    }
  },
  props:{
    selectable: {
      type:Boolean,
      default:false
    }
  },
  mounted() {
    $(document).ready(function() {
      $('.js-example-basic-single').select2();
    });
    $('#state-input').on('select2:select',  (e) => {
      console.log(e)
      const id = Number(e.params.data.id)
      this.inputState = this.states.find(state=>state.id === id)
    });

    $('#city-input').on('select2:select',  (e) => {
      this.inputCity = e.params.data.text
    });
  }
}
</script>

<style scoped>

</style>
