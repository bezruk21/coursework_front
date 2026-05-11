<template>
  <div class="account-wrapper">

    <!-- NAVBAR -->
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
        <button class="nav-icon-btn active" title="Акаунт">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button class="nav-icon-btn" @click="$router.push('/wishlist')" title="Обране">
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
        <button class="btn-book">ЗАПИСАТИСЬ</button>
      </div>
    </nav>

    <!-- НЕ АВТОРИЗОВАНИЙ -->
    <div class="auth-center" v-if="!authStore.isLoggedIn">
      <div class="auth-box">
        <div class="brand">PLATINUM — <em>RENT</em></div>
        <h2>Мій акаунт</h2>
        <p class="subtitle">Увійдіть або створіть акаунт</p>
        <div class="btn-group">
          <router-link to="/login" class="btn-gold">УВІЙТИ</router-link>
          <router-link to="/register" class="btn-outline">РЕЄСТРАЦІЯ</router-link>
        </div>
      </div>
    </div>

    <!-- АВТОРИЗОВАНИЙ -->
    <div class="profile-page" v-else>

      <!-- ХЕДЕР профілю -->
      <div class="profile-header">
        <div class="profile-avatar">
          {{ authStore.user.username?.charAt(0).toUpperCase() }}
        </div>
        <div class="profile-info">
          <h1>{{ authStore.user.username }}</h1>
          <p>{{ authStore.user.email }}</p>
        </div>
      </div>

      <!-- ТАБИ -->
      <div class="profile-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="profile-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.label }}</button>
      </div>

      <!-- ОСОБИСТІ ДАНІ -->
      <div class="profile-section" v-if="activeTab === 'personal'">
        <div class="section-header">
    <div class="section-title">ОСОБИСТІ ДАНІ</div>
    <button class="btn-edit" @click="editMode = !editMode">
      {{ editMode ? 'СКАСУВАТИ' : 'РЕДАГУВАТИ' }}
    </button>
  </div>

  <!-- VIEW MODE -->
  <div class="data-grid" v-if="!editMode">
    <div class="data-item">
      <span class="data-label">ІМ'Я</span>
      <span class="data-value">{{ authStore.user.username }}</span>
    </div>
    <div class="data-item">
      <span class="data-label">EMAIL</span>
      <span class="data-value">{{ authStore.user.email }}</span>
    </div>
    <div class="data-item">
      <span class="data-label">ТЕЛЕФОН</span>
      <span class="data-value">{{ authStore.user.phone || '—' }}</span>
    </div>
  </div>

  <!-- EDIT MODE -->
  <div class="edit-form" v-else>
    <div class="form-field">
      <label class="form-label">ІМ'Я</label>
      <input class="form-input" v-model="editForm.username" />
    </div>
    <div class="form-field">
      <label class="form-label">EMAIL</label>
      <input class="form-input" v-model="editForm.email" type="email" />
    </div>
    <div class="form-field">
      <label class="form-label">ТЕЛЕФОН</label>
      <input class="form-input" v-model="editForm.phone" type="tel" />
    </div>
    <div class="form-field">
      <label class="form-label">НОВИЙ ПАРОЛЬ</label>
      <input class="form-input" v-model="editForm.password" type="password" placeholder="залиште порожнім" />
    </div>
    <button class="btn-save" @click="saveProfile">ЗБЕРЕГТИ ЗМІНИ</button>
    <p class="save-msg" v-if="saveMsg">{{ saveMsg }}</p>
  </div>

        <button class="btn-logout" @click="logout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          ВИЙТИ З АКАУНТУ
        </button>
      </div>

      <!-- ІСТОРІЯ ЗАМОВЛЕНЬ -->
      <div class="profile-section" v-if="activeTab === 'orders'">
        <div class="section-title">ІСТОРІЯ ЗАМОВЛЕНЬ</div>
<div class="orders-empty" v-if="orders.length === 0">
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
  <p>Замовлень ще немає</p>
  <router-link to="/catalog" class="btn-gold">ПЕРЕГЛЯНУТИ КАТАЛОГ</router-link>
</div>

<div class="orders-list" v-else>
  <div class="order-card" v-for="order in orders" :key="order.id">
    <div class="order-card-header">
      <div class="order-meta">
        <span class="order-num">Замовлення #{{ order.id }}</span>
        <span class="order-date">{{ new Date(order.createdAt).toLocaleDateString('uk-UA') }}</span>
      </div>
      <div class="order-status-badge" :class="order.status">
        {{ order.status === 'pending' ? 'В обробці' : 'Завершено' }}
      </div>
    </div>

    <div class="order-items">
      <div class="order-item" v-for="item in order.items" :key="item.dressName">
        <div class="order-img">
          <img :src="item.imageUrl" :alt="item.dressName" />
        </div>
        <div class="order-info">
          <span class="order-brand">{{ item.brand }}</span>
          <span class="order-name">{{ item.dressName }}</span>
          <span class="order-qty">× {{ item.quantity }}</span>
        </div>
        <span class="order-price">{{ item.subtotal?.toLocaleString('uk-UA') }} ₴</span>
      </div>
    </div>

    <div class="order-card-footer">
      <span class="order-delivery">{{ order.deliveryType === 'showroom' ? 'Самовивіз' : 'Нова Пошта' }}</span>
      <span class="order-total">РАЗОМ: {{ order.total?.toLocaleString('uk-UA') }} ₴</span>
    </div>
  </div>
</div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useOrdersStore } from '../stores/orders'
import { useToastStore } from '../stores/toast'
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'
import axios from 'axios'

const API = 'http://localhost:5008/api'
const toast = useToastStore()
const ordersStore = useOrdersStore()
const authStore = useAuthStore()
const router = useRouter()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()        // ← додай присвоєння

// Бейджі для navbar
const wishlistCount = computed(() => wishlistStore.count || 0)
const cartCount = computed(() => cartStore.count || 0)

const isScrolled = ref(false)
const activeTab = ref('personal')
const orders = ref([])
const editMode = ref(false)
const saveMsg = ref('')
const editForm = ref({
  username: authStore.user?.username ?? '',
  email: authStore.user?.email ?? '',
  phone: authStore.user?.phone ?? '',
  password: '',
})

async function fetchOrders() {
  if (!authStore.user) return
  try {
    const { data } = await axios.get(`${API}/orders/${authStore.user.id}`)
    orders.value = data
  } catch (e) {
    console.error(e)
  }
}

function saveProfile() {
  authStore.updateUser({
    username: editForm.value.username,
    email: editForm.value.email,
    phone: editForm.value.phone,
  })
  editMode.value = false
  saveMsg.value = 'Дані успішно збережено'
  setTimeout(() => saveMsg.value = '', 3000)
}

const tabs = [
  { id: 'personal', label: 'ОСОБИСТІ ДАНІ' },
  { id: 'orders',   label: 'ІСТОРІЯ ЗАМОВЛЕНЬ' },
]



function logout() {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  fetchOrders()
  wishlistStore.fetchWishlist()
  cartStore.fetchCartCount()
  window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 40 })
})
</script>

<style scoped>
/* ===================== SCROLLBAR ===================== */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--black); }
::-webkit-scrollbar-thumb { background: var(--gold-dark); border-radius: 2px; }
 
/* ===================== REVEAL ===================== */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }
.reveal:nth-child(4) { transition-delay: 0.3s; }
 
/* ===================== NAVBAR ===================== */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 24px 48px;
  display: flex; align-items: center; justify-content: space-between;
  transition: background var(--transition), padding var(--transition);
}
.navbar.scrolled {
  background: rgba(10,10,10,0.95);
  backdrop-filter: blur(20px);
  padding: 16px 48px;
  border-bottom: 1px solid rgba(201,168,76,0.15);
}
.navbar-logo {
  font-size: 20px; font-weight: 400; letter-spacing: 0.15em;
  text-decoration: none; color: var(--cream);
  display: flex; align-items: center; gap: 8px;
}
.logo-accent { color: var(--gold); font-style: italic; }
.logo-separator { width: 20px; height: 1px; background: var(--gold); display: inline-block; }
.nav-links { display: flex; align-items: center; gap: 40px; list-style: none; margin: 0; padding: 0; }
.nav-link {
  font-size: 10px; font-weight: 500; letter-spacing: 0.25em;
  color: var(--cream-muted); text-decoration: none;
  position: relative; padding-bottom: 4px;
  transition: color var(--transition-fast);
}
.nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 0; height: 1px; background: var(--gold);
  transition: width var(--transition);
}
.nav-link:hover { color: var(--gold); }
.nav-link:hover::after { width: 100%; }
.nav-actions { display: flex; align-items: center; gap: 8px; }
.nav-icon-btn {
  width: 40px; height: 40px; background: transparent; border: none;
  color: var(--cream-muted); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-full);
  transition: color var(--transition-fast);
}
.nav-icon-btn:hover, .nav-icon-btn.active { color: var(--gold); }
.btn-book {
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 10px 28px;
  font-size: 10px; font-weight: 500; letter-spacing: 0.25em;
  cursor: pointer; border-radius: var(--radius-full);
  position: relative; overflow: hidden;
  transition: color var(--transition);
}
.btn-book::before {
  content: ''; position: absolute; inset: 0;
  background: var(--gold); transform: translateX(-100%);
  transition: transform var(--transition); z-index: -1;
}
.btn-book:hover { color: var(--black); }
.btn-book:hover::before { transform: translateX(0); }
 
/* ===================== AUTH CENTER ===================== */
.auth-center { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.auth-box {
  background: var(--black-soft);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: var(--radius-lg);
  padding: 60px 50px;
  min-width: 420px;
  text-align: center;
  box-shadow: 0 40px 80px rgba(0,0,0,0.6);
}
.brand { color: var(--cream); font-size: 13px; letter-spacing: 3px; margin-bottom: 40px; font-weight: 300; }
.brand em { color: var(--gold); font-style: italic; }
.auth-box h2 { font-size: 30px; font-weight: 300; color: var(--cream); margin-bottom: 10px; }
.subtitle { color: var(--grey-text); font-size: 14px; margin-bottom: 40px; }
.btn-group { display: flex; flex-direction: column; gap: 14px; }
 
.btn-gold {
  display: block; text-align: center;
  background: transparent; border: 1px solid var(--gold);
  color: var(--gold); padding: 15px 40px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.25em;
  text-decoration: none; border-radius: var(--radius-full);
  position: relative; overflow: hidden;
  transition: color var(--transition);
}
.btn-gold::before {
  content: ''; position: absolute; inset: 0;
  background: var(--gold); transform: translateX(-100%);
  transition: transform var(--transition); z-index: -1;
}
.btn-gold:hover { color: var(--black); }
.btn-gold:hover::before { transform: translateX(0); }
 
.btn-outline {
  display: block; text-align: center;
  background: transparent; border: 1px solid rgba(201,168,76,0.2);
  color: var(--grey-text); padding: 15px 40px;
  font-size: 11px; font-weight: 500; letter-spacing: 0.25em;
  text-decoration: none; border-radius: var(--radius-full);
  transition: border-color var(--transition), color var(--transition);
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold); }
 
/* ===================== PROFILE PAGE ===================== */
.profile-page { padding: 120px 60px 80px; max-width: 920px; margin: 0 auto; }
 
.profile-header {
  display: flex; align-items: center; gap: 30px;
  margin-bottom: 50px; padding-bottom: 40px;
  border-bottom: 1px solid rgba(201,168,76,0.1);
}
.profile-avatar {
  width: 72px; height: 72px;
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: var(--black); font-size: 28px; font-weight: 400;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-full);
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(201,168,76,0.25);
}
.profile-info h1 { font-size: 26px; font-weight: 300; color: var(--cream); margin: 0 0 6px; }
.profile-info p { font-size: 13px; color: var(--grey-text); margin: 0 0 10px; letter-spacing: 1px; }
.orders-count {
  font-size: 10px; color: var(--gold); letter-spacing: 2px;
  border: 1px solid rgba(201,168,76,0.3);
  padding: 3px 12px; border-radius: var(--radius-full);
}
 
/* ===================== TABS ===================== */
.profile-tabs {
  display: flex; gap: 0;
  border-bottom: 1px solid rgba(201,168,76,0.1);
  margin-bottom: 40px;
}
.profile-tab {
  background: none; border: none; color: var(--grey-mid);
  padding: 14px 28px 14px 0;
  font-size: 11px; letter-spacing: 3px; cursor: pointer;
  border-bottom: 1px solid transparent; margin-bottom: -1px;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  display: flex; align-items: center; gap: 8px;
}
.profile-tab.active { color: var(--cream); border-bottom-color: var(--gold); }
.profile-tab:hover { color: var(--grey-text); }
.tab-badge {
  background: var(--gold); color: var(--black);
  font-size: 9px; padding: 2px 7px;
  border-radius: var(--radius-full); font-weight: 600;
}
 
/* ===================== SECTION ===================== */
.profile-section { display: flex; flex-direction: column; gap: 24px; }
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-title { font-size: 10px; letter-spacing: 4px; color: var(--grey-mid); }
.orders-total { font-size: 10px; color: var(--grey-mid); letter-spacing: 2px; }
 
/* ===================== DATA VIEW ===================== */
.data-grid { display: flex; flex-direction: column; background: var(--black-soft); border: 1px solid rgba(201,168,76,0.08); border-radius: var(--radius-md); overflow: hidden; }
.data-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background var(--transition-fast);
}
.data-item:last-child { border-bottom: none; }
.data-item:hover { background: rgba(201,168,76,0.03); }
.data-label { font-size: 10px; letter-spacing: 2px; color: var(--grey-mid); }
.data-value { font-size: 14px; color: var(--cream-muted); }
.status-active { color: #6ab46a; }
 
/* ===================== EDIT FORM ===================== */
.btn-edit {
  background: transparent; border: 1px solid rgba(201,168,76,0.2);
  color: var(--grey-text); padding: 8px 20px;
  font-size: 10px; letter-spacing: 2px; cursor: pointer;
  border-radius: var(--radius-full);
  transition: border-color var(--transition), color var(--transition);
}
.btn-edit:hover { border-color: var(--gold); color: var(--gold); }
 
.edit-form {
  display: flex; flex-direction: column; gap: 20px;
  background: var(--black-soft);
  border: 1px solid rgba(201,168,76,0.1);
  border-radius: var(--radius-md);
  padding: 32px;
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-field { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-size: 10px; letter-spacing: 3px; color: var(--grey-mid); }
.form-input {
  background: var(--black); border: 1px solid rgba(201,168,76,0.12);
  color: var(--cream); padding: 14px 16px;
  font-size: 13px; outline: none;
  border-radius: var(--radius-sm);
  width: 100%; box-sizing: border-box;
  transition: border-color var(--transition);
}
.form-input:focus { border-color: var(--gold); }
.form-input.error { border-color: #933; }
.form-input::placeholder { color: var(--grey-dark); }
.field-error { font-size: 11px; color: #e55; letter-spacing: 1px; }
.form-divider {
  font-size: 9px; letter-spacing: 4px; color: var(--grey-dark);
  padding: 10px 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.form-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.btn-save {
  background: transparent; border: 1px solid var(--gold);
  color: var(--gold); padding: 13px 32px;
  font-size: 11px; letter-spacing: 3px; cursor: pointer;
  border-radius: var(--radius-full);
  position: relative; overflow: hidden;
  transition: color var(--transition);
}
.btn-save::before {
  content: ''; position: absolute; inset: 0;
  background: var(--gold); transform: translateX(-100%);
  transition: transform var(--transition); z-index: -1;
}
.btn-save:hover:not(:disabled) { color: var(--black); }
.btn-save:hover:not(:disabled)::before { transform: translateX(0); }
.btn-save:disabled { opacity: 0.4; cursor: not-allowed; }
 
.save-msg { font-size: 12px; letter-spacing: 1px; margin: 0; }
.save-msg.success { color: #6ab46a; }
.save-msg.error-msg { color: #e55; }
 
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
 
/* ===================== QUICK LINKS ===================== */
.quick-links { display: flex; gap: 12px; flex-wrap: wrap; }
.quick-link {
  display: flex; align-items: center; gap: 10px;
  background: var(--black-soft);
  border: 1px solid rgba(201,168,76,0.1);
  color: var(--grey-text); padding: 14px 22px;
  font-size: 11px; letter-spacing: 2px; text-decoration: none;
  border-radius: var(--radius-full);
  transition: border-color var(--transition), color var(--transition), background var(--transition);
}
.quick-link:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.05); }
 
/* ===================== LOGOUT ===================== */
.btn-logout {
  display: flex; align-items: center; gap: 10px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.06);
  color: var(--grey-mid); padding: 14px 24px;
  font-size: 11px; letter-spacing: 2px; cursor: pointer;
  border-radius: var(--radius-full);
  transition: border-color var(--transition), color var(--transition);
  margin-top: 10px; align-self: flex-start;
}
.btn-logout:hover { border-color: rgba(200,60,60,0.5); color: #e55; }
 
/* ===================== ORDERS FILTER ===================== */
.orders-filter {
  display: flex; gap: 0;
  background: var(--black-soft);
  border: 1px solid rgba(201,168,76,0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
  align-self: flex-start;
}
.filter-btn {
  background: none; border: none;
  color: var(--grey-mid); padding: 10px 20px;
  font-size: 10px; letter-spacing: 2px; cursor: pointer;
  transition: color var(--transition), background var(--transition);
}
.filter-btn:hover { color: var(--grey-text); }
.filter-btn.active { background: rgba(201,168,76,0.12); color: var(--gold); }
 
/* ===================== ORDERS LIST ===================== */
.orders-empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 24px; padding: 80px 0; color: var(--grey-dark);
}
.orders-empty p { font-size: 13px; color: var(--grey-mid); letter-spacing: 2px; }
.orders-empty-filter { padding: 40px 0; text-align: center; color: var(--grey-mid); font-size: 13px; letter-spacing: 2px; }
 
.orders-list { display: flex; flex-direction: column; gap: 12px; }
 
.order-item {
  display: grid; grid-template-columns: 90px 1fr auto;
  gap: 24px; align-items: center;
  padding: 20px 24px;
  background: var(--black-soft);
  border: 1px solid rgba(201,168,76,0.08);
  border-radius: var(--radius-md);
  transition: border-color var(--transition), box-shadow var(--transition);
}
.order-item:hover {
  border-color: rgba(201,168,76,0.2);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
 
.order-img {
  width: 90px; height: 110px;
  overflow: hidden;
  background: var(--grey-dark);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.order-img img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition); }
.order-item:hover .order-img img { transform: scale(1.04); }
.order-img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 28px; color: var(--grey-mid); }
 
.order-info { display: flex; flex-direction: column; gap: 6px; }
.order-brand { font-size: 9px; letter-spacing: 3px; color: var(--gold); font-weight: 500; }
.order-name { font-size: 15px; color: var(--cream); font-weight: 300; }
.order-dates { font-size: 11px; color: var(--grey-text); letter-spacing: 1px; }
.order-date-created { font-size: 10px; color: var(--grey-mid); letter-spacing: 1px; }
 
.order-right { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.order-price { font-size: 16px; color: var(--gold-light); letter-spacing: 1px; font-weight: 300; }
.order-status { font-size: 9px; letter-spacing: 2px; padding: 5px 12px; border-radius: var(--radius-full); white-space: nowrap; }
.order-status.active    { background: rgba(201,168,76,0.1); color: var(--gold); border: 1px solid rgba(201,168,76,0.3); }
.order-status.completed { background: rgba(100,180,100,0.1); color: #6ab46a; border: 1px solid rgba(100,180,100,0.3); }
.order-status.cancelled { background: rgba(200,60,60,0.1); color: #e55; border: 1px solid rgba(200,60,60,0.3); }
 
.btn-cancel {
  background: transparent; border: 1px solid rgba(200,60,60,0.2);
  color: var(--grey-mid); padding: 6px 14px;
  font-size: 9px; letter-spacing: 2px; cursor: pointer;
  border-radius: var(--radius-full);
  transition: border-color var(--transition), color var(--transition);
}
.btn-cancel:hover { border-color: rgba(200,60,60,0.6); color: #e55; }
 
/* TransitionGroup */
.order-list-enter-active, .order-list-leave-active { transition: all 0.35s ease; }
.order-list-enter-from { opacity: 0; transform: translateY(-12px); }
.order-list-leave-to { opacity: 0; transform: translateX(12px); }
.order-card { background: #111; border: 1px solid #1e1e1e; margin-bottom: 15px; }
.order-card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #1a1a1a; }
.order-meta { display: flex; flex-direction: column; gap: 4px; }
.order-num { font-size: 12px; color: #fff; letter-spacing: 1px; }
.order-date { font-size: 11px; color: #444; }
.order-status-badge { font-size: 10px; letter-spacing: 2px; padding: 4px 12px; }
.order-status-badge.pending { background: rgba(201,168,76,0.1); color: #c9a84c; border: 1px solid rgba(201,168,76,0.3); }
.order-status-badge.completed { background: rgba(100,180,100,0.1); color: #6ab46a; border: 1px solid rgba(100,180,100,0.3); }
.order-items { padding: 15px 20px; display: flex; flex-direction: column; gap: 12px; }
.order-item { display: grid; grid-template-columns: 60px 1fr auto; gap: 15px; align-items: center; }
.order-img { width: 60px; height: 80px; overflow: hidden; background: #1a1a1a; }
.order-img img { width: 100%; height: 100%; object-fit: cover; }
.order-info { display: flex; flex-direction: column; gap: 4px; }
.order-brand { font-size: 9px; letter-spacing: 2px; color: #c9a84c; }
.order-name { font-size: 13px; color: #fff; font-weight: 300; }
.order-qty { font-size: 11px; color: #444; }
.order-price { font-size: 13px; color: #fff; }
.order-card-footer { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-top: 1px solid #1a1a1a; }
.order-delivery { font-size: 11px; color: #555; letter-spacing: 1px; }
.order-total { font-size: 13px; color: #c9a84c; letter-spacing: 2px; }
</style>