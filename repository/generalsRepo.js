export default function ($axios) {
  return {
    getSizes: function() {
      return $axios.get('/generals/getSizes');
    },
    getStates: function(){
      return $axios.get("/generals/getStates")
    },
    getOrdersInfo: function(){
      return $axios.get("/generals/order")
    },
    getSliders: function (){
      return $axios.get(`/frontend/getSlider`)
    }
  }
}
