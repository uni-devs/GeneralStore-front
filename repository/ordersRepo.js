export default function ($axios) {
  return {
    makeOreder: function (order){
      return $axios.post(`/orders/make`, order)
  },
    promoCodeCheck: function (promoCode){
      return $axios.post(`/promocode/check`, promoCode)
    },
    ordersHistory: function (){
      return $axios.get(`/me/orders/history`)
    }
  }
}
