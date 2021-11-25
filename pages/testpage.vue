<template>
  <div id="app">
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <button @click="reset">Reset</button>
    <p>{{formattedElapsedTime}}</p>

    <ProductsSlider :is-offers="true" title="Special Offers"/>

  </div>
</template>

<script>

import ProductsSlider from "~/components/Elements/ProductsSlider";
export default {
  name: "App",
  components: {ProductsSlider},
  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
      selected : null,

    };
  },
  async asyncData(context){
    console.log(context)
    let products
    try{
      products = await context.$repo.Products.getBestSelling(9)
    }catch (err){
      console.log("error in async data")
      console.log(err)
    }
    context.store.commit("initOffers", products.data.data)
  },
  computed: {
    formattedElapsedTime() {
      if(this.elapsedTime === 10)return 0
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8) >=10?0:utc.substr(utc.indexOf(":") - 2, 8)
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    },
    test : function (){
      console.log(this.selected)
    }
  },
  mounted() {
    console.log(this.$nuxt.context.from)
  }
};

</script>
