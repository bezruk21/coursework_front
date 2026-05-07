<template>
  <div class="app-container" id="app">
    <div class="cursor" ref="cursor"></div>
    <div class="cursor-ring" ref="cursorRing"></div>
    <div class="noise-overlay"></div>

    <!-- NAVBAR -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
       <router-link to="/" class="navbar-logo">
    PLATINUM
    <span class="logo-separator"></span>
    <em class="logo-accent">RENT</em>
  </router-link>
      <ul class="nav-links">
  <li v-for="link in navManager.links" :key="link.id">
    <a :href="link.href" :class="{ active: activeLink === link.id }" @click.prevent="setActiveLink(link.id)">
      {{ link.label }}
    </a>
  </li>
</ul>

<div class="nav-actions">
  <button class="nav-icon-btn" @click="toggleAccount" title="Акаунт">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  </button>

  <button class="nav-icon-btn" @click="$router.push('/wishlist')" title="Обране">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
    <span class="nav-badge" v-if="wishlist.count > 0">{{ wishlist.count }}</span>
  </button>

  <button class="nav-icon-btn" @click="$router.push('/cart')" title="Кошик">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
    <span class="nav-badge" v-if="cart.count > 0">{{ cart.count }}</span>
  </button>

  <button class="btn-primary" @click="openBooking">Записатись</button>
</div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-bg-pattern"></div>

      <transition name="hero-fade" mode="out-in">
  <div
    :key="currentHeroImage"
    class="hero-fullscreen-image"
    :style="{ backgroundImage: 'url(' + heroImages[currentHeroImage] + ')' }"
  ></div>
</transition>

<div class="hero-overlay"></div>

<div class="hero-dots">
  <span
    v-for="(img, index) in heroImages"
    :key="index"
    class="hero-dot"
    :class="{ active: currentHeroImage === index }"
    @click="setHeroImage(index)"
  ></span>
</div>

      <div class="hero-content">
        <div class="hero-eyebrow">Найкращий в Україні — з 2027 року</div>
        <h1 class="hero-title">
          Одяг<br>для<br><em>особливих</em><br>моментів
        </h1>
        <p class="hero-subtitle">
          Дизайнерські сукні провідних світових брендів. Оренда, а не покупка — розкіш без зайвих витрат.
        </p>
        <div class="hero-actions">
          <router-link to="/catalog" class="btn-primary">ПЕРЕГЛЯНУТИ КАТАЛОГ</router-link>
          <a href="#how" class="hero-link">Як це працює</a>
        </div>
      </div>

      <div class="hero-stats">
        <div v-for="stat in heroStats" :key="stat.id">
          <div class="hero-stat-number">{{ stat.number }}</div>
          <div class="hero-stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- SEARCH BAR -->
    <section class="search-section">
      <div class="search-bar">
        <span class="search-label">Я шукаю сукню для</span>
        <select class="search-select" v-model="searchFilter.occasion">
          <option value="">Вибрати подію...</option>
          <option v-for="occ in occasions" :key="occ.id" :value="occ.value">{{ occ.label }}</option>
        </select>
        <span class="search-divider-text">розміру</span>
        <select class="search-select" v-model="searchFilter.size">
          <option value="">Вибрати розмір...</option>
          <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
        </select>
        <button class="search-btn" @click="performSearch">→ Знайти</button>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="categories-section">
      <div class="section-header">
        <div>
          <div class="section-label">Категорії</div>
          <h2 class="section-title">За <em>подією</em></h2>
        </div>
        <a href="#" class="view-all-link">Всі категорії</a>
      </div>

      <div class="categories-grid reveal">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-card"
          @click="selectCategory(category)"
        >
          <div class="category-card-bg" :style="{ backgroundImage: 'url(' + category.image + ')' }"></div>
          <div class="category-card-overlay"></div>
          <div class="category-card-content">
            <div class="category-icon"></div>
            <div class="category-name">{{ category.name }}</div>
            <div class="category-count">{{ category.count }} сукень</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATALOG -->
    <section class="catalog-section" id="catalog">
      <div class="section-header">
        <div>
          <div class="section-label">Колекція</div>
          <h2 class="section-title">Нові <em>надходження</em></h2>
        </div>
        <a href="#" class="view-all-link">Переглянути всі</a>
      </div>

      <div class="dresses-grid reveal">
        <div v-for="dress in dressesData" :key="dress.id" class="dress-card">
          <div class="dress-card-image">
            <div class="dress-card-img-inner">
              <img :src="dress.imageUrl" :alt="dress.name" class="dress-placeholder-img">
            </div>
            <div class="dress-card-actions">
              <button class="action-btn" @click="toggleWishlist(dress)" title="В обране">♡</button>
              <button class="action-btn" @click="quickView(dress)" title="Швидкий перегляд">⊙</button>
              <button class="action-btn" @click="addToCart(dress)" title="Орендувати">+</button>
            </div>
            <div class="dress-card-badge" v-if="dress.isNew">New</div>
          </div>
          <div class="dress-card-info">
            <div class="dress-brand">{{ dress.brand }}</div>
            <div class="dress-name">{{ dress.name }}</div>
            <div class="dress-footer">
              <div>
                <div class="dress-price">{{ dress.price }} ₴</div>
                <div class="dress-price-label">/ оренда</div>
              </div>
              <a href="#" class="dress-rent-btn" @click.prevent="rentDress(dress)">Орендувати →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="how-section" id="how">
      <div style="text-align: center;">
        <div class="section-label" style="justify-content: center; display: flex;">Процес</div>
        <h2 class="section-title">Як це <em>працює?</em></h2>
        <div class="divider divider-center"></div>
      </div>
      <div class="how-steps reveal">
        <div v-for="(step, index) in howItWorks" :key="step.id" class="how-step">
          <div class="how-step-number">{{ step.roman }}</div>
          <h3 class="how-step-title">{{ step.title }}</h3>
          <p class="how-step-desc">{{ step.description }}</p>
          <div class="how-step-arrow" v-if="index < howItWorks.length - 1"></div>
        </div>
      </div>
    </section>

    <!-- ADVANTAGES -->
    <section class="advantages-section">
      <div class="advantages-inner">
        <div class="advantages-text reveal">
          <div class="section-label">Чому ми</div>
          <h2 class="section-title">Наші <em>переваги</em></h2>
          <div class="divider"></div>
          <div v-for="adv in advantages" :key="adv.id" class="advantage-item">
            <div class="advantage-icon">{{ adv.icon }}</div>
            <div class="advantage-content">
              <h4>{{ adv.title }}</h4>
              <p>{{ adv.description }}</p>
            </div>
          </div>
        </div>
        <div class="advantages-visual reveal">
          <div class="adv-img-main"></div>
          <div class="adv-img-secondary"></div>
          <div class="adv-gold-block">
            <span class="adv-gold-number">500+</span>
            <span class="adv-gold-text">Дизайнерських суконь</span>
          </div>
        </div>
      </div>
    </section>

    <!-- DESIGNERS MARQUEE -->
    <section class="designers-section">
      <div style="text-align: center;">
        <div class="section-label" style="justify-content: center; display: flex;">Бренди</div>
        <h2 class="section-title">Наші <em>дизайнери</em></h2>
      </div>
      <div class="designers-marquee">
        <div class="marquee-track">
          <span v-for="(brand, index) in [...designers, ...designers]" :key="index" class="marquee-item">
            {{ brand.name }}
          </span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="section-label" style="justify-content: center; display: flex;">Починаємо</div>
      <h2 class="cta-title">Знайди свій<br><em>ідеальний образ</em></h2>
      <p class="cta-subtitle">Запишіться на примірку або оберіть сукню онлайн — ми доставимо її до вас</p>
      <div class="cta-actions">
        <router-link to="/catalog" class="btn-primary">ПЕРЕГЛЯНУТИ КАТАЛОГ</router-link>
        <button class="btn-cta-outline" @click="openBooking">Записатись на примірку</button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-top">
        <div>
          <div class="footer-brand-name">PLATINUM<em style="font-style:italic;color:var(--gold)"> Rent</em></div>
          <p class="footer-brand-desc">
            Перший в Україні сервіс оренди дизайнерських суконь. Ми працюємо з 2012 року. Якість, зручність і краса — наші пріоритети.
          </p>
          <div class="footer-social">
            <a href="#" class="social-btn">in</a>
            <a href="#" class="social-btn">ig</a>
            <a href="#" class="social-btn">fb</a>
            <a href="#" class="social-btn">tk</a>
          </div>
        </div>
        <div>
          <router-link to="/catalog" class="footer-heading">КАТАЛОГ</router-link>
          <ul class="footer-links">
            <li v-for="link in footerLinks.catalog" :key="link"><a href="#">{{ link }}</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">Компанія</div>
          <ul class="footer-links">
            <li v-for="link in footerLinks.company" :key="link"><a href="#">{{ link }}</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">Контакти</div>
          <div class="footer-contact-item"><a href="tel:+380631234567">(063) 123 45 67</a></div>
          <div class="footer-contact-item"><a href="tel:+380671234567">(067) 123 45 67</a></div>
          <div class="footer-contact-item" style="margin-top:16px;">
            вул. Хрещатик, 10<br>Щодня з 11:00
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© {{ currentYear }} Platinum Rent. Всі права захищені.</div>
        <div class="footer-bottom-links">
          <a href="#">Умови оренди</a>
          <a href="#">Політика конфіденційності</a>
        </div>
      </div>
    </footer>

    <!-- NOTIFICATION -->
    <Transition name="notify">
      <div v-if="notification.show" :style="notificationStyle" class="notification">
        {{ notification.message }}
      </div>
    </Transition>
  </div>
</template>

<script>
import { useToastStore } from '../stores/toast'
import axios from 'axios'

class NavigationManager {
  constructor(links) {
    this.links = links
    this.activeId = links[0]?.id || null
  }
  setActive(id) { this.activeId = id }
  getActive() { return this.links.find(l => l.id === this.activeId) }
}

class NotificationService {
  constructor() {
    this.show = false
    this.message = ''
    this._timer = null
  }
  notify(message, duration = 2800) {
    this.message = message
    this.show = true
    clearTimeout(this._timer)
    this._timer = setTimeout(() => { this.show = false }, duration)
  }
}

export default {
  name: 'App',

  data() {
    const navManager = new NavigationManager([
      { id: 'catalog',   href: '#catalog',   label: 'Каталог' },
      { id: 'how',       href: '#how',       label: 'Як це працює' },
      { id: 'blog',      href: '#blog',      label: 'Блог' },
      { id: 'about',     href: '#about',     label: 'Про нас' },
    ])

    return {
      cart: { count: 0, items: [] },
      wishlist: { count: 0, items: [] },
      notification: new NotificationService(),
      navManager,
      searchFilter: { occasion: '', size: '' },
      dressesData: [],
      activeLink: null,
      isScrolled: false,

      currentHeroImage: 0,

heroImages: [
  'https://onebyone.ua/image/catalog/0/main_desk_obo_x_gasanova_banner.jpg',
  'https://onebyone.ua/image/catalog/0/main_desk_finalsay_banner.jpg',
  'https://saint-laurent.dam.kering.com/asset/37cb14d1-2590-4e91-93f1-b423e7e8243a/SAINT_LAURENT_520_ECOM_HP_DESK_V3.jpg',
],

      heroStats: [
        { id: 1, number: '500+', label: 'Суконь' },
        { id: 2, number: '12',   label: 'Років досвіду' },
        { id: 3, number: '4.9★', label: 'Рейтинг' },
      ],
      occasions: [
        { id: 1, value: 'cocktail', label: 'Коктейль' },
        { id: 2, value: 'wedding',  label: 'Весілля' },
        { id: 3, value: 'evening',  label: 'Вечірка' },
        { id: 4, value: 'official', label: 'Офіційна подія' },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
     categories: [
  { id: 1, name: 'Вечірні',    count: 120, image: 'https://images.unsplash.com/photo-1566479179817-c6d5c1d83c55?w=800&h=1000&fit=crop' },
  { id: 2, name: 'Коктейльні', count: 85,  image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop' },
  { id: 3, name: 'Весільні',   count: 64,  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop' },
  { id: 4, name: 'Casual',     count: 93,  image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=600&fit=crop' },
],
      howItWorks: [
        { id: 1, roman: 'I',   title: 'Обираєш сукню',     description: 'Переглядаєш каталог і обираєш ідеальний варіант' },
        { id: 2, roman: 'II',  title: 'Бронюєш дати',      description: 'Вказуєш дати оренди та розмір' },
        { id: 3, roman: 'III', title: 'Отримуєш доставку', description: 'Ми доставляємо сукню до вашого порогу' },
        { id: 4, roman: 'IV',  title: 'Повертаєш',         description: 'Після події просто повертаєш — ми забираємо самі' },
      ],
      advantages: [
        { id: 1, icon: '✦', title: 'Топові бренди',         description: 'Колекції провідних світових дизайнерів' },
        { id: 2, icon: '✦', title: 'Вигідна ціна',          description: 'Оренда замість покупки — економія до 90%' },
        { id: 3, icon: '✦', title: 'Доставка і повернення', description: 'Привеземо і заберемо у зручний час' },
        { id: 4, icon: '✦', title: 'Хімчистка включена',    description: 'Не турбуйся про прання — ми все зробимо' },
      ],
      designers: [
        { id: 1, name: 'AFRM' },
        { id: 2, name: 'Solace London' },
        { id: 3, name: 'Self Portrait' },
        { id: 4, name: 'Retrofête' },
        { id: 5, name: 'Nadine Merabi' },
        { id: 6, name: 'Rotate' },
        { id: 7, name: 'Rasario' },
      ],
    }
  },

  computed: {
    currentYear() { return new Date().getFullYear() },

    notificationStyle() {
      return {
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        background: 'var(--gold)',
        color: 'var(--black)',
        padding: '14px 28px',
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        fontWeight: '500',
        letterSpacing: '0.1em',
        zIndex: 9999,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }
    },

    footerLinks() {
      return {
        catalog: ['Вечірні сукні', 'Коктейльні', 'Весілля', 'Нові надходження', 'Black Friday'],
        company: ['Про нас', 'Блог', 'Умови оренди', 'Контакти'],
      }
    }
  },

  async mounted() {
    window.addEventListener('scroll', this.handleScroll)
    document.addEventListener('mousemove', this.moveCursor)
    this.initReveal()
    this.startHeroSlider()
    await this.fetchDresses()
    await this.fetchCart()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    document.removeEventListener('mousemove', this.moveCursor)
  },

  methods: {
    // Navigation
    setActiveLink(id) {
      this.navManager.setActive(id)
      this.activeLink = id
      if (id === 'catalog') {
    this.$router.push('/catalog')
    return
  }
  // для інших — скрол до секції
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    toggleAccount() { this.$router.push('/account') },
    toggleWishlistNav() { this.notification.notify(`В обраному: ${this.wishlist.count} суконь`) },
setHeroImage(index) {
  this.currentHeroImage = index
},

startHeroSlider() {
  setInterval(() => {
    this.currentHeroImage =
      (this.currentHeroImage + 1) % this.heroImages.length
  }, 20000)
},
    // API
    async fetchDresses() {
      try {
    const { data } = await axios.get('http://localhost:5008/api/dresses')
    this.dressesData = data.filter(d => d.isNew) // ← тільки нові
  } catch (e) {
    console.error('Помилка завантаження суконь:', e)
  }
    },

    async fetchCart() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) return
      try {
        const { data } = await axios.get(`http://localhost:5008/api/cart/${user.id}`)
        this.cart = { count: data.Count, items: data.Items }
      } catch (e) {
        console.error('Помилка кошика:', e)
      }
    },

    async addToCart(dress) {
const toast = useToastStore()
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) return this.$router.push('/login')
      try {
        await axios.post(`http://localhost:5008/api/cart/${user.id}/add`, { dressId: dress.id })
        await this.fetchCart()
        this.notification.notify(`«${dress.name}» додано до кошика ✓`)
      } catch (e) {
        this.notification.notify('Помилка додавання до кошика')
      }
    },

    async toggleWishlist(dress) {
const toast = useToastStore()
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) return this.$router.push('/login')
      try {
        const { data } = await axios.post(`http://localhost:5008/api/wishlist/${user.id}/toggle/${dress.id}`)
        if (data.liked) {
          this.wishlist.count++
          this.notification.notify(`«${dress.name}» в обраному ♡`)
        } else {
          this.wishlist.count--
          this.notification.notify(`«${dress.name}» видалено з обраного`)
        }
      } catch (e) {
        this.notification.notify('Помилка')
      }
    },

    // Search
    performSearch() {
     const params = new URLSearchParams()
  if (this.searchFilter.occasion) params.set('occasion', this.searchFilter.occasion)
  if (this.searchFilter.size) params.set('size', this.searchFilter.size)
  this.$router.push(`/catalog?${params.toString()}`)
    },

    // Scroll
    handleScroll() { this.isScrolled = window.scrollY > 60 },
    scrollToCatalog() { document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }) },

    // Cursor
moveCursor(e) {
  if (this.$refs.cursor && this.$refs.cursor !== null) {
    this.$refs.cursor.style.left = e.clientX + 'px'
    this.$refs.cursor.style.top = e.clientY + 'px'
  }
  if (this.$refs.cursorRing && this.$refs.cursorRing !== null) {
    setTimeout(() => {
      if (this.$refs.cursorRing) {
        this.$refs.cursorRing.style.left = e.clientX + 'px'
        this.$refs.cursorRing.style.top = e.clientY + 'px'
      }
    }, 80)
  }
},

    // Reveal
    initReveal() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      }, { threshold: 0.1 })
      this.$nextTick(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
      })
    },

    // Other
    openBooking() { this.notification.notify('Запис на примірку — скоро доступно!') },
    rentDress(dress) { this.addToCart(dress) },
    quickView(dress) { this.notification.notify(`${dress.name} — ${dress.price} ₴ / оренда`) },
    selectCategory(category) { this.notification.notify(`Категорія: ${category.name}`) },
  }
}
</script>

<style scoped>
@import '../style.css';

.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>