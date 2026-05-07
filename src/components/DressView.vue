<template>
  <div class="dress-page">
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
        <button class="nav-icon-btn" @click="$router.push('/account')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button class="nav-icon-btn" @click="$router.push('/wishlist')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button class="nav-icon-btn" @click="$router.push('/cart')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </button>
        <button class="btn-book">ЗАПИСАТИСЬ</button>
      </div>
    </nav>

    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <router-link to="/">Головна</router-link>
      <span> / </span>
      <router-link to="/catalog">Сукні</router-link>
      <span> / </span>
      <span>{{ dress.brand }}</span>
      <span> / </span>
      <span class="current">{{ dress.name }}</span>
    </div>

    <!-- LOADING -->
    <div class="loading-wrap" v-if="loading">
      <div class="loader"></div>
    </div>

    <!-- DRESS LAYOUT -->
    <div class="dress-layout" v-else>

      <!-- GALLERY -->
      <div class="gallery">
        <div class="thumbs">
          <div
            v-for="(img, i) in dressImages"
            :key="i"
            class="thumb"
            :class="{ active: activeImg === i }"
            @click="activeImg = i"
          >
            <img :src="img" :alt="dress.name + ' ' + (i+1)" />
          </div>
        </div>
        <div class="main-img-wrap">
          <img :src="dressImages[activeImg]" :alt="dress.name" class="main-img" />
        </div>
      </div>

      <!-- DETAILS -->
      <div class="details">
        <p class="dress-brand">{{ dress.brand }}</p>
        <h1 class="dress-name">{{ dress.name }}</h1>

        <!-- SIZE -->
        <<div class="section-block">
  <div class="section-label-sm">РОЗМІР</div>
  <div class="size-row">
    <button
      v-for="size in dressAvailableSizes"
      :key="size"
      class="size-btn"
      :class="{ active: selectedSize === size }"
      @click="selectedSize = size"
    >{{ size }}</button>
  </div>
</div>

        <!-- TABS -->
        <div class="tabs">
          <button class="tab-btn active">ОРЕНДА</button>
          <div class="stars-wrap">
            <span class="stars">☆☆☆☆☆</span>
            <span class="review-count">0 ВІДГУКІВ</span>
          </div>
        </div>

        <!-- PRICING -->
       <div class="price-row">
  <div class="price-item">
    <span class="price-label">Оренда</span>
    <span class="price-value">{{ dress.price?.toLocaleString('uk-UA') }} <small>грн.</small></span>
  </div>
  <div class="price-item">
    <span class="price-label">Застава</span>
    <span class="price-value">{{ dress.deposit?.toLocaleString('uk-UA') || '—' }} <small>грн.</small></span>
  </div>
  <div class="price-item insurance-wrap">
    <span class="price-label">Страховка</span>
    <label class="toggle">
      <input type="checkbox" v-model="insurance" />
      <span class="toggle-track"></span>
    </label>
  </div>
</div>

        <div class="insurance-note" v-if="insurance">
          <p>★ Страховка коштує 15% від вартості оренди — {{ Math.round(dress.price * 0.15).toLocaleString('uk-UA') }} грн.</p>
          <p>Покриває дрібні неприємності: плями, відірваний ґудзик, розійшовся шов.</p>
        </div>

        <!-- ДАТИ ОРЕНДИ -->
        <div class="dates-block">
          <div class="dates-label">ТЕРМІН ОРЕНДИ</div>
          <div class="dates-row">
            <div class="date-field">
              <label>З:</label>
              <input type="date" v-model="dateFrom" :min="today" />
            </div>
            <div class="date-field">
              <label>По:</label>
              <input type="date" v-model="dateTo" :min="dateFrom || today" />
            </div>
            <div class="date-days" v-if="rentalDays > 0">
              {{ rentalDays }} {{ daysLabel }}
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-row">
          <button class="btn-rent" @click="addToCart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            ОРЕНДУВАТИ
          </button>
          <button class="btn-wish" :class="{ wished }" @click="toggleWish">
            {{ wished ? '♥' : '♡' }} {{ wished ? 'В БАЖАНИХ' : 'В БАЖАНІ' }}
          </button>
        </div>

        <div class="success-msg" v-if="cartSuccess">✓ Додано до кошика</div>

        <!-- АКОРДЕОН -->
        <div class="accordion">
          <div class="acc-item" v-for="item in accordionItems" :key="item.title">
            <button class="acc-header" @click="item.open = !item.open">
              <span>{{ item.title }}</span>
              <span class="acc-arrow" :class="{ open: item.open }">▾</span>
            </button>
            <transition name="slide">
              <div class="acc-body" v-if="item.open">
                <p>{{ item.content }}</p>
              </div>
            </transition>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { useToastStore } from '../stores/toast'
import axios from 'axios'

const API = 'http://localhost:5008/api'

export default {
  name: 'DressView',
  data() {
    return {
      dress: {},
      loading: true,
      activeImg: 0,
      selectedSize: '',
      insurance: false,
      wished: false,
      cartSuccess: false,
      isScrolled: false,
      dateFrom: '',
      dateTo: '',
      today: new Date().toISOString().split('T')[0],
      accordionItems: [
        {
          title: 'Склад та догляд',
          open: false,
          content: 'Рекомендується хімчистка. Не прати в машині. Не вичавлювати. Зберігати на вішалці в чохлі.'
        },
        {
          title: 'Розмір та посадка',
          open: false,
          content: 'Сукня відповідає стандартним розмірам. Рекомендуємо звіритись з таблицею розмірів перед замовленням.'
        },
        {
          title: 'Обмін та повернення',
          open: false,
          content: 'Повернення здійснюється в день закінчення оренди. Сукня має бути в тому самому стані, в якому була отримана.'
        },
        {
          title: 'Оплата та доставка',
          open: false,
          content: 'Оплата онлайн або готівкою в шоурумі. Доставка по Києву — 150 грн. Нова Пошта — тарифи перевізника.'
        },
        {
          title: 'Наявність в магазинах',
          open: false,
          content: 'Шоурум: вул. Хрещатик, 10. Щодня з 11:00 до 20:00. Тел: (063) 123 45 67'
        },
      ]
    }
  },
computed: {
  dressImages() {
    try {
      const imgs = JSON.parse(this.dress.images || '[]')
      if (imgs.length > 0) return imgs
    } catch {}
    return this.dress.imageUrl ? [this.dress.imageUrl] : []
  },

  dressAvailableSizes() {
    try {
      const s = JSON.parse(this.dress.sizes || '[]')
      if (s.length > 0) return s
    } catch {}
    return this.dress.size ? [this.dress.size] : []
  },

  rentalDays() {
    if (!this.dateFrom || !this.dateTo) return 0
    const from = new Date(this.dateFrom)
    const to = new Date(this.dateTo)
    const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  },

  daysLabel() {
    const n = this.rentalDays
    if (n === 1) return 'день'
    if (n >= 2 && n <= 4) return 'дні'
    return 'днів'
  }
},

  async created() {
    const id = this.$route?.params?.id
    if (id) {
      try {
        const { data } = await axios.get(`${API}/dresses/${id}`)
        this.dress = data
        this.selectedSize = data.size
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    } else {
      this.loading = false
    }
    window.addEventListener('scroll', this.handleScroll)
  },

  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 40
    },

    async addToCart() {
const toast = useToastStore()
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) return this.$router.push('/login')
  if (!this.selectedSize) {
    alert('Оберіть розмір')
    return
  }
  if (!this.dateFrom || !this.dateTo) {
    alert('Оберіть дати оренди')
    return
  }
  try {
    await axios.post(`${API}/cart/${user.id}/add`, { dressId: this.dress.id })
    this.cartSuccess = true
    setTimeout(() => { this.cartSuccess = false }, 3000)
  } catch (e) {
    console.error(e)
  }
},

    async toggleWish() {
const toast = useToastStore()
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) return this.$router.push('/login')
      try {
        const { data } = await axios.post(`${API}/wishlist/${user.id}/toggle/${this.dress.id}`)
        this.wished = data.liked
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
/* ===================== IMPORTS & WRAPPER ===================== */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

.dress-page {
  background: var(--black, #0e0e0e);
  min-height: 100vh;
  color: var(--cream, #fff);
  font-family: var(--font-body, 'Montserrat', sans-serif);
  font-weight: 300;
  line-height: 1.7;
  overflow-x: hidden;
}

/* ===================== NAVBAR (Уніфіковано) ===================== */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 24px 48px;
  display: flex; align-items: center; justify-content: space-between;
  transition: background var(--transition, 0.4s), padding var(--transition, 0.4s);
}

.navbar.scrolled {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 16px 48px;
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
}

.navbar-logo {
  font-family: var(--font-display, 'Cormorant Garamond', serif);
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--cream, #f5f0e8);
  display: flex; align-items: center; gap: 8px;
}

.logo-accent { color: var(--gold, #c9a84c); font-style: italic; }

.logo-separator {
  width: 20px; height: 1px;
  background: var(--gold, #c9a84c);
  display: inline-block; vertical-align: middle;
}

.nav-links {
  display: flex; align-items: center; gap: 40px;
  list-style: none; margin: 0; padding: 0;
}

.nav-link {
  font-size: 11px; font-weight: 500; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--cream-muted, #888);
  text-decoration: none; position: relative; padding-bottom: 4px;
  transition: color var(--transition-fast, 0.2s);
}

.nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 0; height: 1px; background: var(--gold, #c9a84c);
  transition: width var(--transition, 0.4s);
}

.nav-link:hover, .nav-link.active { color: var(--gold, #c9a84c); }
.nav-link:hover::after, .nav-link.active::after { width: 100%; }

.nav-actions { display: flex; align-items: center; gap: 8px; }

.nav-icon-btn {
  width: 40px; height: 40px; background: transparent; border: none;
  color: var(--cream-muted, #888); cursor: pointer; display: flex;
  align-items: center; justify-content: center; font-size: 18px;
  transition: color var(--transition-fast, 0.2s);
  border-radius: var(--radius-full, 50%);
}

.nav-icon-btn:hover, .nav-icon-btn.active { color: var(--gold, #c9a84c); }

/* ===================== SHARED BUTTONS (Шапка і Дії) ===================== */
.btn-book, .btn-rent {
  background: transparent;
  border: 1px solid var(--gold, #c9a84c);
  color: var(--gold, #c9a84c);
  font-family: var(--font-body, 'Montserrat', sans-serif);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: var(--radius-full, 50px);
  position: relative;
  overflow: hidden;
  transition: color var(--transition, 0.4s);
  display: flex; align-items: center; justify-content: center; gap: 10px;
}

.btn-book { padding: 10px 28px; }
.btn-rent { flex: 1; padding: 16px 20px; }

.btn-book::before, .btn-rent::before {
  content: ''; position: absolute; inset: 0;
  background: var(--gold, #c9a84c);
  transform: translateX(-100%);
  transition: transform var(--transition, 0.4s);
  z-index: -1;
}

.btn-book:hover, .btn-rent:hover { color: var(--black, #0a0a0a); }
.btn-book:hover::before, .btn-rent:hover::before { transform: translateX(0); }

/* Кнопка "У бажане" */
.btn-wish {
  background: transparent;
  border: 1px solid rgba(201, 168, 76, 0.2);
  padding: 16px 20px;
  font-size: 16px; /* Для іконки */
  cursor: pointer;
  color: var(--cream-muted, #888);
  border-radius: var(--radius-full, 50%);
  transition: border-color var(--transition, 0.4s), color var(--transition, 0.4s);
  display: flex; align-items: center; justify-content: center;
}

.btn-wish:hover, .btn-wish.wished {
  border-color: var(--gold, #c9a84c);
  color: var(--gold, #c9a84c);
}

/* ===================== BREADCRUMB & LOADING ===================== */
.breadcrumb {
  padding: 120px 60px 20px;
  font-size: 11px;
  color: var(--grey-text, #555);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: var(--font-body, 'Montserrat', sans-serif);
}

.breadcrumb a {
  color: var(--cream-muted, #888);
  text-decoration: none;
  transition: color var(--transition-fast, 0.2s);
}

.breadcrumb a:hover { color: var(--gold, #c9a84c); }
.breadcrumb .current { color: var(--cream, #fff); font-weight: 500; }

.loading-wrap { display: flex; justify-content: center; padding: 100px; }
.loader {
  width: 32px; height: 32px;
  border: 1px solid var(--grey-dark, #333);
  border-top-color: var(--gold, #c9a84c);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ===================== LAYOUT & GALLERY ===================== */
.dress-layout {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 60px;
  padding: 20px 60px 80px;
  max-width: 1300px;
  margin: 0 auto;
}

.gallery { display: flex; gap: 16px; }
.thumbs { display: flex; flex-direction: column; gap: 10px; width: 80px; }

.thumb {
  width: 80px; height: 100px; overflow: hidden;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: var(--radius-sm, 4px);
  transition: border-color var(--transition-fast, 0.2s);
}

.thumb.active { border-color: var(--gold, #c9a84c); }
.thumb img { width: 100%; height: 100%; object-fit: cover; }

.main-img-wrap {
  flex: 1; overflow: hidden;
  background: var(--black-soft, #111);
  max-height: 680px;
  border-radius: var(--radius-md, 8px);
}

.main-img { width: 100%; height: 100%; object-fit: cover; max-height: 680px; }

/* ===================== DETAILS & TYPOGRAPHY ===================== */
.details { display: flex; flex-direction: column; gap: 24px; padding-top: 8px; }

.dress-brand {
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--gold, #c9a84c);
  margin: 0;
  text-transform: uppercase;
  font-weight: 500;
}

.dress-name {
  font-family: var(--font-display, 'Cormorant Garamond', serif);
  font-size: 36px;
  font-weight: 300;
  margin: 0;
  color: var(--cream, #fff);
  line-height: 1.2;
}

/* ===================== SIZE SELECTION ===================== */
.section-block { display: flex; flex-direction: column; gap: 10px; }
.section-label-sm {
  font-size: 10px; letter-spacing: 0.2em; color: var(--grey-text, #555);
  text-transform: uppercase; font-weight: 500;
}

.size-row { display: flex; gap: 8px; }

.size-btn {
  width: 44px; height: 44px;
  border: 1px solid rgba(201,168,76, 0.2);
  background: transparent;
  font-family: var(--font-body, 'Montserrat', sans-serif);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast, 0.2s);
  color: var(--cream-muted, #888);
  border-radius: var(--radius-full, 50%); /* Круглі кнопки розмірів виглядають вишуканіше */
  display: flex; align-items: center; justify-content: center;
}

.size-btn.active, .size-btn:hover {
  background: var(--gold, #c9a84c);
  color: var(--black, #0e0e0e);
  border-color: var(--gold, #c9a84c);
}

/* ===================== TABS & REVIEWS ===================== */
.tabs { display: flex; align-items: center; border-bottom: 1px solid rgba(201,168,76, 0.15); }

.tab-btn {
  background: none; border: none; padding: 12px 20px 12px 0;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  cursor: pointer; color: var(--grey-text, #555);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-fast, 0.2s);
  margin-bottom: -1px;
  font-family: var(--font-body, 'Montserrat', sans-serif);
}

.tab-btn.active { color: var(--cream, #fff); border-bottom-color: var(--gold, #c9a84c); }

.stars-wrap { margin-left: auto; display: flex; align-items: center; gap: 8px; }
.stars { color: var(--gold, #c9a84c); font-size: 13px; }
.review-count { font-size: 10px; color: var(--grey-text, #555); letter-spacing: 0.1em; }

/* ===================== PRICING & INSURANCE ===================== */
.price-row { display: flex; align-items: center; gap: 30px; flex-wrap: wrap; }
.price-item { display: flex; align-items: baseline; gap: 8px; }
.price-label { font-size: 12px; color: var(--grey-text, #555); letter-spacing: 0.1em; text-transform: uppercase; }

.price-value {
  font-family: var(--font-display, 'Cormorant Garamond', serif);
  font-size: 32px; font-weight: 300; color: var(--gold-light, #f5f0e8);
}
.price-value small { font-size: 12px; color: var(--grey-text, #555); font-family: var(--font-body, sans-serif); }

.insurance-wrap { margin-left: auto; display: flex; align-items: center; gap: 10px; }

.toggle { position: relative; display: inline-block; width: 42px; height: 22px; cursor: pointer; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle-track {
  position: absolute; inset: 0;
  background: rgba(255,255,255,0.1);
  transition: background var(--transition-fast, 0.2s);
  border-radius: 22px;
}
.toggle input:checked + .toggle-track { background: var(--gold, #c9a84c); }
.toggle-track::after {
  content: ''; position: absolute; left: 3px; top: 3px;
  width: 16px; height: 16px; background: var(--cream, #fff);
  border-radius: 50%; transition: transform var(--transition-fast, 0.2s);
}
.toggle input:checked + .toggle-track::after { transform: translateX(20px); }

.insurance-note {
  background: var(--black-soft, #111);
  border: 1px solid rgba(201,168,76, 0.1);
  padding: 16px 20px;
  border-radius: var(--radius-md, 8px);
}
.insurance-note p { font-size: 12px; color: var(--grey-text, #666); margin: 0 0 8px; line-height: 1.6; }
.insurance-note p:last-child { margin: 0; }

/* ===================== DATES ===================== */
.dates-block { display: flex; flex-direction: column; gap: 12px; }
.dates-label { font-size: 10px; letter-spacing: 0.2em; color: var(--grey-text, #555); text-transform: uppercase; font-weight: 500; }
.dates-row { display: flex; align-items: center; gap: 15px; flex-wrap: wrap; }

.date-field { display: flex; align-items: center; gap: 8px; }
.date-field label { font-size: 11px; color: var(--cream-muted, #888); letter-spacing: 0.1em; }

.date-field input[type="date"] {
  background: var(--black-soft, #111);
  border: 1px solid rgba(201,168,76, 0.2);
  color: var(--cream, #fff);
  padding: 10px 12px; font-size: 13px; outline: none;
  transition: border var(--transition-fast, 0.2s);
  cursor: pointer; color-scheme: dark;
  border-radius: var(--radius-sm, 4px);
  font-family: var(--font-body, 'Montserrat', sans-serif);
}
.date-field input[type="date"]:focus { border-color: var(--gold, #c9a84c); }
.date-days { font-size: 13px; color: var(--gold, #c9a84c); letter-spacing: 0.1em; margin-left: auto; }

/* ===================== CTA ===================== */
.cta-row { display: flex; gap: 12px; }
.success-msg { font-size: 12px; color: #6a9; letter-spacing: 0.1em; text-transform: uppercase; }

/* ===================== ACCORDION ===================== */
.accordion { display: flex; flex-direction: column; border-top: 1px solid rgba(201,168,76, 0.15); }
.acc-item { border-bottom: 1px solid rgba(201,168,76, 0.15); }
.acc-header {
  width: 100%; background: none; border: none; color: var(--cream-muted, #888);
  padding: 16px 0; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
  display: flex; justify-content: space-between; align-items: center;
  cursor: pointer; transition: color var(--transition-fast, 0.2s); text-align: left;
  font-family: var(--font-body, 'Montserrat', sans-serif);
  font-weight: 500;
}
.acc-header:hover { color: var(--cream, #fff); }
.acc-arrow { transition: transform 0.25s; color: var(--gold, #c9a84c); font-size: 14px; }
.acc-arrow.open { transform: rotate(180deg); }
.acc-body { padding: 0 0 16px; }
.acc-body p { font-size: 13px; color: var(--grey-text, #666); line-height: 1.7; margin: 0; }

/* ===================== ANIMATIONS ===================== */
.slide-enter-active, .slide-leave-active { transition: all 0.25s ease; overflow: hidden; }
.slide-enter-from, .slide-leave-to { opacity: 0; max-height: 0; }
.slide-enter-to, .slide-leave-from { opacity: 1; max-height: 200px; }
</style>