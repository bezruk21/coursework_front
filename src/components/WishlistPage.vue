<template>
  <div class="cart-page-wrapper">
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <router-link to="/" class="navbar-logo">
        PLATINUM
        <span class="logo-separator"></span>
        <em class="logo-accent">RENT</em>
      </router-link>
      <ul class="nav-links">
        <li><router-link to="/catalog" class="nav-link">КАТАЛОГ</router-link></li>
        <li><router-link to="/blog" class="nav-link">БЛОГ</router-link></li>
        <li><router-link to="/about" class="nav-link active">ПРО НАС</router-link></li>
      </ul>
      <div class="nav-actions">
        <button class="nav-icon-btn" @click="$router.push('/account')" title="Акаунт">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button class="nav-icon-btn active" @click="$router.push('/wishlist')" title="Обране">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span class="nav-badge" v-if="wishlistCount > 0">{{ wishlistCount }}</span>
        </button>
        <button class="nav-icon-btn" @click="$router.push('/cart')" title="Кошик">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span class="nav-badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </button>
        <button class="btn-book" @click="$router.push('/')">ЗАПИСАТИСЬ</button>
      </div>
    </nav>

    <div class="cart-page">
      <div class="cart-header">
        <h1>ОБРАНЕ</h1>
        <span class="cart-count" v-if="items.length > 0">{{ items.length }} позиції</span>
      </div>

      <div class="cart-empty" v-if="!loading && items.length === 0">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <p>Список бажань порожній</p>
        <router-link to="/catalog" class="btn-gold">ПЕРЕГЛЯНУТИ КАТАЛОГ</router-link>
      </div>

      <div class="cart-loading" v-if="loading"><div class="loader"></div></div>

      <div class="cart-content" v-if="!loading && items.length > 0">
        <div class="cart-items">
          <div class="cart-item" v-for="item in items" :key="item.dressId">
            <div class="item-image">
              <img :src="item.imageUrl || '/img/placeholder.jpg'" :alt="item.name" />
            </div>
            <div class="item-info">
              <span class="item-brand">{{ item.brand }}</span>
              <h3 class="item-name">{{ item.name }}</h3>
              <span class="item-price">{{ formatPrice(item.price) }} ₴ / день</span>
            </div>
            <button class="item-remove" @click="removeItem(item.dressId)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="cart-summary">
  <h2>ОБРАНЕ</h2>
  <div class="summary-row">
    <span>Позицій</span>
    <span>{{ items.length }}</span>
  </div>
  <router-link to="/catalog" class="btn-gold">ПРОДОВЖИТИ ВИБІР</router-link>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
  import { useToastStore } from '../stores/toast'
  import { useWishlistStore } from '../stores/wishlist'
import { useCartStore }     from '../stores/cart'
import axios from 'axios'

const API = 'http://localhost:5008/api'
const authStore = useAuthStore()
const router = useRouter()
const items = ref([])
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const loading = ref(true)
const isScrolled = ref(false)
const wishlistCount = computed(() => wishlistStore.count || 0)
const cartCount     = computed(() => cartStore.count     || 0)
window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 40 })

async function fetchWishlist() {
  if (!authStore.user) return
  try {
    const { data } = await axios.get(`${API}/wishlist/${authStore.user.id}`)
    items.value = data.items
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function removeItem(dressId) {
const toast = useToastStore()
  await axios.post(`${API}/wishlist/${authStore.user.id}/toggle/${dressId}`)
  fetchWishlist()
}

function formatPrice(p) {
  return Number(p).toLocaleString('uk-UA')
}

onMounted(() => {
  wishlistStore.fetchWishlist()
  cartStore.fetchCartCount()
  if (!authStore.user) { router.push('/login'); return }
  fetchWishlist()
})
</script>

<style scoped>
.cart-page-wrapper {
  min-height: 100vh;
  background: var(--black, #0e0e0e);
  color: var(--cream, #fff);
  font-family: var(--font-body, inherit);
  font-weight: 300;
  line-height: 1.7;
  overflow-x: hidden;
}

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
  transition: background var(--transition, 0.4s), padding var(--transition, 0.4s);
}

.navbar.scrolled {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 16px 48px;
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
}

.navbar-logo {
  font-family: var(--font-display, inherit);
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--cream, #f5f0e8);
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-accent {
  color: var(--gold, #c9a84c);
  font-style: italic;
}

.logo-separator {
  width: 20px;
  height: 1px;
  background: var(--gold, #c9a84c);
  display: inline-block;
  vertical-align: middle;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cream-muted, #888);
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: color var(--transition-fast, 0.2s);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold, #c9a84c);
  transition: width var(--transition, 0.4s);
}

.nav-link:hover,
.nav-link.active {
  color: var(--gold, #c9a84c);
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
  color: var(--cream-muted, #888);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: color var(--transition-fast, 0.2s);
  border-radius: var(--radius-full, 50%);
  position: relative;
}

.nav-icon-btn:hover,
.nav-icon-btn.active {
  color: var(--gold, #c9a84c);
}

/* ===================== SHARED BUTTON STYLE ===================== */
.btn-book {
  background: transparent;
  border: 1px solid var(--gold, #c9a84c);
  color: var(--gold, #c9a84c);
  padding: 10px 28px;
  font-family: var(--font-body, inherit);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: var(--radius-full, 50px);
  position: relative;
  overflow: hidden;
  transition: color var(--transition, 0.4s);
}

.btn-book::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold, #c9a84c);
  transform: translateX(-100%);
  transition: transform var(--transition, 0.4s);
  z-index: -1;
}

.btn-book:hover {
  color: var(--black, #0a0a0a);
}

.btn-book:hover::before {
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
  font-family: var(--font-display, inherit);
  font-size: 36px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--cream, #fff);
}

.cart-count {
  color: var(--grey-text, #666);
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
  color: var(--grey-dark, #333);
  font-size: 48px;
}

.cart-empty p {
  color: var(--grey-text, #555);
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
  border: 1px solid var(--grey-dark, #333);
  border-top-color: var(--gold, #c9a84c);
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
/* Зверніть увагу: grid-template-columns налаштовано під вашу структуру (картинка, інфо, видалення), але розміри з прикладу */
.cart-item {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 28px 0;
  border-bottom: 1px solid rgba(201, 168, 76, 0.08);
  transition: background var(--transition, 0.4s);
}

.item-image {
  width: 110px;
  height: 140px;
  overflow: hidden;
  background: var(--grey-dark, #111);
  border-radius: var(--radius-md, 8px);
  border: 1px solid rgba(201, 168, 76, 0.08);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition, 0.4s);
}

.cart-item:hover .item-image img {
  transform: scale(1.04);
}

.item-brand {
  display: block;
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold, #c9a84c);
  margin-bottom: 6px;
  font-weight: 500;
}

.item-name {
  font-family: var(--font-display, inherit);
  font-size: 18px;
  font-weight: 400;
  color: var(--cream, #fff);
  margin: 0 0 8px;
  line-height: 1.2;
}

.item-price {
  font-size: 12px;
  color: var(--grey-text, #555);
  letter-spacing: 0.05em;
}

.item-remove {
  background: transparent;
  border: 1px solid transparent;
  color: var(--grey-mid, #333);
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full, 50%);
  font-size: 16px;
  transition: border-color var(--transition, 0.4s), color var(--transition, 0.4s);
}

.item-remove:hover {
  border-color: rgba(201, 168, 76, 0.3);
  color: var(--gold, #c9a84c);
}

/* ===================== CART SUMMARY ===================== */
.cart-summary {
  background: var(--black-soft, #111);
  border: 1px solid rgba(201, 168, 76, 0.12);
  border-radius: var(--radius-md, 8px);
  padding: 36px;
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-summary h2 {
  font-family: var(--font-display, inherit);
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--cream, #fff);
  margin-bottom: 4px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--grey-text, #666);
  letter-spacing: 0.05em;
}

/* ===================== SUMMARY BUTTON ===================== */
.btn-gold {
  display: block;
  text-align: center;
  background: transparent;
  border: 1px solid var(--gold, #c9a84c);
  color: var(--gold, #c9a84c);
  padding: 16px 40px;
  font-family: var(--font-body, inherit);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  border-radius: var(--radius-full, 50px);
  position: relative;
  overflow: hidden;
  transition: color var(--transition, 0.4s);
}

.btn-gold::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold, #c9a84c);
  transform: translateX(-100%);
  transition: transform var(--transition, 0.4s);
  z-index: -1;
}

.btn-gold:hover {
  color: var(--black, #0e0e0e);
}

.btn-gold:hover::before {
  transform: translateX(0);
}
</style>