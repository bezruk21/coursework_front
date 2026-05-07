<template>
  <div class="cart-page-wrapper">
    <!-- NAVBAR -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <router-link to="/" class="navbar-logo">
        PLATINUM
        <span class="logo-separator"></span>
        <em class="logo-accent">RENT</em>
      </router-link>

      <ul class="nav-links">
        <li><router-link to="/catalog" class="nav-link">КАТАЛОГ</router-link></li>
        <li><a href="#" class="nav-link">ЯК ЦЕ ПРАЦЮЄ</a></li>
        <li><a href="#" class="nav-link">БЛОГ</a></li>
        <li><a href="#" class="nav-link">ПРО НАС</a></li>
      </ul>

      <div class="nav-actions">
        <button class="nav-icon-btn" @click="$router.push('/account')" title="Акаунт">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button class="nav-icon-btn" @click="$router.push('/wishlist')" title="Обране">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button class="nav-icon-btn active" @click="$router.push('/cart')" title="Кошик">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </button>
        <button class="btn-book" @click="$router.push('/')">ЗАПИСАТИСЬ</button>
      </div>
    </nav>

    <!-- ВМІСТ -->
    <div class="cart-page">
      <div class="cart-header">
        <h1>КОШИК</h1>
        <span class="cart-count" v-if="cart.Count > 0">{{ cart.Count }} позиції</span>
      </div>

      <div class="cart-empty" v-if="!loading && cart.Items?.length === 0">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <p>Ваш кошик порожній</p>
        <router-link to="/catalog" class="btn-gold">ПЕРЕГЛЯНУТИ КАТАЛОГ</router-link>
      </div>

      <div class="cart-loading" v-if="loading"><div class="loader"></div></div>

      <div class="cart-items">
  <div class="cart-item" v-for="item in cart.Items" :key="item.dressId">
    <div class="item-image">
      <img :src="item.imageUrl || '/img/placeholder.jpg'" :alt="item.dressName" />
    </div>
    <div class="item-info">
      <span class="item-brand">{{ item.brand }}</span>
      <h3 class="item-name">{{ item.dressName }}</h3>
      <span class="item-price">{{ formatPrice(item.price) }} ₴ / день</span>
    </div>
    <div class="item-qty">
      <button class="qty-btn" @click="updateQty(item, item.quantity - 1)">−</button>
      <span>{{ item.quantity }}</span>
      <button class="qty-btn" @click="updateQty(item, item.quantity + 1)">+</button>
    </div>
    <div class="item-subtotal">{{ formatPrice(item.subtotal) }} ₴</div>
    <button class="item-remove" @click="removeItem(item.dressId)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>


        <div class="cart-summary">
          <h2>ПІДСУМОК</h2>
          <div class="summary-row">
  <span>Позицій</span><span>{{ cart.Count ?? 0 }}</span>
</div>
<div class="summary-row total">
  <span>РАЗОМ</span><span>{{ formatPrice(cart.Total ?? 0) }} ₴</span>
</div>
          <button class="btn-gold" @click="checkout">ОФОРМИТИ ЗАМОВЛЕННЯ</button>
          <router-link to="/catalog" class="btn-outline">ПРОДОВЖИТИ ВИБІР</router-link>
          <button class="btn-clear" @click="clearCart">Очистити кошик</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useOrdersStore } from '../stores/orders'
 import { useToastStore } from '../stores/toast'
import axios from 'axios'


const API = 'http://localhost:5008/api'
const authStore = useAuthStore()
const router = useRouter()
const ordersStore = useOrdersStore()

const cart = ref({ Items: [], Count: 0, Total: 0 })
const loading = ref(true)
const isScrolled = ref(false)

window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 40 })

async function fetchCart() {
  if (!authStore.user) return
  try {
    const { data } = await axios.get(`${API}/cart/${authStore.user.id}`)
    cart.value = {
      Items: data.items ?? [],
      Count: data.count ?? 0,
      Total: data.total ?? 0,
    }
  } catch (e) {
    console.error(e)
    cart.value = { Items: [], Count: 0, Total: 0 }
  } finally {
    loading.value = false
  }
}

async function updateQty(item, qty) {
  if (qty <= 0) return removeItem(item.dressId)
  await axios.patch(`${API}/cart/${authStore.user.id}/item/${item.dressId}`, qty, {
    headers: { 'Content-Type': 'application/json' }
  })
  fetchCart()
}


async function removeItem(dressId) {
const toast = useToastStore()
  await axios.delete(`${API}/cart/${authStore.user.id}/remove/${dressId}`)
  fetchCart()
}

async function clearCart() {
const toast = useToastStore()
  await axios.delete(`${API}/cart/${authStore.user.id}/clear`)
  fetchCart()
}

function checkout() {
  ordersStore.addOrder({
    name: product.name,
    brand: product.brand,
    imageUrl: product.imageUrl,
    price: product.price,
    dateFrom: selectedDateFrom.value,
    dateTo: selectedDateTo.value,
  })
  router.push('/account')
}
function formatPrice(p) { return Number(p).toLocaleString('uk-UA') }

onMounted(() => {
  if (!authStore.user) { router.push('/login'); return }
  fetchCart()
})
</script>

<style scoped>
.cart-page-wrapper {
  min-height: 100vh;
  background: var(--black);
  color: var(--cream);
  font-family: var(--font-body);
  font-weight: 300;
  line-height: 1.7;
  overflow-x: hidden;
}
 
/* ===================== SCROLLBAR ===================== */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--black); }
::-webkit-scrollbar-thumb { background: var(--gold-dark); border-radius: 2px; }
 
/* ===================== NAVBAR ===================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 24px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background var(--transition), padding var(--transition);
}
 
.navbar.scrolled {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 16px 48px;
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
}
 
.navbar-logo {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--cream);
  display: flex;
  align-items: center;
  gap: 8px;
}
 
.logo-accent {
  color: var(--gold);
  font-style: italic;
}
 
.logo-separator {
  width: 20px;
  height: 1px;
  background: var(--gold);
  display: inline-block;
  vertical-align: middle;
}
 
.nav-links {
  display: flex;
  align-items: center;
  gap: 40px;
  list-style: none;
}
 
.nav-link {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cream-muted);
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: color var(--transition-fast);
}
 
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width var(--transition);
}
 
.nav-link:hover,
.nav-link.active {
  color: var(--gold);
}
 
.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
 
.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
 
.nav-icon-btn {
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: var(--cream-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: color var(--transition-fast);
  border-radius: var(--radius-full);
  position: relative;
}
 
.nav-icon-btn:hover,
.nav-icon-btn.active {
  color: var(--gold);
}
 
.nav-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 16px;
  height: 16px;
  background: var(--gold);
  color: var(--black);
  border-radius: 50%;
  font-size: 9px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
 
/* — btn-book / btn-primary shared style — */
.btn-book,
.btn-primary {
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 10px 28px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: var(--radius-full);
  position: relative;
  overflow: hidden;
  transition: color var(--transition);
}
 
.btn-book::before,
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold);
  transform: translateX(-100%);
  transition: transform var(--transition);
  z-index: -1;
}
 
.btn-book:hover,
.btn-primary:hover {
  color: var(--black);
}
 
.btn-book:hover::before,
.btn-primary:hover::before {
  transform: translateX(0);
}
 
/* ===================== CART PAGE ===================== */
.cart-page {
  padding: 120px 60px 80px;
  max-width: 1200px;
  margin: 0 auto;
}
 
.cart-header {
  display: flex;
  align-items: baseline;
  gap: 20px;
  margin-bottom: 60px;
  border-bottom: 1px solid rgba(201, 168, 76, 0.12);
  padding-bottom: 30px;
}
 
.cart-header h1 {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--cream);
}
 
.cart-count {
  color: var(--grey-text);
  font-size: 13px;
  letter-spacing: 0.1em;
}
 
/* ===================== EMPTY / LOADING ===================== */
.cart-empty {
  text-align: center;
  padding: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
 
.empty-icon {
  color: var(--grey-dark);
  font-size: 48px;
}
 
.cart-empty p {
  color: var(--grey-text);
  font-size: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
 
.cart-loading {
  display: flex;
  justify-content: center;
  padding: 100px;
}
 
.loader {
  width: 32px;
  height: 32px;
  border: 1px solid var(--grey-dark);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
 
@keyframes spin {
  to { transform: rotate(360deg); }
}
 
/* ===================== CART CONTENT ===================== */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 60px;
  align-items: start;
}
 
.cart-items {
  display: flex;
  flex-direction: column;
}
 
/* ===================== CART ITEM ===================== */
.cart-item {
  display: grid;
  grid-template-columns: 110px 1fr auto auto auto;
  gap: 24px;
  align-items: center;
  padding: 28px 0;
  border-bottom: 1px solid rgba(201, 168, 76, 0.08);
  transition: background var(--transition);
}
 
.item-image {
  width: 110px;
  height: 140px;
  overflow: hidden;
  background: var(--grey-dark);
  border-radius: var(--radius-md);
  border: 1px solid rgba(201, 168, 76, 0.08);
}
 
.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
}
 
.cart-item:hover .item-image img {
  transform: scale(1.04);
}
 
.item-brand {
  display: block;
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 6px;
  font-weight: 500;
}
 
.item-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 400;
  color: var(--cream);
  margin: 0 0 8px;
  line-height: 1.2;
}
 
.item-price {
  font-size: 12px;
  color: var(--grey-text);
  letter-spacing: 0.05em;
}
 
/* ===================== QTY CONTROL ===================== */
.item-qty {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  color: var(--cream);
}
 
.qty-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid var(--grey-mid);
  color: var(--grey-text);
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  transition: border-color var(--transition), color var(--transition), background var(--transition);
}
 
.qty-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}
 
/* ===================== ITEM SUBTOTAL & REMOVE ===================== */
.item-subtotal {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 300;
  color: var(--gold-light);
  min-width: 90px;
  text-align: right;
  letter-spacing: 0.05em;
}
 
.item-remove {
  background: transparent;
  border: 1px solid transparent;
  color: var(--grey-mid);
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  font-size: 16px;
  transition: border-color var(--transition), color var(--transition);
}
 
.item-remove:hover {
  border-color: rgba(201, 168, 76, 0.3);
  color: var(--gold);
}
 
/* ===================== CART SUMMARY ===================== */
.cart-summary {
  background: var(--black-soft);
  border: 1px solid rgba(201, 168, 76, 0.12);
  border-radius: var(--radius-md);
  padding: 36px;
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
 
.cart-summary h2 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--cream);
  margin-bottom: 4px;
}
 
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--grey-text);
  letter-spacing: 0.05em;
}
 
.summary-row.total {
  color: var(--cream);
  font-size: 15px;
  letter-spacing: 0.05em;
  padding-top: 20px;
  border-top: 1px solid rgba(201, 168, 76, 0.12);
  margin-top: 4px;
}
 
.summary-row.total span:last-child {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 300;
  color: var(--gold-light);
}
 
/* ===================== SUMMARY BUTTONS ===================== */
 
/* Основна кнопка — золотий slide-in ефект */
.btn-gold {
  display: block;
  text-align: center;
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 16px 40px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  border-radius: var(--radius-full);
  position: relative;
  overflow: hidden;
  transition: color var(--transition);
}
 
.btn-gold::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold);
  transform: translateX(-100%);
  transition: transform var(--transition);
  z-index: -1;
}
 
.btn-gold:hover {
  color: var(--black);
}
 
.btn-gold:hover::before {
  transform: translateX(0);
}
 
/* Вторинна кнопка */
.btn-outline {
  display: block;
  text-align: center;
  background: transparent;
  border: 1px solid rgba(201, 168, 76, 0.2);
  color: var(--grey-text);
  padding: 14px 40px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  border-radius: var(--radius-full);
  transition: border-color var(--transition), color var(--transition);
}
 
.btn-outline:hover {
  border-color: var(--gold);
  color: var(--gold);
}
 
/* Кнопка очистити */
.btn-clear {
  background: transparent;
  border: none;
  color: var(--grey-mid);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
  padding: 8px;
  transition: color var(--transition);
}
 
.btn-clear:hover {
  color: var(--grey-text);
}
 
/* ===================== ANIMATIONS ===================== */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
 
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
 
/* ===================== REVEAL ===================== */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
 
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>