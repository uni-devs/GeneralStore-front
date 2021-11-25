<template>
  <div class="page_singleView">
    <div class="page-content mt-2">
      <div class="container">
        <div class="product-details-top">
          <div class="row">
            <div class="col-md-6">
              <div class="product-gallery ">
                <figure class="product-main-image">
                  <span v-if="product.discount || product.offer" class=" product-label label-sale">{{ $t("Sale") }}</span>
                  <!--        <span v-if="product.top" class="product-label label-top">{{ $t("Top") }}</span>-->
                  <span v-if="isOutOfStock" class=" product-label label-out">{{ $t("Out of Stock") }}</span>
                  <div v-if="selectedImage.color">
                    <img id="product-zoom-default-color" v-if="product.colors[selectedColor].image"
                         :src="product.colors[selectedColor].image" alt="product image">
                    <img id="product-zoom-color" v-else src="/assets/images/meem/defaultProductPicture.jpg"
                         alt="product image">
                  </div>
                  <div v-else>
                    <img id="product-zoom-default" v-if="product.images[selectedImage.index]"
                         :src="product.images[selectedImage.index]" alt="product image">
                    <img id="product-zoom" v-else src="/assets/images/meem/defaultProductPicture.jpg"
                         alt="product image">
                  </div>


                  <!--                    <a href="#" id="btn-product-gallery" class="btn-product-gallery">-->
                  <!--                      <i class="icon-arrows"></i>-->
                  <!--                    </a>-->
                </figure><!-- End .product-main-image -->

                <div id="product-zoom-gallery" class="product-image-gallery">
                  <a class="product-gallery-item " :class="{active:selectedImage.index===0&&selectedImage.color}"
                     href="javascript:void(0);" @click="selectImage(0, true)">
                    <img v-if="product.colors[selectedColor].image" :src="product.colors[selectedColor].image"
                         alt="product side">
                    <img v-else src="/assets/images/meem/defaultProductPicture.jpg" alt="product side">
                  </a>
                  <a v-for="(image, index) in product.images" class="product-gallery-item" href="javascript:void(0);"
                     :class="{active:selectedImage.index===index&&!selectedImage.color}"
                     @click="selectImage(index, false)">
                    <img v-if="image" :src="image" alt="product cross">
                    <img v-else src="/assets/images/meem/defaultProductPicture.jpg" alt="product cross">
                  </a>

                </div><!-- End .product-image-gallery -->
              </div><!-- End .product-gallery -->
            </div><!-- End .col-md-6 -->

            <div class="col-md-6">
              <div class="product-details">
                <h1 class="product-title">{{ product.name }}</h1><!-- End .product-title -->

                <!--                <div class="ratings-container">-->
                <!--                  <div class="ratings">-->
                <!--                    <div class="ratings-val" style="width: 80%;"></div>&lt;!&ndash; End .ratings-val &ndash;&gt;-->
                <!--                  </div>&lt;!&ndash; End .ratings &ndash;&gt;-->
                <!--                  <a class="ratings-text" href="#product-review-link" id="review-link">( 2 {{ $t("Reviews") }} )</a>-->
                <!--                </div>&lt;!&ndash; End .rating-container &ndash;&gt;-->

                <div v-if="product.discount" class="product-price">
                  <span class="old-price mx-2">{{ $t("Was") }} {{ product.price }} ₪ </span>
                  <span class="new-price"><b> {{ $t("Now") }} {{ product.discount.price }} ₪</b></span>

                </div>

                <div class="product-price" v-else>
                  {{ product.price }} ₪
                </div><!-- End .product-price -->

<!--                <div class="product-price" v-if="product.offer">-->
<!--                  {{$t("get")}} {{product.offer.amount}} {{$t("forOffer")}} {{product.offer.price}} ₪ {{$t("instead of")}} {{ product.offer.amount * (product.discount?product.discount.price:product.price)}} ₪-->
<!--                </div>&lt;!&ndash; End .product-price &ndash;&gt;-->


                <div class="product-content text-break">
                  <p v-html="product.description"></p>
                </div><!-- End .product-content -->

                <div class="details-filter-row details-row-size">
                  <label>{{ $t("Color") }}:</label>

                  <div class="product-nav product-nav-dots">
                    <a v-for="(color, index) in product.colors" href="javascript:void(0);" @click="selectColor(index)"
                       :class="{active:index===selectedColor}" :style="`background: ${color.hexCode};`">
                      <span class="sr-only">{{ color.name }}</span>
                    </a>

                  </div><!-- End .product-nav -->
                </div><!-- End .details-filter-row -->

                <div class="details-filter-row details-row-size">

                  <label>{{ $t("Size") }}:</label>
                  <div class="product-size">
                    <a href="javascript:void(0);" v-for="(size, index) in product.colors[selectedColor].sizes"
                       @click="selectSize(index)"
                       :class="{active:selectedSize===index, disabled:size.qty==='0'}"
                       :title="size.size">{{ size.size }}</a>
                  </div><!-- End .product-size -->

                  <!--                  -->
                  <!--                  <div class="select-custom">-->
                  <!--                    <select name="size" id="size" class="form-control" @change="selectSize($event.target.value)">-->
                  <!--                      <option value="#" selected="selected">{{ $t("Select a size") }}</option>-->
                  <!--                      <option v-for="(size, index) in product.colors[selectedColor].sizes" :value="index">{{size.size}}</option>-->
                  <!--                    </select>-->
                  <!--                  </div>&lt;!&ndash; End .select-custom &ndash;&gt;-->

                </div><!-- End .details-filter-row -->

                <div class="details-filter-row details-row-size">
                  <label for="qty">{{ $t("Qty") }}:</label>
                  <div class="product-details-quantity">
                    <input type="number" id="qty" class="form-control" value="1" min="1"
                           :max="maxQty" step="1" data-decimals="0" required
                           @change="selectedQty = $event.target.value">
                  </div><!-- End .product-details-quantity -->
                </div><!-- End .details-filter-row -->


                <div class="product-details-action">
                  <button id="cart-button" class="btn-product btn-cart" @click="addToCart">{{
                      $t("add to cart")
                    }}
                  </button>

                </div><!-- End .product-details-action -->

                <div class="product-cat">
                  <span>{{ $t("Tags") }}:</span>
                    <router-link v-for="(tag, index) in product.tags" :to='`/shop?tag=${tag}`' :key="tag+index">
                      {{ tag }},
                    </router-link>

                </div><!-- End .product-cat -->

<!--                  <div class="row justify-content-between">-->
<!--                    <div class="col-auto ">-->
<!--                      <i class="mdi mdi-receipt shipping-details-icons "></i>-->
<!--                      <h6>sosa</h6>-->
<!--                    </div>-->
<!--                    <div class="col-auto ">-->
<!--                      <i class="mdi mdi-arrow-left shipping-details-icons "></i>-->
<!--                    </div>-->
<!--                    <div class="col-auto ">-->
<!--                      <i class="mdi mdi-truck-check shipping-details-icons "></i>-->
<!--                    </div>-->
<!--                    <div class="col-auto ">-->
<!--                      <i class="mdi mdi-arrow-left shipping-details-icons "></i>-->
<!--                    </div>-->
<!--                    <div class="col-auto ">-->
<!--                      <i class="mdi mdi-package-variant-closed shipping-details-icons "></i>-->
<!--                    </div>-->
<!--                  </div>-->

                <div class="product-details-footer">
                  <div class="product-cat">
                    <span>{{ $t("Category") }}:</span>
                    <router-link v-if="product.category" :to='`/shop?category=${product.category.id}`'>
                      {{ product.category.name }}
                    </router-link>
                    <router-link v-else :to='`/shop?category=${null}`'>{{ $t("Uncategorized") }}</router-link>
                  </div><!-- End .product-cat -->

                  <client-only>
                    <div class="social-icons social-icons-sm">
                      <span class="social-label">{{ $t("Share") }}:</span>
                      <a :href="`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`" class="social-icon"
                         title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
                      <a :href="`https://twitter.com/intent/tweet?text=${currentURL}`" class="social-icon"
                         title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                      <!--                      <a href="#" class="social-icon" title="Instagram" target="_blank"><i class="icon-instagram"></i></a>-->
                    </div>
                  </client-only>



                </div><!-- End .product-details-footer -->
              </div><!-- End .product-details -->
            </div><!-- End .col-md-6 -->
          </div><!-- End .row -->
        </div><!-- End .product-details-top -->

        <SingelProductTabs :product="product"></SingelProductTabs>

        <!--        <h2 class="title text-center mb-4">{{ $t("You May Also Like") }}</h2>&lt;!&ndash; End .title text-center &ndash;&gt;-->
        <!--        <ProductsSlider />-->
        <!--        <product-sticky-bar :product="product" :selected-qty="selectedQty"-->
        <!--        :selected-size="selectedSize" :selected-color="selectedColor" ></product-sticky-bar>-->
      </div><!-- End .container -->
    </div><!-- End .page-content -->
  </div>
</template>

<script>
import ProductsSlider from '~/components/Elements/ProductsSlider'
import ProductStickyBar from "~/components/Elements/productStickyBar";
import SingelProductTabs from "~/components/SingleProduct/SingelProductTabs";

export default {
  name: 'singleView',
  components: {SingelProductTabs, ProductStickyBar, ProductsSlider},
  async asyncData({$repo, store, route, error}) {
    try {
      const productId = route.params.id
      const product = await $repo.Products.getSingleProduct(productId)
      if(!product.data.status) return error({ statusCode: 404, message: 'no products found' })
      store.commit('initSingleProduct', product.data.data)
    } catch (err) {
      console.log("error in asyncData singleView")
      console.log(err)
    }
  },
  methods: {
    validatePage: function () {
      const validator = {
        isValid: true,
        message: ''
      }
      if (this.selectedSize === -1) {
        validator.isValid = false
        validator.message = `${this.$t("please select the size")}.`
        return validator
      }
      if(this.product.colors[this.selectedColor].sizes[this.selectedSize].qty==='0'){
        validator.isValid = false
        validator.message = `${this.$t("the selected size is out of stock")}.`
        return validator
      }
      if(this.selectedQty===-1){
        validator.isValid = false
        validator.message = `${this.$t("choose the qty")}.`
        return validator
      }
      return validator
      // if(){
      //   validator.isValid = false
      //   validator.message = `${this.$t("promo code")} ${this.$t("is required")}`
      //   return validator
      // }


    },

    selectColor: function (clickedColorIndex) {
      this.selectedColor = clickedColorIndex
      this.resetSelectedSize()
      this.resetSelectedQty()
    },
    selectSize: function (clickedSizeIndex) {
      this.selectedSize = clickedSizeIndex
      this.resetSelectedQty()
    },
    selectImage: function (clickedImageIndex, isColor) {
      this.selectedImage.index = clickedImageIndex
      this.selectedImage.color = isColor
    },
    resetSelectedQty: function () {
      this.selectedQty = 1
      document.getElementById('qty').value = 1
    },
    resetSelectedSize: function () {
      this.selectedSize = 0
    },
    addToCart: function () {
      const validator = this.validatePage()
      if (!validator.isValid) {
        this.$swal.fire({
          title: this.$t('Missing data'),
          text: validator.message,
          icon: 'warning'
        })
        return false;
      }
      const cartProduct = {
        product_id: this.product.id,
        size: this.product.colors[this.selectedColor].sizes[this.selectedSize].size,
        color_name: this.product.colors[this.selectedColor].name,
        color: this.product.colors[this.selectedColor].id,
        qty: this.selectedQty,
        product_json: this.product,
        selected_color_index: this.selectedColor,
        price: this.getPrice(),
        max_qty: this.maxQty
      }
      try {
        this.$store.commit('addProductToCart', cartProduct)
      } catch (e) {
        this.$swal.fire({
          title: this.$t("Adding Operation Failed"),
          icon: 'error',
          text: this.$t(e.message)
        })
        return false;
      }
      this.$swal.fire({
        toast: true,
        title: this.$t("Add To Cart"),
        icon: "success",
        position: 'top-start',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        width: 250
      })

    },
    getPrice: function () {
      return this.product.discount ? this.product.discount.price : this.product.price
    },
  },
  data() {
    return {
      selectedColor: 0,
      selectedSize: -1,
      selectedQty: -1,
      selectedImage: {
        index: 0,
        color: true
      },
      currentURL: ""
    }
  },
  computed: {
    product: function () {
      return this.$store.state.products.singleProduct
    },
    maxQty: function () {
      return this.product.colors[this.selectedColor].sizes[this.selectedSize >= 0 ? this.selectedSize : 0].qty
    },
    isOutOfStock: function (){
      for(let i=0, arr=this.product.colors[this.selectedColor].sizes;i<arr.length;i++){
        if(typeof arr[i].qty==='string'){
          if(arr[i].qty!=='0')return false
        }else{
          if(arr[i].qty!== 0)return false

        }
      }
      return true
    },
  },
  mounted() {
    this.currentURL = window.location.href
  },
  head() {
    return {
      title: this.product.name ,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product.description
        },

        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },

        {
          hid: 'og:title',
          name: 'og:title',
          content: this.product.name
        },

        {
          hid: 'og:description',
          name: 'og:description',
          content: this.product.description
        },

        {
          hid: 'og:image',
          name: 'og:image',
          content: this.product.colors[this.selectedColor].image
        },

        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },

         {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.product.name
        },

        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.product.description
        },
                {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.product.colors[this.selectedColor].image
        },
      ],

    };
  },
}
</script>

<style>
.header-11 {
  position: relative !important;
  background: #333;
}

.header .container {
  height: 86px;
}

.shipping-details-icons{
  font-size: 3.6rem;
  color: #245865;
}

</style>
