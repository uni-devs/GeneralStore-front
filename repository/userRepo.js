export default function ($axios) {
  return {
    addAddress: function (address){
      return $axios.post(`/me/addresses/add`, address)
  },
    getAllAddresses: function (){
      return $axios.get(`/me/addresses`)
    },
    deteleAddress: function (addressId){
      $axios.delete(`/me/addresses/delete/${addressId}`)
    },
    cartSync: function (cart){
      $axios.patch(`/me/cart`, cart)
    },
    getCart: function (){
      return $axios.get(`/me/cart`)
    },
    sendOTP: function (){
      return $axios.get(`/me/resendCode`)
    },
    verifyOTP: function (OTP){
      return $axios.post(`/me/verifyAccount`, OTP)
    }
  }
}
