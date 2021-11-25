export default function ($axios) {
  return {
    getAll: async function (categoryId, sizes, tag  , perPage= 9, page=1) {
      if(tag==='undefined')tag=undefined
      let paramsList = `?perPage=${perPage}&page=${page}`
      if(categoryId) paramsList += `&categories=${categoryId}`
      if(sizes) paramsList += `&sizes=${sizes}`
      if(tag) paramsList += `&tags=${tag}`
      return  await $axios.get(`/products${paramsList}`);
    },
    getSingleProduct: async function(productId){
      return await $axios.get(`/products/get/${productId}`)
    },
    getNewArrivals: async function(perPage=3){
      return await $axios.get(`/products/new?perPage=${perPage}`)
    },
    productsSearch: function (search, perPage, page){
      return $axios.get(`/products/search?search=${search}&perPage=${perPage}&page=${page}`)
    },
    getBestSelling: function (numberOfProducts){
      return $axios.get(`/products/random/${numberOfProducts}`)
    }

  }
}
