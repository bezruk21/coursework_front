<template>
  <div class="page-wrapper">
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <router-link to="/" class="navbar-logo">
        PLATINUM <span class="logo-separator"></span> <em class="logo-accent">RENT</em>
      </router-link>
      <ul class="nav-links">
        <li><router-link to="/catalog" class="nav-link">КАТАЛОГ</router-link></li>
        <li><router-link to="/blog" class="nav-link">БЛОГ</router-link></li>
        <li><router-link to="/about" class="nav-link active">ПРО НАС</router-link></li>
      </ul>
      <div class="nav-actions">
        <button class="nav-icon-btn" @click="$router.push('/account')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button class="nav-icon-btn" @click="$router.push('/wishlist')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span class="nav-badge" v-if="wishlistCount > 0">{{ wishlistCount }}</span>
        </button>
        <button class="nav-icon-btn" @click="$router.push('/cart')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span class="nav-badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </button>
        <button class="btn-book">ЗАПИСАТИСЬ</button>
      </div>
    </nav>

    <!-- HERO — повноекранний з фото -->
    <div class="about-hero">
      <div class="about-hero-bg"></div>
      <div class="about-hero-overlay"></div>
      <div class="about-hero-center">
        <div class="page-label">Про нас</div>
        <h1>Ми — <em>Platinum Rent</em></h1>
        <p>Перший в Україні преміальний сервіс оренди дизайнерських суконь. Розкіш без зайвих витрат — з 2012 року.</p>
        <div class="about-hero-line"></div>
      </div>
      <div class="about-hero-stats">
        <div class="stat" v-for="s in heroStats" :key="s.label">
          <span class="stat-num">{{ s.num }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <!-- НАША ІСТОРІЯ -->
    <section class="story-section">
      <div class="story-inner">
        <div class="story-visual">
          <img src="https://scontent.cdninstagram.com/v/t51.82787-15/682648620_18420490297126954_1051841802815373037_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=X5Fs5_0UTvIQ7kNvwF3agIY&_nc_oc=AdpzV6gfDPEgiruo4ydruKNlDkfUf4on6BKh5CFdxiJoupykQQZxVbxZcRk-_4oSD1s&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=FvM1efTFwni_4PTInhstxg&oh=00_Af6RygjnVBQhWh5h9js608Imk63f_GO7D-Mmw_Kq1qz42w&oe=6A0757E7" alt="Наша історія" />
          <div class="story-year-badge">2012</div>
        </div>
        <div class="story-text">
          <div class="page-label">Наша історія</div>
          <h2>Від однієї сукні до <em>500+ колекцій</em></h2>
          <p>Все почалось у 2012 році з невеликого шоуруму в центрі Києва та 30 суконь. Засновниця Platinum Rent — Анна Коваль — сама зіткнулась з проблемою: неможливо знайти гарну дизайнерську сукню в оренду для важливої події.</p>
          <p>Сьогодні ми — команда з 15 людей, шоурум на Хрещатику, доставка по всій Україні і понад 500 суконь від провідних світових дизайнерів.</p>
          <div class="story-quote">
            <em>"Кожна жінка заслуговує відчувати себе особливою — і це не повинно коштувати цілий місячний бюджет."</em>
            <span>— Анна Коваль, засновниця</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ЦІННОСТІ -->
    <section class="values-section">
      <div class="values-header">
        <div class="page-label">Що нас рухає</div>
        <h2>Наші <em>цінності</em></h2>
      </div>
      <div class="values-grid">
        <div class="value-card" v-for="v in values" :key="v.title">
          <div class="value-num">{{ v.num }}</div>
          <h3>{{ v.title }}</h3>
          <p>{{ v.desc }}</p>
        </div>
      </div>
    </section>

    <!-- КОМАНДА -->
    <section class="team-section">
      <div class="team-header">
        <div class="page-label">Люди</div>
        <h2>Наша <em>команда</em></h2>
      </div>
      <div class="team-grid">
        <div class="team-card" v-for="member in team" :key="member.name">
          <div class="team-photo" :style="{ backgroundImage: 'url(' + member.photo + ')' }"></div>
          <div class="team-info">
            <h4>{{ member.name }}</h4>
            <span>{{ member.role }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- КОНТАКТИ -->
    <section class="contacts-section">
      <div class="contacts-inner">
        <div class="contacts-text">
          <div class="page-label">Контакти</div>
          <h2>Завітайте <em>до нас</em></h2>
          <p>Шоурум у центрі Києва відкритий щодня. Наш стиліст допоможе підібрати ідеальний образ для вашої події.</p>
          <div class="contacts-list">
            <div class="contact-row">
              <span class="contact-label">АДРЕСА</span>
              <span>вул. Хрещатик, 10, Київ</span>
            </div>
            <div class="contact-row">
              <span class="contact-label">ТЕЛЕФОН</span>
              <a href="tel:+380631234567">(063) 123 45 67</a>
            </div>
            <div class="contact-row">
              <span class="contact-label">ГРАФІК</span>
              <span>Щодня 11:00–20:00</span>
            </div>
            <div class="contact-row">
              <span class="contact-label">EMAIL</span>
              <a href="mailto:hello@platinumrent.ua">hello@platinumrent.ua</a>
            </div>
          </div>
        </div>
        <div class="contacts-map">
          <div class="map-placeholder">
            <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=500&fit=crop" alt="Шоурум" />
            <div class="map-overlay">
              <span>Шоурум Platinum Rent</span>
              <small>вул. Хрещатик, 10</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="page-footer">
      <div class="footer-copy">© {{ new Date().getFullYear() }} Platinum Rent. Всі права захищені.</div>
    </footer>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore }     from '../stores/cart'

const isScrolled    = ref(false)
const wishlistStore = useWishlistStore()
const cartStore     = useCartStore()

const wishlistCount = computed(() => wishlistStore.count || 0)
const cartCount     = computed(() => cartStore.count     || 0)

onMounted(() => {
  wishlistStore.fetchWishlist()
  cartStore.fetchCartCount()
  window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 40 })
})

const heroStats = [
  { num: '500+', label: 'Дизайнерських суконь' },
  { num: '12',   label: 'Років на ринку' },
  { num: '4.9★', label: 'Рейтинг клієнтів' },
  { num: '10K+', label: 'Задоволених клієнток' },
]

const values = [
  { num: '01', title: 'Якість понад усе', desc: 'Кожна сукня проходить ретельну перевірку перед і після оренди. Хімчистка після кожного використання.' },
  { num: '02', title: 'Доступна розкіш', desc: 'Ми віримо, що дизайнерський одяг має бути доступний кожній жінці — не лише тим, хто може дозволити покупку.' },
  { num: '03', title: 'Сталий розвиток', desc: 'Оренда замість покупки — це не лише економія, а й турбота про навколишнє середовище.' },
  { num: '04', title: 'Персональний підхід', desc: 'Наш стиліст допомагає кожній клієнтці знайти образ, що підкреслює її унікальність.' },
]

const team = [
  { name: 'Анна Коваль',    role: 'Засновниця та CEO',     photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop' },
  { name: 'Марія Петренко', role: 'Головний стиліст',      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop' },
  { name: 'Олена Шевченко', role: 'Менеджер колекцій',     photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop' },
  { name: 'Дарина Іванова', role: 'Клієнтський сервіс',   photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop' },
]
</script>
<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: var(--black);
  color: var(--cream);
  font-family: var(--font-body);
  font-weight: 300;
  line-height: 1.7;
  overflow-x: hidden;
}

/* NAVBAR */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 24px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background var(--transition), padding var(--transition);
}
.navbar.scrolled {
  background: rgba(10,10,10,0.95);
  backdrop-filter: blur(20px);
  padding: 16px 48px;
  border-bottom: 1px solid rgba(201,168,76,0.15);
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
.logo-accent { color: var(--gold); font-style: italic; }
.logo-separator { width: 20px; height: 1px; background: var(--gold); display: inline-block; vertical-align: middle; }
.nav-links { display: flex; align-items: center; gap: 40px; list-style: none; margin: 0; padding: 0; }
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
  bottom: 0; left: 0;
  width: 0; height: 1px;
  background: var(--gold);
  transition: width var(--transition);
}
.nav-link:hover, .nav-link.active { color: var(--gold); }
.nav-link:hover::after, .nav-link.active::after { width: 100%; }
.nav-actions { display: flex; align-items: center; gap: 8px; }
.nav-icon-btn {
  width: 40px; height: 40px;
  background: transparent;
  border: none;
  color: var(--cream-muted);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  transition: color var(--transition-fast);
  border-radius: var(--radius-full);
  position: relative;
}
.nav-icon-btn:hover, .nav-icon-btn.active { color: var(--gold); }
.nav-badge {
  position: absolute;
  top: -6px; right: -6px;
  width: 16px; height: 16px;
  background: var(--gold);
  color: var(--black);
  border-radius: 50%;
  font-size: 9px;
  font-weight: 600;
  display: flex; align-items: center; justify-content: center;
}
.btn-book {
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
.btn-book::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold);
  transform: translateX(-100%);
  transition: transform var(--transition);
  z-index: -1;
}
.btn-book:hover { color: var(--black); }
.btn-book:hover::before { transform: translateX(0); }

/* PAGE LABEL */
.page-label {
  font-size: 10px;
  letter-spacing: 4px;
  color: var(--gold);
  margin-bottom: 16px;
  text-transform: uppercase;
}

/* HERO */
.about-hero {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.about-hero-bg {
  position: absolute; inset: 0;
  background-image: url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop');
  background-size: cover;
  background-position: center;
  filter: brightness(0.3);
  transform: scale(1.05);
  transition: transform 8s ease;
}
.about-hero:hover .about-hero-bg { transform: scale(1.0); }
.about-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%);
}
.about-hero-center {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.about-hero-center h1 {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 300;
  line-height: 1.05;
  color: var(--cream);
}
.about-hero-center h1 em { color: var(--gold); font-style: italic; }
.about-hero-center p { font-size: 15px; color: var(--cream-muted); line-height: 1.7; max-width: 480px; }
.about-hero-line { width: 60px; height: 1px; background: var(--gold); margin-top: 8px; }
.about-hero-stats {
  position: absolute;
  bottom: 40px;
  left: 50%; transform: translateX(-50%);
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 90%; max-width: 900px;
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: var(--radius-md);
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(10,10,10,0.6);
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 20px;
  border-right: 1px solid rgba(201,168,76,0.15);
}
.stat:last-child { border-right: none; }
.stat-num {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 300;
  color: var(--gold);
}
.stat-label { font-size: 10px; color: var(--grey-text); letter-spacing: 2px; text-align: center; text-transform: uppercase; }

/* STORY */
.story-section {
  padding: 100px 60px;
  border-bottom: 1px solid rgba(201,168,76,0.08);
}
.story-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.story-visual { position: relative; }
.story-visual img {
  width: 100%; height: 600px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  filter: brightness(0.85);
}
.story-year-badge {
  position: absolute;
  bottom: 30px; left: -20px;
  background: var(--gold);
  color: var(--black);
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 300;
  padding: 16px 28px;
  border-radius: var(--radius-md);
}
.story-text h2 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 300;
  margin: 16px 0 24px;
  line-height: 1.2;
}
.story-text h2 em { color: var(--gold); font-style: italic; }
.story-text p { font-size: 14px; color: var(--grey-text); line-height: 1.8; margin-bottom: 20px; }
.story-quote {
  margin-top: 32px;
  padding: 24px;
  border-left: 2px solid var(--gold);
  background: var(--black-soft);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}
.story-quote em {
  display: block;
  font-family: var(--font-display);
  font-size: 17px;
  color: var(--cream-muted);
  line-height: 1.6;
  margin-bottom: 12px;
  font-style: italic;
}
.story-quote span { font-size: 10px; letter-spacing: 2px; color: var(--gold); text-transform: uppercase; }

/* VALUES */
.values-section {
  padding: 100px 60px;
  border-bottom: 1px solid rgba(201,168,76,0.08);
  background: var(--black-soft);
}
.values-header { margin-bottom: 60px; }
.values-header h2 { font-family: var(--font-display); font-size: 40px; font-weight: 300; }
.values-header h2 em { color: var(--gold); font-style: italic; }
.values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
.value-card {
  padding: 48px;
  border: 1px solid rgba(201,168,76,0.08);
  transition: border-color var(--transition), background var(--transition);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.value-card:hover {
  border-color: rgba(201,168,76,0.3);
  background: rgba(201,168,76,0.03);
  box-shadow: var(--shadow-gold);
}
.value-num {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 300;
  color: rgba(201,168,76,0.2);
  line-height: 1;
}
.value-card h3 { font-size: 13px; font-weight: 500; letter-spacing: 2px; color: var(--cream); text-transform: uppercase; }
.value-card p { font-size: 13px; color: var(--grey-text); line-height: 1.7; }

/* TEAM */
.team-section { padding: 100px 60px; border-bottom: 1px solid rgba(201,168,76,0.08); }
.team-header { margin-bottom: 60px; }
.team-header h2 { font-family: var(--font-display); font-size: 40px; font-weight: 300; }
.team-header h2 em { color: var(--gold); font-style: italic; }
.team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.team-card { display: flex; flex-direction: column; gap: 16px; }
.team-photo {
  height: 380px;
  border-radius: var(--radius-md);
  background-size: cover;
  background-position: center top;
  border: 1px solid rgba(201,168,76,0.08);
  filter: brightness(0.85) grayscale(0.2);
  transition: filter var(--transition), transform var(--transition);
}
.team-card:hover .team-photo { filter: brightness(1) grayscale(0); transform: scale(1.02); }
.team-info { display: flex; flex-direction: column; gap: 4px; }
.team-info h4 { font-size: 15px; font-weight: 400; color: var(--cream); letter-spacing: 0.5px; }
.team-info span { font-size: 10px; letter-spacing: 2px; color: var(--gold); text-transform: uppercase; }

/* CONTACTS */
.contacts-section { padding: 100px 60px; }
.contacts-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.contacts-text h2 { font-family: var(--font-display); font-size: 40px; font-weight: 300; margin: 16px 0 20px; }
.contacts-text h2 em { color: var(--gold); font-style: italic; }
.contacts-text > p { font-size: 14px; color: var(--grey-text); line-height: 1.8; margin-bottom: 40px; }
.contacts-list { display: flex; flex-direction: column; gap: 0; }
.contact-row {
  display: flex;
  align-items: baseline;
  gap: 24px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(201,168,76,0.08);
  transition: border-color var(--transition-fast);
}
.contact-row:hover { border-color: rgba(201,168,76,0.25); }
.contact-label { font-size: 9px; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; min-width: 80px; }
.contact-row span, .contact-row a { font-size: 14px; color: var(--cream-muted); text-decoration: none; transition: color var(--transition-fast); }
.contact-row a:hover { color: var(--gold); }
.map-placeholder { position: relative; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid rgba(201,168,76,0.08); }
.map-placeholder img { width: 100%; height: 480px; object-fit: cover; filter: brightness(0.7) grayscale(0.2); transition: filter var(--transition); }
.map-placeholder:hover img { filter: brightness(0.85) grayscale(0); }
.map-overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  display: flex; flex-direction: column; gap: 4px;
}
.map-overlay span { font-family: var(--font-display); font-size: 18px; color: var(--cream); }
.map-overlay small { font-size: 10px; color: var(--gold); letter-spacing: 3px; text-transform: uppercase; }

/* FOOTER */
.page-footer {
  padding: 30px 60px;
  border-top: 1px solid rgba(201,168,76,0.08);
  text-align: center;
}
.footer-copy { font-size: 11px; color: var(--grey-text); letter-spacing: 1px; }
</style>