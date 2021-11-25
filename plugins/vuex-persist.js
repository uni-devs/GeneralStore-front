import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    //options
    reducer: (state) => ({cart: state.cart})
  }).plugin(store);
}
