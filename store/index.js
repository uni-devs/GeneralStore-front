
export const state = () => ({
categories:{
  data:[],
},
  products:{
    data:[],
    searchProducts:[],
    searchProductsCount:0,
    bestSelling:[],
    totalCount:0,
    cache:[],
    singleProduct:{},
    arrivals:[],
    offers:[]
  },
  sizes:{
  data:[],
  },
  cart:{
  products:[],
    promoCode:{
      discount:0
    },
  },
  generals:{
    states:[],
    addresses:[],
    ordersInfo:[],
    ordersHistory:[],
    showVerificationSwal:true,
    sliders:[]
  }
})

export const mutations = {
initCategories: function (state, categories){
  state.categories.data = categories
},

  initProducts: function (state, products){
  state.products.data = products.data
    state.products.totalCount = products.total
  },
  loadMoreProducts: function (state){
  state.products.data = state.products.data.concat(state.products.cache)
    state.products.cache = []
  },
  cacheProducts: function (state, products){
  state.products.cache = products
  },

  initSizes: function (state, sizes){
  state.sizes.data = sizes
  },

  initSingleProduct: function (state, product){
  state.products.singleProduct = product
  },

  initArrivals: function (state, products){
  state.products.arrivals = products
  },

  addProductToCart: function (state, product){
  for(let i=0, arr=state.cart.products;i<arr.length;i++){
    if(arr[i].product_id === product.product_id && arr[i].size===product.size){
      if(arr[i].qty+1<=arr[i].max_qty){
        arr[i].qty++
        return
      }
      else{
        throw new DOMException("Maximum Qty Reached");
      }
    }
  }
  state.cart.products.push(product)
  },
  removeProductFromCart: function (state, productId){
  state.cart.products.splice(state.cart.products.findIndex(element=>element.product_id === productId),1)
  },
  updateCartProductQty: function (state, newQtyData){
  state.cart.products.find(product=>product.product_id === newQtyData.productId).qty = newQtyData.qty
  },
  emptyCart: function (state){
  state.cart.products = Object.assign([],[])
  },



  initStates: function (state, states){
    state.generals.states = states
  },

  initAddresses:function (state, addresses){
    state.generals.addresses = addresses
  },
  addAddress: function (state, address){
    state.generals.addresses.push(address)
  },
  deleteAddress: function (state, addressId){
  state.generals.addresses.splice(state.generals.addresses.findIndex(address=>address.id===addressId), 1)
  },
  destroyAddresses: function (state){
  state.generals.addresses = []
  },


  initOrdersInfo:function (state, ordersInfo){
    state.generals.ordersInfo = ordersInfo
  },

  setPromoCode: function (state, promoCode){
    state.cart.promoCode = promoCode
  },
  deletePromoCode: function (state){
    state.cart.promoCode = Object.assign({discount:0}, {})
  },


  initOrdersHistory: function (state, ordersHistory){
  state.generals.ordersHistory = ordersHistory
  },
  destroyOrdersHistory: function (state){
  state.generals.ordersHistory = Object.assign([],[])
  },


  initSearchProduct: function (state, products){
  state.products.searchProducts = products.data
    state.products.searchProductsCount = products.total
  },

  initBestSelling: function (state, products){
  state.products.bestSelling = products
  },

  showVerificationSwal: function (state){
  state.generals.showVerificationSwal = true
  },
  dontShowVerificationSwal: function (state){
    state.generals.showVerificationSwal = false
  },

  initSliders: function (state, sliders){
    state.generals.sliders = sliders
  },

  initOffers: function (state, products){
  state.products.offers = products
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {

    await dispatch('storeDispatchFunc')
  },

  async storeDispatchFunc({ commit }) {


  },

}

