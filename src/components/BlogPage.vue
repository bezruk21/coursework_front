<template>
  <div class="page-wrapper">
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <router-link to="/" class="navbar-logo">
        PLATINUM <span class="logo-separator"></span> <em class="logo-accent">RENT</em>
      </router-link>
      <ul class="nav-links">
        <li><router-link to="/catalog" class="nav-link">КАТАЛОГ</router-link></li>
        <li><router-link to="/blog" class="nav-link active">БЛОГ</router-link></li>
        <li><router-link to="/about" class="nav-link">ПРО НАС</router-link></li>
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

    <!-- HERO -->
    <div class="page-hero">
      <div class="page-label">Журнал</div>
      <h1>Блог <em>Platinum Rent</em></h1>
      <p>Поради стилістів, тренди сезону та натхнення для особливих моментів</p>
    </div>

    <!-- СТАТТІ -->
    <div class="blog-grid">
      <article class="blog-card featured" @click="openArticle(articles[0])">
        <div class="blog-card-img">
          <img :src="articles[0].image" :alt="articles[0].title" />
          <div class="blog-card-overlay"></div>
        </div>
        <div class="blog-card-content">
          <span class="blog-tag">{{ articles[0].tag }}</span>
          <h2>{{ articles[0].title }}</h2>
          <p>{{ articles[0].excerpt }}</p>
          <div class="blog-meta">
            <span>{{ articles[0].date }}</span>
            <span>{{ articles[0].readTime }} хв читання</span>
          </div>
        </div>
      </article>

      <article
        class="blog-card"
        v-for="article in articles.slice(1)"
        :key="article.id"
        @click="openArticle(article)"
      >
        <div class="blog-card-img">
          <img :src="article.image" :alt="article.title" />
          <div class="blog-card-overlay"></div>
        </div>
        <div class="blog-card-content">
          <span class="blog-tag">{{ article.tag }}</span>
          <h3>{{ article.title }}</h3>
          <p>{{ article.excerpt }}</p>
          <div class="blog-meta">
            <span>{{ article.date }}</span>
            <span>{{ article.readTime }} хв читання</span>
          </div>
        </div>
      </article>
    </div>

    <!-- МОДАЛКА СТАТТІ -->
    <div class="article-modal" v-if="activeArticle" @click.self="activeArticle = null">
      <div class="article-content">
        <button class="article-close" @click="activeArticle = null">×</button>
        <img :src="activeArticle.image" :alt="activeArticle.title" class="article-hero-img" />
        <div class="article-body">
          <span class="blog-tag">{{ activeArticle.tag }}</span>
          <h2>{{ activeArticle.title }}</h2>
          <div class="article-meta">
            <span>{{ activeArticle.date }}</span>
            <span>{{ activeArticle.readTime }} хв читання</span>
          </div>
          <div class="article-text" v-html="activeArticle.content"></div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="page-footer">
      <div class="footer-copy">© {{ new Date().getFullYear() }} Platinum Rent. Всі права захищені.</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore }     from '../stores/cart'

const router = useRouter()
const wishlistStore = useWishlistStore()
const cartStore     = useCartStore()

const wishlistCount = computed(() => wishlistStore.count || 0)
const cartCount     = computed(() => cartStore.count     || 0)

const isScrolled   = ref(false)
const activeArticle = ref(null)

function openArticle(article) {
  activeArticle.value = article
}

function goToHow() {
  router.push('/').then(() => {
    setTimeout(() => {
      document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  })
}

onMounted(() => {
  wishlistStore.fetchWishlist()
  cartStore.fetchCartCount()
  window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 40 })
})

const articles = [
  {
    id: 1,
    tag: 'Стиль',
    title: 'Як обрати ідеальну сукню для весілля: поради стиліста',
    excerpt: 'Весільний сезон — час, коли кожна деталь образу має значення. Розповідаємо як знайти сукню, що підкреслить вашу красу.',
    date: '12 травня 2027',
    readTime: 5,
    image: 'https://orenda-sukni.kyiv.ua/wp-content/uploads/2023/11/an_appointment_for_a_wedding_dress-1300x807.png.webp',
    content: `
      <p>Вибір сукні для весілля — одне з найважливіших рішень, яке впливає на весь образ. Незалежно від того, чи ви наречена, подружка нареченої або гостя — правильна сукня може стати центром уваги.</p>
      <h4>1. Враховуйте дрескод</h4>
      <p>Перш за все зверніть увагу на запрошення. Black tie означає вечірнє вбрання, cocktail — коктейльну сукню до коліна, smart casual дає більше свободи.</p>
      <h4>2. Підбирайте під фігуру</h4>
      <p>A-силует підходить більшості типів фігур. Empire підкреслює талію під грудьми. Футляр виглядає елегантно на стрункій фігурі.</p>
      <h4>3. Оренда замість покупки</h4>
      <p>Брендова сукня в оренду — це розумне рішення. Ви отримуєте розкіш без переплати і не маєте клопоту з подальшим зберіганням.</p>
    `
  },
  {
    id: 2,
    tag: 'Тренди',
    title: 'Топ-5 кольорів сезону весна-літо 2027',
    excerpt: 'Дизайнери назвали головні кольори наступного сезону. Розповідаємо які відтінки будуть в тренді.',
    date: '5 травня 2027',
    readTime: 3,
    image: 'https://cdn.vogue.ua/i/original/media/image/697/383/e73/697383e733a6b.jpg.webp',
    content: `
      <p>Щороку модні будинки задають кольорові тренди, які визначають вигляд колекцій. Весна-літо 2027 — сезон ніжності та сміливості одночасно.</p>
      <h4>Пудровий рожевий</h4>
      <p>Ніжний і жіночний — ідеальний для романтичних подій.</p>
      <h4>Смарагдовий зелений</h4>
      <p>Насичений колір, який додає образу глибини та елегантності.</p>
      <h4>Молочний білий</h4>
      <p>Класика, яка ніколи не виходить з моди. Підходить для будь-якої події.</p>
    `
  },
  {
    id: 3,
    tag: 'Поради',
    title: 'Оренда сукні: як підготуватися до примірки',
    excerpt: 'Перша примірка — важливий момент. Ділимося порадами як максимально ефективно використати час у шоурумі.',
    date: '28 квітня 2027',
    readTime: 4,
    image: 'https://images.pexels.com/photos/2974113/pexels-photo-2974113.jpeg',
    content: `
      <p>Примірка в шоурумі — це не просто приміряти сукню. Це можливість знайти образ вашої мрії з допомогою професійного стиліста.</p>
      <h4>Що взяти з собою</h4>
      <p>Нижня білизна потрібного кольору, взуття на підборах потрібної висоти, зібране або розпущене волосся — щоб побачити повний образ.</p>
      <h4>Скільки суконь варто приміряти</h4>
      <p>Оптимально 5-7 варіантів. Більше — втомлює і заплутує.</p>
    `
  },
  {
    id: 4,
    tag: 'Бренди',
    title: 'Self Portrait, AFRM, Rotate: чим відрізняються бренди',
    excerpt: 'Розбираємось у ключових відмінностях між популярними брендами нашого каталогу.',
    date: '20 квітня 2027',
    readTime: 6,
    image: 'https://scontent.cdninstagram.com/v/t51.82787-15/689822218_18420384643126954_5382299975930998261_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=4PPEexjU2pAQ7kNvwH3vfaZ&_nc_oc=AdrRL70FSxgIJPVR0q7uv7LhjhHqs2EZwlw2BpUY_yjJPnq0IaSJnQzaP8LMOjIme3A&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=FvM1efTFwni_4PTInhstxg&oh=00_Af75HIvwjOzwVRxBo0nTiCIxfi8OU6JmiKIMNTf7CF2BsA&oe=6A073D97',
    content: `
      <p>Кожен бренд у нашому каталозі має свій характер і підходить для різних подій та типів жінок.</p>
      <h4>Self Portrait</h4>
      <p>Британський бренд, відомий мереживними деталями та жіночними силуетами. Ідеальний для вечірніх заходів і весіль.</p>
      <h4>AFRM</h4>
      <p>Американський contemporary бренд. Поєднує комфорт і стиль. Добре підходить для cocktail-заходів.</p>
      <h4>Rotate</h4>
      <p>Данський бренд з яскравими принтами і сміливими фасонами. Для тих, хто любить виділятися.</p>
    `
  },
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
.page-hero {
  padding: 160px 60px 80px;
  max-width: 800px;
  border-bottom: 1px solid rgba(201,168,76,0.12);
  margin-bottom: 0;
}
.page-hero h1 {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--cream);
}
.page-hero h1 em { color: var(--gold); font-style: italic; }
.page-hero p { font-size: 15px; color: var(--grey-text); line-height: 1.7; max-width: 500px; }

/* BLOG GRID */
.blog-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 60px;
  padding-bottom: 80px;
}
.blog-card {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background: var(--black-soft);
  border: 1px solid rgba(201,168,76,0.08);
  border-radius: var(--radius-md);
  transition: border-color var(--transition), box-shadow var(--transition);
   display: flex;          /* ← додай */
  flex-direction: column;
}
.blog-card:hover {
  border-color: rgba(201,168,76,0.25);
  box-shadow: var(--shadow-card);
}
.blog-card.featured { grid-column: 1 / -1; }
.blog-card-img { position: relative; overflow: hidden; flex-shrink: 0; }
.blog-card.featured .blog-card-img { height: 500px; }
.blog-card:not(.featured) .blog-card-img { height: 280px; }
.blog-card-img img {
  width: 100%; height: 100%;
  object-fit: cover;
  overflow: hidden;
  transition: transform var(--transition);
  filter: brightness(0.75);
}
.blog-card:hover .blog-card-img img { transform: scale(1.05); filter: brightness(0.5); }
.blog-card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
}
.blog-card-content {
  padding: 24px;
}
.blog-card.featured .blog-card-content {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 32px;
}
.blog-tag {
  font-size: 9px;
  letter-spacing: 3px;
  color: var(--gold);
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.3);
  padding: 4px 12px;
  display: inline-block;
  margin-bottom: 12px;
  border-radius: var(--radius-full);
}
.blog-card h2 {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 300;
  color: var(--cream);
  margin-bottom: 10px;
  line-height: 1.3;
}
.blog-card h3 {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 300;
  color: var(--cream);
  margin-bottom: 8px;
  line-height: 1.4;
}
.blog-card p {
  font-size: 13px;
  color: var(--cream-muted);
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-meta {
  display: flex;
  gap: 20px;
  font-size: 10px;
  color: var(--grey-text);
  letter-spacing: 1px;
}

/* MODAL */
.article-modal {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.92);
  z-index: 9999;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}
.article-content {
  background: var(--black-soft);
  max-width: 700px;
  width: 100%;
  position: relative;
  border-radius: var(--radius-md);
  border: 1px solid rgba(201,168,76,0.12);
  box-shadow: var(--shadow-card);
  height: fit-content;
}
.article-close {
  position: absolute;
  top: 16px; right: 16px;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(201,168,76,0.2);
  color: var(--cream);
  width: 36px; height: 36px;
  font-size: 20px;
  cursor: pointer;
  z-index: 1;
  display: flex; align-items: center; justify-content: center;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  border-radius: var(--radius-full);
}
.article-close:hover { color: var(--gold); border-color: var(--gold); }
.article-hero-img {
  width: 100%; height: 350px;
  object-fit: cover;
  filter: brightness(0.8);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.article-body { padding: 40px; }
.article-body h2 {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 300;
  margin: 15px 0 10px;
  color: var(--cream);
}
.article-meta {
  display: flex;
  gap: 20px;
  font-size: 11px;
  color: var(--grey-text);
  letter-spacing: 1px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--grey-dark);
}
.article-text { font-size: 14px; color: var(--grey-text); line-height: 1.8; }
.article-text h4 {
  color: var(--gold);
  font-size: 11px;
  letter-spacing: 3px;
  margin: 28px 0 10px;
  font-weight: 500;
  text-transform: uppercase;
}
.article-text p { margin-bottom: 15px; }

/* FOOTER */
.page-footer {
  padding: 30px 60px;
  border-top: 1px solid var(--grey-dark);
  text-align: center;
}
.footer-copy { font-size: 11px; color: var(--grey-text); letter-spacing: 1px; }
</style>