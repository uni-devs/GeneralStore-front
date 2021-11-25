<template>
<div id="OrderHistoryCard">

  <div class="accordion accordion-rounded" id="accordion-orders-history">

  <div class="card" v-for="(order, index) in orders">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <h4 class="card-title" :id="`heading-${index}-order`">
            <a class="" role="button" data-toggle="collapse"
                  :href="`#collapse-${index}-order`" aria-expanded="true" :aria-controls="`collapse-${index}-order`">
            {{ $t("order address") }} : {{order.address.state.name}} - {{order.address.city}} - {{order.address.address}}
          </a>
          </h4>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h6>{{ $t("Shipment ID") }} : {{!order.shipment_id?$t('Not yet shipped'):order.shipment_id}}</h6>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <h6>{{ $t("shipping Method") }} : {{$t(order.shipping_method)}}</h6>
          <h6>{{ $t("shipping Price") }} : {{order.shipping_fees}} ₪</h6>
        </div>
        <div class="col-md-6">
          <h6 class="text-right">{{ $t("discount") }} : {{order.discount}}</h6>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <h6>{{ $t("order status") }} : {{$t(order.status)}}</h6>
        </div>
        <div class="col-md-6 ">
          <h6 class="text-right">{{ $t("order total") }} : {{order.total}} ₪</h6>
        </div>
      </div>

      <div :id="`collapse-${index}-order`" class="collapse" :aria-labelledby="`heading-${index}-order`" data-parent="#accordion-orders-history">
        <div class="card-body">
          <table class="table table-striped table-bordered text-center">

            <thead>
              <tr>
                <th class="w-50">{{ $t("The product") }}</th>
                <th >{{ $t("Size") }}</th>
                <th >{{ $t("Qty") }}</th>
                <th >{{ $t("Price") }}</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in order.items" :key="`${index}HistoryOrder`" >
                <td class="py-3">{{product.name}}</td>
                <td class="py-3">{{product.size}}</td>
                <td class="py-3">{{product.qty}}</td>
                <td class="py-3">{{product.total}}</td>
              </tr>
            </tbody>

          </table>
        </div><!-- End .card-body -->
      </div><!-- End .collapse -->


    </div>
  </div>

  </div><!-- End .accordion -->

</div>
</template>

<script>
export default {
  name: "OrderHistoryCard",
  computed:{
    orders: function (){
      return this.$store.state.generals.ordersHistory
    },
  }
}
</script>

<style scoped>

</style>
