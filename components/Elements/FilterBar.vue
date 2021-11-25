<template>
<div id="FilterBarElement">
  <div class="sidebar sidebar-shop">
    <div class="widget widget-clean">
      <label>{{ $t("Filters") }}:</label>
      <a href="#!"  class="sidebar-filter-clear" @click="clearAll">{{ $t("Clean All") }}</a>
    </div><!-- End .widget widget-clean -->

    <div class="widget widget-collapsible">
      <h3 class="widget-title">
        <a data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1">
          {{ $t("Category") }}
        </a>
      </h3><!-- End .widget-title -->

      <div class="collapse show" id="widget-1">
        <div class="widget-body">
          <div class="filter-items filter-items-count">
            <div class="filter-item" v-for="category in categories" :key="category.id + category.slug">
              <div class="custom-control custom-checkbox">
                <input v-model="checkedCategories" :value="category.id" type="checkbox" class="custom-control-input" :id="category.id + category.slug">
                <label class="custom-control-label" :for="category.id + category.slug">{{category.name}}</label>
              </div><!-- End .custom-checkbox -->
              <span class="item-count">{{category.products_count}}</span>
              <div v-for="childCategory in category.children" :key="childCategory.id + childCategory.slug">
                <div class="custom-control custom-checkbox">
                  <input v-model="checkedCategories" :value="childCategory.id" type="checkbox" class="custom-control-input" :id="childCategory.id + childCategory.slug">
                  <label class="custom-control-label" :for="childCategory.id + childCategory.slug">{{childCategory.name}}</label>
                </div><!-- End .custom-checkbox -->
                <span class="item-count">{{ childCategory.products_count }}</span>
              </div>
            </div><!-- End .filter-item -->
<!--            <div key="allProductsFillter">-->
<!--              <div class="custom-control custom-checkbox">-->
<!--                <input v-model="unCategorized" type="checkbox" class="custom-control-input" id="allProductsFillter">-->
<!--                <label class="custom-control-label" for="allProductsFillter">{{ $t("Uncategorized") }}</label>-->
<!--              </div>&lt;!&ndash; End .custom-checkbox &ndash;&gt;-->
<!--            </div>-->

          </div><!-- End .filter-items -->
        </div><!-- End .widget-body -->

      </div><!-- End .collapse -->
    </div><!-- End .widget -->

    <div class="widget widget-collapsible">
      <h3 class="widget-title">
        <a data-toggle="collapse" href="#widget-2" role="button" aria-expanded="true" aria-controls="widget-2">
          {{ $t("Size") }}
        </a>
      </h3><!-- End .widget-title -->

      <div class="collapse show" id="widget-2">
        <div class="widget-body">
          <div class="filter-items">
            <div class="filter-item" v-for="(size, index) in sizes" :key="index">
              <div class="custom-control custom-checkbox">
                <input :value="size" v-model="checkedSizes" type="checkbox" class="custom-control-input" :id="index + size">
                <label class="custom-control-label" :for="index + size ">{{size}}</label>
              </div><!-- End .custom-checkbox -->
            </div><!-- End .filter-item -->

          </div><!-- End .filter-items -->
        </div><!-- End .widget-body -->
      </div><!-- End .collapse -->
    </div><!-- End .widget -->

    <div class="widget widget-collapsible">
      <h3 class="widget-title">
        <a data-toggle="collapse" href="#widget-5" role="button" aria-expanded="true" aria-controls="widget-5">
          {{ $t("Price") }}
        </a>
      </h3><!-- End .widget-title -->

      <div class="collapse show" id="widget-5">
        <div class="widget-body">
          <div class="filter-price">
            <div class="filter-price-text">
              {{ $t("Price Range") }}:
              <span id="filter-price-range"></span>
            </div><!-- End .filter-price-text -->

            <div id="price-slider"></div><!-- End #price-slider -->
          </div><!-- End .filter-price -->
        </div><!-- End .widget-body -->
      </div><!-- End .collapse -->
    </div><!-- End .widget -->
  </div><!-- End .sidebar sidebar-shop -->
</div>
</template>

<script>
import ProductCard from "~/components/Elements/ProductCard";
export default {
  name: "FilterBar",
  components: {ProductCard},
  data(){
    return {
      checkedCategories:[],
      checkedSizes:[],
      markedCategories:[],
      loading:false,
    }
  },
  methods:{
    perforemSearch: function (){
      let cats = this.checkedCategories.join(",")
      let sizes = this.checkedSizes.join(',')
      this.$router.push({
        name:'shop',
        query:{
          category:cats,
          sizes:sizes
        }
      })
    },
    clearAll: function (){
      this.checkedCategories = []
      this.checkedSizes = []
      this.perforemSearch()
    }
  },
  computed:{
    categories:function (){
      return this.$store.state.categories.data
    },
    sizes: function (){
      return this.$store.state.sizes.data
    }
  },
  watch:{
    checkedCategories: function () {
      this.perforemSearch()
    },
    checkedSizes: function () {
      this.perforemSearch()
    }
  }
}
</script>

<style scoped>

</style>
