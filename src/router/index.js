import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Catalog from '../components/Catalog.vue'
import DressView from '../components/DressView.vue'
import AccountPage from '../components/AccountPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import AdminPanel from '../components/AdminPanel.vue'
import WishlistPage from '../components/WishlistPage.vue'
import CartPage from '../components/CartPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: Catalog },
  { path: '/dress/:id', component: DressView },
  { path: '/account', component: AccountPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/cart', component: CartPage },
  { path: '/wishlist', component: WishlistPage },
  {
    path: '/admin',
    component: AdminPanel,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.email === 'admin@platinum.com') {
        next()
      } else {
        next('/')
      }
    }
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})