<template>
  <div class="catalog-page">
    <div class="noise-overlay"></div>

   <nav class="navbar" :class="{ scrolled: isScrolled }">
  <router-link to="/" class="navbar-logo">
    PLATINUM
    <span class="logo-separator"></span>
    <em class="logo-accent">RENT</em>
  </router-link>

  <ul class="nav-links">
    <li><router-link to="/catalog" class="nav-link active">КАТАЛОГ</router-link></li>
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

  <button class="nav-icon-btn" @click="$router.push('/wishlist')" title="Обране">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
    <span v-if="wishlistCount > 0" class="nav-badge">{{ wishlistCount }}</span>
  </button>

  <button class="nav-icon-btn" @click="$router.push('/cart')" title="Кошик">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
    <span v-if="cartCount > 0" class="nav-badge">{{ cartCount }}</span>
  </button>

  <button class="btn-book" @click="$router.push('/')">ЗАПИСАТИСЬ</button>
  </div>
</nav>

    <div class="catalog-hero">
      <p class="section-label">Колекція 2027</p>
      <h1 class="catalog-hero-title">
        Каталог <em>дизайнерських</em><br />суконь напрокат
      </h1>
      <div class="divider"></div>
    </div>

    <div class="catalog-layout">
      <aside class="sidebar">
        <div class="filter-top">
          <span class="filter-heading">ФІЛЬТРИ</span>
          <button class="clear-btn" @click="clearFilters">Очистити все</button>
        </div>

        <div class="filter-group">
          <h4 class="filter-title" @click="toggle('occasion')">
            Сукні для
            <span class="arrow" :class="{ open: open.occasion }">▾</span>
          </h4>
          <transition name="slide">
            <ul v-if="open.occasion" class="filter-list">
              <li v-for="item in occasions" :key="item">
                <label class="filter-label">
                  <span class="custom-check" :class="{ checked: selectedOccasions.includes(item) }">
                    <input type="checkbox" v-model="selectedOccasions" :value="item" />
                    <span class="checkmark"></span>
                  </span>
                  {{ item }}
                </label>
              </li>
            </ul>
          </transition>
        </div>

        <div class="filter-group">
          <h4 class="filter-title" @click="toggle('dresscode')">
            Дрескод
            <span class="arrow" :class="{ open: open.dresscode }">▾</span>
          </h4>
          <transition name="slide">
            <ul v-if="open.dresscode" class="filter-list">
              <li v-for="item in dresscodes" :key="item">
                <label class="filter-label">
                  <span class="custom-check" :class="{ checked: selectedDresscodes.includes(item) }">
                    <input type="checkbox" v-model="selectedDresscodes" :value="item" />
                    <span class="checkmark"></span>
                  </span>
                  {{ item }}
                </label>
              </li>
            </ul>
          </transition>
        </div>

        <div class="filter-group">
          <h4 class="filter-title" @click="toggle('price')">
            Ціна
            <span class="arrow" :class="{ open: open.price }">▾</span>
          </h4>
          <transition name="slide">
            <div v-if="open.price" class="price-range">
              <div class="price-inputs">
                <input type="number" v-model.number="priceMin" placeholder="від" class="price-input" />
                <span class="price-sep">—</span>
                <input type="number" v-model.number="priceMax" placeholder="до" class="price-input" />
              </div>
            </div>
          </transition>
        </div>

        <div class="filter-group">
          <div class="filter-group">
  <h4 class="filter-title" @click="toggle('size')">
    Розмір
    <span class="arrow" :class="{ open: open.size }">▾</span>
  </h4>
  <transition name="slide">
    <ul v-if="open.size" class="filter-list">
      <li v-for="size in ['XS','S','M','L','XL','XXL']" :key="size">
        <label class="filter-label">
          <span class="custom-check" :class="{ checked: selectedSizes.includes(size) }">
            <input type="checkbox" v-model="selectedSizes" :value="size" />
            <span class="checkmark"></span>
          </span>
          {{ size }}
        </label>
      </li>
    </ul>
  </transition>
</div>
        </div>
      </aside>

      <main class="catalog-main">
        <div class="catalog-bar">
          <p class="catalog-count">{{ filteredDresses.length }} суконь</p>
          <select class="sort-select" v-model="sortBy">
            <option value="all">Всі</option>
            <option value="price_asc">Ціна ↑</option>
            <option value="price_desc">Ціна ↓</option>
            <option value="new">Нові</option>
          </select>
        </div>

        <div class="dress-grid">
          <div
            v-for="dress in filteredDresses"
            :key="dress.id"
            class="dress-card"
            @click="$router.push('/dress/' + dress.id)"
          >
           <div class="dress-img-wrap"
  @mouseenter="hoverDress = dress.id"
  @mouseleave="hoverDress = null">

  <img :src="getActiveImage(dress)" :alt="dress.name" class="dress-img" />

  <div class="dress-overlay">
    <button class="overlay-btn" @click.stop="$router.push('/dress/' + dress.id)">
      ПЕРЕГЛЯНУТИ
    </button>
  </div>

  <div class="dress-actions">
   <button class="action-btn wish-btn" 
  @click.stop="toggleWish(dress, $event)" 
  :class="{ active: wishedIds.has(dress.id) }"
  title="В обране">
  <svg width="16" height="16" viewBox="0 0 24 24" 
    :fill="wishedIds.has(dress.id) ? '#c9a84c' : 'none'" 
    stroke="#c9a84c" stroke-width="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
</button>
  </div>

  <div v-if="dress.isNew" class="dress-badge">NEW</div>
</div>

<div class="dress-info">
  <span class="dress-brand">{{ dress.brand }}</span>
  <h3 class="dress-name">{{ dress.name }}</h3>
  <div class="dress-price-row">
    <span class="dress-price">{{ dress.price.toLocaleString() }}</span>
    <span class="dress-price-label">₴ / оренда</span>
  </div>
</div>
</div>
        </div>

        <p v-if="filteredDresses.length === 0" class="no-results">
          Немає суконь за обраними фільтрами
        </p>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'pinia'
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'
 import { useToastStore } from '../stores/toast'
export default {
  name: 'Catalog',
  data() {
    return {
      isScrolled: false,
      open: { occasion: true, dresscode: false, price: false, history: false, size: false },
      occasions: [
        'Весілля', 'Вагітних',
        'Випускного вечора', 'Клубної вечірки', 'Корпоративної вечірки',
        'Новорічної ночі', 'Офіційного заходу', 'Подружки нареченої', 'Романтичного вечора'
      ],
      dresscodes: ['Black tie', 'Cocktail', 'Smart casual', 'Casual'],
      selectedOccasions: [],
      selectedDresscodes: [],
      priceMin: null,
      priceMax: null,
      hoverDress: null,
      selectedSizes: [],
      onlyNew: false,
      sortBy: 'all',
      dresses: []
    }
  },

  computed: {
    // Підключаємо лічильники з Pinia
    ...mapState(useCartStore, { cartCount: 'count' }),
    ...mapState(useWishlistStore, { 
      wishlistCount: 'count', 
      wishedIds: 'wishedIds' 
    }),
  filteredDresses() {
    let result = [...this.dresses]

      // 1. Фільтр по події (Весілля, Випускний тощо)
      if (this.selectedOccasions.length > 0) {
        result = result.filter(d => {
          try {
            // Розшифровуємо рядок occasions у справжній масив
            const occs = JSON.parse(d.occasions || '[]')
            // Перевіряємо, чи хоча б одна вибрана галочка є в цьому масиві
            return this.selectedOccasions.some(o => occs.includes(o))
          } catch { 
            return false 
          }
        })
      }

      // 2. Фільтр по розмірах
      if (this.selectedSizes.length > 0) {
        result = result.filter(d => {
          try {
            const sizes = JSON.parse(d.sizes || '[]')
            return this.selectedSizes.some(s => sizes.includes(s))
          } catch { return false }
        })
      }

      // 3. Фільтр по дрескоду
      if (this.selectedDresscodes.length > 0) {
        result = result.filter(d => this.selectedDresscodes.includes(d.dresscode))
      }

      // 4. Інші фільтри
      if (this.onlyNew) result = result.filter(d => !d.wasRented)
      if (this.priceMin) result = result.filter(d => d.price >= this.priceMin)
      if (this.priceMax) result = result.filter(d => d.price <= this.priceMax)
      
      // Сортування
      if (this.sortBy === 'price_asc') result.sort((a, b) => a.price - b.price)
      if (this.sortBy === 'price_desc') result.sort((a, b) => b.price - a.price)
      if (this.sortBy === 'new') result = result.filter(d => d.isNew)

      return result
    }
},
 async mounted() {
  this.fetchWishlist();
  this.fetchCartCount();

  console.log('Catalog mounted!')
  window.addEventListener('scroll', this.handleScroll)

  // 2. Фільтри з URL-адреси
  const params = new URLSearchParams(window.location.search)
  const occasion = params.get('occasion')
  const size = params.get('size')
  if (occasion) this.selectedOccasions = [occasion]
  if (size) this.selectedSizes = [size]

  // 3. Завантажуємо сукні (один раз!)
  try {
    console.log('Fetching dresses...')
    const response = await fetch('http://localhost:5008/api/dresses')
    const data = await response.json()
    console.log('Dresses:', data)
    this.dresses = data
  } catch (error) {
    console.error('Не вдалося завантажити каталог', error)
  }
},

  methods: {
    ...mapActions(useWishlistStore, ['toggleWish', 'fetchWishlist']),
    ...mapActions(useCartStore, ['fetchCartCount']),
    toggle(key) { this.open[key] = !this.open[key] },
    clearFilters() {
      this.selectedOccasions = []
  this.selectedDresscodes = []
  this.selectedSizes = []
  this.priceMin = null
  this.priceMax = null
  this.onlyNew = false
    },
    getActiveImage(dress) {
  try {
    const imgs = JSON.parse(dress.images || '[]')
    if (this.hoverDress === dress.id && imgs.length > 1) return imgs[1]
    if (imgs.length > 0) return imgs[0]
  } catch {}
  return dress.imageUrl || '/img/placeholder.jpg'
},

 async toggleWish(dress, event) {
const toast = useToastStore()
    event.stopPropagation()
    const user = JSON.parse(localStorage.getItem('user'))
    
    if (!user) return this.$router.push('/login')
    
    try {
      const { data } = await axios.post(
        `http://localhost:5008/api/wishlist/${user.id}/toggle/${dress.id}`
      )
      
      // <--- ВИПРАВЛЕНО: Оновлюємо Set після запиту, щоб серце перемикалося
      if (this.wishedIds.has(dress.id)) {
        this.wishedIds.delete(dress.id)
      } else {
        this.wishedIds.add(dress.id)
      }
      
      console.log('response:', data)
    } catch (e) {
      console.error('помилка:', e)
    }
},
    handleScroll() { this.isScrolled = window.scrollY > 40 }
  },
  unmounted() { window.removeEventListener('scroll', this.handleScroll) }
}
</script>

<style scoped>
/* ===================== IMPORTS & WRAPPER ===================== */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

.catalog-page {
  background: var(--black, #0e0e0e);
  min-height: 100vh;
  color: var(--cream, #fff);
  font-family: var(--font-body, 'Montserrat', sans-serif);
  font-weight: 300;
  line-height: 1.7;
  overflow-x: hidden;
}

.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 256px;
}

/* ===================== NAVBAR (Уніфіковано з кошиком) ===================== */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
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
  font-family: var(--font-display, 'Cormorant Garamond', serif);
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

.logo-accent { color: var(--gold, #c9a84c); font-style: italic; }

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
  bottom: 0; left: 0;
  width: 0; height: 1px;
  background: var(--gold, #c9a84c);
  transition: width var(--transition, 0.4s);
}

.nav-link:hover,
.nav-link.active { color: var(--gold, #c9a84c); }

.nav-link:hover::after,
.nav-link.active::after { width: 100%; }

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
.nav-icon-btn.active { color: var(--gold, #c9a84c); }

/* ===================== SHARED BUTTON STYLES ===================== */
.btn-book,
.overlay-btn {
  background: transparent;
  border: 1px solid var(--gold, #c9a84c);
  color: var(--gold, #c9a84c);
  padding: 10px 28px;
  font-family: var(--font-body, 'Montserrat', sans-serif);
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

.btn-book::before,
.overlay-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold, #c9a84c);
  transform: translateX(-100%);
  transition: transform var(--transition, 0.4s);
  z-index: -1;
}

.btn-book:hover,
.overlay-btn:hover { color: var(--black, #0a0a0a); }

.btn-book:hover::before,
.overlay-btn:hover::before { transform: translateX(0); }

/* ===================== HERO SECTION ===================== */
.catalog-hero {
  padding: 140px 48px 60px;
  text-align: center;
  border-bottom: 1px solid rgba(201, 168, 76, 0.1);
}

.section-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold, #c9a84c);
  margin-bottom: 20px;
}

.catalog-hero-title {
  font-family: var(--font-display, 'Cormorant Garamond', serif);
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 300;
  line-height: 1.15;
  color: var(--cream, #fff);
  margin-bottom: 24px;
}

.catalog-hero-title em {
  font-style: italic;
  color: var(--gold, #c9a84c);
}

.divider {
  width: 60px;
  height: 1px;
  background: var(--gold, #c9a84c);
  margin: 0 auto;
}

/* ===================== LAYOUT & SIDEBAR ===================== */
.catalog-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: calc(100vh - 260px);
}

.sidebar {
  border-right: 1px solid rgba(201, 168, 76, 0.1);
  padding: 40px 28px;
  position: sticky;
  top: 80px;
  height: fit-content;
}

.filter-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.filter-heading {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: var(--gold, #c9a84c);
  text-transform: uppercase;
}

.clear-btn {
  background: none;
  border: none;
  font-size: 10px;
  color: var(--cream-muted, #888);
  cursor: pointer;
  font-family: var(--font-body, 'Montserrat', sans-serif);
  letter-spacing: 0.05em;
  transition: color var(--transition-fast, 0.2s);
  text-decoration: underline;
}

.clear-btn:hover { color: var(--gold, #c9a84c); }

.filter-group {
  border-top: 1px solid rgba(201, 168, 76, 0.08);
  padding: 18px 0;
}

.filter-title {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: var(--cream, #fff);
  text-transform: uppercase;
  margin: 0 0 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  font-family: var(--font-body, 'Montserrat', sans-serif);
}

.arrow {
  transition: transform var(--transition-fast, 0.25s);
  color: var(--gold, #c9a84c);
  font-size: 13px;
}
.arrow.open { transform: rotate(180deg); }

.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-label {
  font-size: 12px;
  color: var(--cream-muted, #888);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-family: var(--font-body, 'Montserrat', sans-serif);
  font-weight: 300;
  transition: color var(--transition-fast, 0.2s);
}

.filter-label:hover { color: var(--cream, #fff); }

/* Custom Checkbox */
.custom-check {
  position: relative;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.custom-check input {
  position: absolute;
  opacity: 0;
  width: 0; height: 0;
}

.checkmark {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(201, 168, 76, 0.4);
  border-radius: 2px;
  transition: all var(--transition-fast, 0.2s);
}

.custom-check.checked .checkmark {
  background: var(--gold, #c9a84c);
  border-color: var(--gold, #c9a84c);
}

.custom-check.checked .checkmark::after {
  content: '';
  position: absolute;
  left: 3px; top: 1px;
  width: 5px; height: 8px;
  border: 2px solid var(--black, #0a0a0a);
  border-left: none; border-top: none;
  transform: rotate(45deg);
}

/* Price Range */
.price-range { padding-top: 4px; }
.price-inputs { display: flex; align-items: center; gap: 8px; }

.price-input {
  width: 90px;
  padding: 8px 12px;
  background: var(--black-soft, rgba(255,255,255,0.04));
  border: 1px solid rgba(201, 168, 76, 0.2);
  color: var(--cream, #fff);
  font-size: 12px;
  font-family: var(--font-body, 'Montserrat', sans-serif);
  border-radius: var(--radius-sm, 4px);
  transition: border-color var(--transition-fast, 0.2s);
}

.price-input:focus { outline: none; border-color: var(--gold, #c9a84c); }
.price-input::placeholder { color: var(--grey-text, #555); }
.price-sep { color: var(--grey-text, #555); font-size: 12px; }

/* ===================== MAIN CONTENT & GRID ===================== */
.catalog-main { padding: 40px 48px; }

.catalog-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(201, 168, 76, 0.1);
}

.catalog-count {
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--cream-muted, #888);
  font-family: var(--font-body, 'Montserrat', sans-serif);
  text-transform: uppercase;
}

.sort-select {
  background: var(--black-soft, rgba(255,255,255,0.04));
  border: 1px solid rgba(201, 168, 76, 0.2);
  color: var(--cream, #fff);
  padding: 8px 16px;
  font-size: 11px;
  font-family: var(--font-body, 'Montserrat', sans-serif);
  letter-spacing: 0.1em;
  cursor: pointer;
  border-radius: var(--radius-sm, 4px);
  transition: border-color var(--transition-fast, 0.2s);
}

.sort-select:focus { outline: none; border-color: var(--gold, #c9a84c); }
.sort-select option { background: var(--black, #141414); }

.dress-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

/* ===================== PRODUCT CARDS ===================== */
.dress-card {
  cursor: pointer;
  background: var(--black-soft, #111);
  transition: background var(--transition, 0.4s);
}

.dress-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  background: var(--grey-dark, #141414);
}

.dress-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition, 0.6s);
  filter: brightness(0.9);
}

.dress-card:hover .dress-img {
  transform: scale(1.04);
  filter: brightness(0.6);
}

.dress-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast, 0.3s);
}

.dress-card:hover .dress-overlay { opacity: 1; }

.dress-actions {
  position: absolute;
  top: 14px; right: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transition: opacity var(--transition-fast, 0.2s);
}

.dress-card:hover .dress-actions { opacity: 1; }

/* Кнопки поверх фотографії (сердечко та інше) */
.action-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full, 50%);
  background: rgba(10,10,10,0.7);
  border: 1px solid rgba(201,168,76,0.3);
  color: var(--cream-muted, #888);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast, 0.2s);
}

.action-btn:hover,
.action-btn.active {
  /* Залишаємо фон таким самим, як у звичайному стані (напівпрозорим сірим) */
  background: rgba(10,10,10,0.7); 
  
  /* Додатковий акцент на межі, якщо потрібно, або просто золото */
  border-color: var(--gold, #c9a84c);
}

.dress-badge {
  position: absolute;
  top: 14px; left: 14px;
  background: var(--gold, #c9a84c);
  color: var(--black, #0a0a0a);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.25em;
  padding: 4px 10px;
  font-family: var(--font-body, 'Montserrat', sans-serif);
  text-transform: uppercase;
}

.dress-info {
  padding: 20px 16px;
  border-top: 1px solid rgba(201,168,76,0.08);
}

.dress-brand {
  font-size: 9px;
  letter-spacing: 0.3em;
  color: var(--gold, #c9a84c);
  font-family: var(--font-body, 'Montserrat', sans-serif);
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.dress-name {
  font-family: var(--font-display, 'Cormorant Garamond', serif);
  font-size: 18px;
  font-weight: 300;
  color: var(--cream, #fff);
  margin: 0 0 10px;
  line-height: 1.2;
}

.dress-price-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.dress-price {
  font-size: 20px;
  font-weight: 400;
  color: var(--cream, #fff);
  font-family: var(--font-display, 'Cormorant Garamond', serif);
}

.dress-price-label {
  font-size: 10px;
  color: var(--grey-text, #555);
  letter-spacing: 0.1em;
  font-family: var(--font-body, 'Montserrat', sans-serif);
  text-transform: uppercase;
}

.no-results {
  text-align: center;
  color: var(--grey-text, #555);
  font-family: var(--font-body, 'Montserrat', sans-serif);
  font-size: 13px;
  padding: 80px 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ===================== ANIMATIONS ===================== */
.slide-enter-active, .slide-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.slide-enter-from, .slide-leave-to { opacity: 0; max-height: 0; }
.slide-enter-to, .slide-leave-from { opacity: 1; max-height: 400px; }

.wish-btn { color: var(--gold, #c9a84c); }
.wish-btn.active svg { fill: var(--gold, #c9a84c); }
</style>