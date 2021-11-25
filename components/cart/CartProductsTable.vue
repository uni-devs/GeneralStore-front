<template>
<div id="ProductsTableElement">

  <table class="table table-cart table-mobile">
    <thead>
    <tr>
      <th>{{ $t("Product") }}</th>
      <th>{{ $t("Size") }}</th>
      <th>{{ $t("Price") }}</th>
      <th>{{ $t("Quantity") }}</th>
      <th>{{ $t("Total") }}</th>
      <th></th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="product in cartProducts">
      <td class="product-col">
        <div class="product">
          <figure class="product-media">
            <router-link :to="{name:'singleView', params:{id:product.product_id}}">
              <img v-if="product.product_json.colors[product.selected_color_index].image" :src="product.product_json.colors[product.selected_color_index].image" alt="Product image">
              <img v-else src="/assets/images/meem/defaultProductPicture.jpg" alt="Product image">
            </router-link>
          </figure>

          <h3 class="product-title">
            <router-link :to="{name:'singleView', params:{id:product.product_id}}">{{product.product_json.name}}</router-link>
          </h3><!-- End .product-title -->
        </div><!-- End .product -->
      </td>
      <td class="size-col">{{product.size}}</td>
      <td class="price-col">{{product.price}} ₪</td>
      <td class="quantity-col">
        <div class="cart-product-quantity">
          <input type="number" class="form-control" :value="product.qty" min="1" :max="product.max_qty" step="1" data-decimals="0" required @change="updateQty(product, $event.target.value)">
        </div><!-- End .cart-product-quantity -->
      </td>
      <td class="total-col">{{product.qty * product.price}} ₪</td>
      <td class="remove-col"><button class="btn-remove" @click="removeProduct(product.product_id)"><i class="icon-close"></i></button></td>
    </tr>
    </tbody>
  </table><!-- End .table table-wishlist -->


</div>
</template>

<script>
export default {
  name: "CartProductsTable",
  methods:{
    removeProduct: function (productId){
      this.$store.commit('removeProductFromCart', productId)
      this.$swal.fire({
        toast:true,
        title:this.$t("Product Removed"),
        icon:"success",
        position:'top-end',
        showConfirmButton:false,
        timer:2000,
        timerProgressBar:true,

      })

    },
    updateQty: function (product, qty){
      this.$store.commit('updateCartProductQty', {productId:product.product_id, qty:qty})
    }
  },
  computed:{
    cartProducts: function (){
      return this.$store.state.cart.products
    }
  }
}
</script>

<style scoped>

</style>
