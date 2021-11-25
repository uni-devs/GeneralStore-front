export default function ($axios) {
  return {
    Products: require("./productsRepo").default($axios),
    Auth: require("./authRepo").default($axios),
    Categories: require("./categoriesRepo").default($axios),
    General: require('./generalsRepo').default($axios),
    User: require('./userRepo').default($axios),
    Orders: require('./ordersRepo').default($axios),
  }
}
