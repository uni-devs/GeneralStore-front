<template>
  <div id="shopPage">
    <div class="page-header text-center" style="background-image: url('/assets/images/backgrounds/cta/bg-7.jpg')">
      <div class="container">
        <h1 class="shop-page-title" >{{pageTitle}} <span v-if="$route.query.tag">{{ $route.query.tag }}</span></h1>
      </div><!-- End .container -->
    </div><!-- End .page-header -->

    <div class="page-content">
      <div class="container">
        <div class="row mt-2">
          <div class="col-lg-9">

            <div class="toolbox">
              <div class="toolbox-left">
                <div class="toolbox-info">
                  {{ $t("Showing") }} <span>{{ products.length }} {{ $t("of") }} {{ totalCount }}</span> {{ $t("Products") }}
                </div><!-- End .toolbox-info -->
              </div><!-- End .toolbox-left -->

            </div><!-- End .toolbox -->


            <div class="products mb-3">
              <div class="row justify-content-center">

                <div v-for="product in products" :key="product.id+'product'" class="col-6 col-md-4 col-lg-4">
                  <ProductCard :product="product"/>
                </div>

              </div><!-- End .row -->
            </div><!-- End .products -->
<!--            <pagination v-if="productsFound"></pagination>-->

            <div class="row justify-content-center">
              <button class="btn btn-outline-primary-2 btn-more w-100 "
                      @click="loadCache"
              :class="{'disabled-hidden':cacheLength===0}">{{$t("Discovre More")}}</button>

            </div>
            <div class="row ">
              <div class="col ">
                  <img src="/assets/images/meem/noProductsImage.jpg" v-if="!productsFound" class="m-auto">
              </div>
            </div>
          </div><!-- End .col-lg-9 -->
          <aside class="col-lg-3 order-lg-first">
            <filter-bar></filter-bar>
          </aside><!-- End .col-lg-3 -->
        </div><!-- End .row -->
      </div><!-- End .container -->
    </div><!-- End .page-content -->
  </div>

</template>

<script>
import ProductCard from "~/components/Elements/ProductCard";
import FilterBar from "~/components/Elements/FilterBar";
import Pagination from "~/components/Elements/pagination";
import login from "~/pages/auth/login";
export default {
  name: "shop",
  components: {Pagination, FilterBar, ProductCard},
  async asyncData({$repo, route, store}){
    let page = 1, perPage = 9
    try{
      const categoryId = route.query.category
      const sizes = route.query.sizes
      const tag = route.query.tag
      const products = await $repo.Products.getAll(categoryId, sizes, encodeURI(tag), perPage, page)
      if(products.data.data.length) page++
      store.commit('initProducts', products.data)
    }catch (err){
      console.log("error in asyncData shop")
      console.log(err)
      return false
    }
    return {page:page, perPage:perPage}
  },
  mounted() {
    this.updatePageTitle()
    this.cacheData()
  },
  data(){
    return{
      selectedCategories:"",
      pageTitle:this.$t("All Products")
    }
  },
  methods:{
    selectCategory: function (categoryId){
      if(this.selectedCategories.length ===0)
        this.selectedCategories += categoryId
      else
        this.selectedCategories += (',' + categoryId)

    },
    updatePageTitle: function (){
      if (this.$route.query.category) {
        let category = ''
         this.$store.state.categories.data.filter(cat => {
          for(let i=0, arr=this.$route.query.category.split(',');i<arr.length;i++){
            if(arr[i] == cat.id) {
              if(category.length===0)
              category += cat.name
              else
                category += (this.$t(', ')+cat.name)
              break;
            }
          }
        })
        this.pageTitle = category
      }else {
        this.pageTitle = this.$t("All Products")
      }

    },
      cacheData: function (){
      const categoryId = this.$route.query.category
      const sizes = this.$route.query.sizes
      const tag = this.$route.query.tag
      this.$repo.Products.getAll(categoryId, sizes, encodeURI(tag), this.perPage, this.page).then(products=>{
        if(products.data.data.length)this.page++
        this.$store.commit('cacheProducts', products.data.data)
      }).catch(err=>{
        this.$swal.fire({
          title:this.$t("Something Went Wrong"),
          icon:"error",
          text:err.response.data.message
        })
        return false;

      })
    },
    loadCache: function (){
      this.$store.commit('loadMoreProducts')
      this.cacheData()
    }
  },
  computed:{
    products: function (){
      return this.$store.state.products.data;
    },
    productsFound: function (){
      return this.$store.state.products.data.length !== 0;
    },
    cacheLength: function (){
      return this.$store.state.products.cache.length
    },
    totalCount: function (){
      return this.$store.state.products.totalCount
    }
  },
  watch:{
    $route:async function (){
      const categoryId = this.$route.query.category
      const sizes = this.$route.query.sizes
      const tag = this.$route.query.tag
      let products
      this.page = 1
      try{
        products = await this.$repo.Products.getAll(categoryId, sizes, encodeURI(tag), this.perPage, this.page)
      }catch (err){
        this.$swal.fire({
          title:this.$t("Something Went Wrong"),
          icon:"error",
          text:err.response.data.message
        })
        return false;
      }
      if(products.data.data.length) this.page++
      this.$store.commit('initProducts', products.data)
      this.updatePageTitle()
      this.cacheData()
    }
  },
  head() {
    let desc = ''
    for(let i=0; i < (this.products.length <= 6?this.products.length:6);i++){
      desc += this.products[i].name
      desc += ' '
    }
    return {
      title:this.pageTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'متجر ميم  , تسوق اونلاين في فلسطين ارخص الاسعار بأفضل الخامات. التوصيل لباب البيت والدفع عند الاستلام'
        },
                {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://meem.ps/shop'
        },

        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },

        {
          hid: 'og:title',
          name: 'og:title',
          content: 'متجر ميم  - جميع المنتجات'
        },

        {
          hid: 'og:description',
          name: 'og:description',
          content: 'متجر ميم  , تسوق اونلاين في فلسطين ارخص الاسعار بأفضل الخامات. التوصيل لباب البيت والدفع عند الاستلام'
        },

        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://meem.ps/assets/images/meem/ogimage.png'
        },

        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },

         {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'متجر ميم  - جميع المنتجات'
        },

        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'متجر ميم  , تسوق اونلاين في فلسطين ارخص الاسعار بأفضل الخامات. التوصيل لباب البيت والدفع عند الاستلام'
        },
                {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://meem.ps/assets/images/meem/ogimage.png'
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
.shop-page-title{
  color: white !important;
}
</style>
