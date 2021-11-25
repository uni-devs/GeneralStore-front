<template>
  <li id="MobileCategoriesMenu">
    <a href="javascript:void(0);">{{ $t("Categories") }}</a>
    <ul>
      <li v-for="(category, index) in categories" :key="'MobileCat'+index">
        <router-link class="mobile-menu-link" :to="{name:'shop', query:{category:category.id.toString()}}">{{ category.name }}</router-link>
      </li>
    </ul>
  </li>

</template>

<script>
export default {
  name: "MobileCategoriesMenu",
  computed:{
    categories: function (){
      return this.$store.state.categories.data
    }
  }
}
</script>

<style scoped>

</style>
