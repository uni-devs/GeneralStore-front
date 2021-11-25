<template>
<div id="addressCard">

  <div class="card card-dashboard">
    <div class="row justify-content-end m-2">
      <a href="javascript:void(0)" @click="deleteAddress" class="btn-remove" :title="$t('Delete Address')"><i class="icon-close"></i></a>
    </div>
    <div class="card-body pt-2">
      <h3 class="card-title">{{address.state}} - {{address.city}}
      </h3><!-- End .card-title -->


      <p>
        {{ $t("Phone") }} : {{address.phone}}<br>
        {{ $t("State") }} : {{address.state}}<br>
        {{ $t("City") }} : {{address.city}}<br>
        {{ $t("Address") }} : {{address.address}}<br>
        {{ $t("Shipping fees") }} : {{address.shipping_fees}}<br>

        <!--                <a href="#">Edit <i class="icon-edit"></i></a>-->
      </p>
      <div v-if="selectable">
        <button class="btn w-100 "
                :class="{'btn-primary':!selected, 'btn-success':selected,}"
                @click.prevent="selectAddress" :id="address.id+'address'">{{$t("Select")}}</button>
      </div>

    </div><!-- End .card-body -->
  </div><!-- End .card-dashboard -->

</div>
</template>

<script>
export default {
  name: "AddressCard",
  data(){
    return{

    }
  },
  methods:{
    selectAddress:function (){
      this.$emit("selected", this.index)
    },
    deleteAddress: async function(){
      const res = await this.$swal.fire({
        title:this.$t("Are you sure you want to delete this address ?"),
        text:this.$t("warning : delete operation is irreversible"),
        icon:"question",
        iconColor:"#ecaa23",
        confirmButtonText:this.$t("yes"),
        showCancelButton:true,
        cancelButtonText:this.$t("cancel")
      })
      if(res.isConfirmed){
        try{
          await this.$repo.User.deteleAddress(this.address.id)
        }catch(err){
          this.$swal.fire({
            title:this.$t("Operation Failed"),
            text:err.response.data.message,
            icon:'error'
          })
          return false
        }
        this.$store.commit('deleteAddress', this.address.id)
        this.$swal.fire({
          toast:true,
          title:this.$t("Address Deleted"),
          icon:"success",
          position:'top-start',
          showConfirmButton:false,
          timer:2000,
          timerProgressBar:true,
          width:250
        })
      }

    }
  },
  props:{
    address:{
      type:Object
    },
    index:{
      type:Number
    },
    selectable:{
      type:Boolean,
      default:false
    },
    selected:{
      type:Boolean,
      default:false
    }
  },
}
</script>

<style scoped>

</style>
