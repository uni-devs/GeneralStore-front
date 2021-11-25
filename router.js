import Vue from 'vue'
import Router from 'vue-router'
import {scrollBehavior} from '~/utils'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
  {path: '/', name: 'home', component: page('index.vue')},
  {path: '/p/:id/:name?', name: 'singleView', component: page('singleView.vue')},
  {path: '/shop', name: 'shop', component: page('shop.vue')},
  {path: '/cart', name: 'cart', component: page('cart.vue')},

  {path: '/categories', name: 'categories', component: page('categories.vue')},
  {path: '/checkout', name: 'checkout', component: page('checkout.vue')},
  {path: '/myAccount', name: 'myAccount', component: page('account/myAccount.vue')},
  {path: '/myAccount/verification', name: 'accountVerification', component: page('account/verification.vue')},
  {path: '/done', name: 'orderDone', component: page('generalPages/orderDone.vue')},


  {path:"/faq", name:"faq",component: page("generalPages/faq")},
  {path:"/privacyPolicy", name:"privacyPolicy",component: page("generalPages/privacyPolicy")},
  {path:"/returnPolicy", name:"returnPolicy",component: page("generalPages/returnPolicy")},
  {path:"/shippingPolicy", name:"shippingPolicy",component: page("generalPages/shippingPolicy")},
  {path:"/about", name:"about",component: page("generalPages/about")},
  {path:"/contactUs", name:"contactUs",component: page("generalPages/contactUs")},
  {path:"/search", name:"search",component: page("search")},


  // Auth Routes
  {path:"/login", name:"login",component: page("auth/login")},
  {path:"/register", name:"register",component: page("auth/register")},
  {path:"/resetPassword", name:"resetPassword",component: page("auth/resetPassword")},
  {path:"/resetPassword/check", name:"resetPasswordPhase2",component: page("auth/resetPasswordPhase2")},


  {path:"/tst", name:"tst",component: page("testpage")},

];


export function createRouter() {
  return new Router({
    routes,
    scrollBehavior,
    mode: 'history'
  })
}
