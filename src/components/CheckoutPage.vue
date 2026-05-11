<template>
  <div class="checkout-wrapper">

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
        <button class="nav-icon-btn active" @click="$router.push('/cart')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </button>
        <button class="btn-book">ЗАПИСАТИСЬ</button>
      </div>
    </nav>

    <div class="checkout-page">

      <!-- ХЕДЕР -->
      <div class="checkout-header">
        <h1>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h1>
      </div>

      <div class="checkout-layout">

        <!-- ЛІВА ЧАСТИНА — ФОРМА -->
        <div class="checkout-form">

          <!-- ОТРИМУВАЧ -->
          <div class="form-section">
            <div class="section-title">ОТРИМУВАЧ</div>
            <div class="receiver-toggle">
              <button
                class="toggle-btn"
                :class="{ active: receiverType === 'self' }"
                @click="receiverType = 'self'; fillFromAccount()"
              >Я отримувач</button>
              <button
                class="toggle-btn"
                :class="{ active: receiverType === 'other' }"
                @click="receiverType = 'other'; clearReceiver()"
              >Інший отримувач</button>
            </div>

            <div class="form-grid">
              <div class="form-field">
                <label>ІМ'Я</label>
                <input v-model="form.firstName" type="text" placeholder="Ім'я" />
              </div>
              <div class="form-field">
                <label>ПРІЗВИЩЕ</label>
                <input v-model="form.lastName" type="text" placeholder="Прізвище" />
              </div>
              <div class="form-field">
                <label>E-MAIL</label>
                <input v-model="form.email" type="email" placeholder="your@email.com" />
              </div>
              <div class="form-field phone-field">
                <label>ТЕЛЕФОН</label>
                <div class="phone-row">
                  <span class="phone-code">+380</span>
                  <input v-model="form.phone" type="tel" placeholder="XX XXX XX XX" />
                </div>
              </div>
              <div class="form-field full-width">
                <label>КРАЇНА</label>
                <select v-model="form.country">
                  <option value="Ukraine">Україна</option>
                  <option value="Poland">Польща</option>
                  <option value="Germany">Німеччина</option>
                  <option value="France">Франція</option>
                  <option value="United Kingdom">Великобританія</option>
                  <option value="USA">США</option>
                  <option value="other">Інша країна...</option>
                </select>
              </div>
            </div>
          </div>

          <!-- ДОСТАВКА -->
          <div class="form-section">
            <div class="section-title">СПОСІБ ДОСТАВКИ</div>

            <div class="delivery-options">
              <label class="delivery-option" :class="{ active: delivery === 'np_office' }">
                <input type="radio" v-model="delivery" value="np_office" />
                <div class="delivery-option-content">
                  <div class="delivery-name">Нова Пошта — Відділення</div>
                  <div class="delivery-desc">Доставка до найближчого відділення</div>
                </div>
              </label>

              <label class="delivery-option" :class="{ active: delivery === 'np_locker' }">
                <input type="radio" v-model="delivery" value="np_locker" />
                <div class="delivery-option-content">
                  <div class="delivery-name">Нова Пошта — Поштомат</div>
                  <div class="delivery-desc">Самовивіз з поштомату 24/7</div>
                </div>
              </label>

              <label class="delivery-option" :class="{ active: delivery === 'np_address' }">
                <input type="radio" v-model="delivery" value="np_address" />
                <div class="delivery-option-content">
                  <div class="delivery-name">Нова Пошта — Адресна доставка</div>
                  <div class="delivery-desc">Кур'єр доставить за вашою адресою</div>
                </div>
              </label>

              <label class="delivery-option" :class="{ active: delivery === 'showroom' }">
                <input type="radio" v-model="delivery" value="showroom" />
                <div class="delivery-option-content">
                  <div class="delivery-name">Самовивіз із шоуруму</div>
                  <div class="delivery-desc">вул. Хрещатик, 10 · Щодня з 11:00</div>
                </div>
              </label>
            </div>

            <!-- Поля для Нової Пошти -->
            <div class="np-fields" v-if="delivery !== 'showroom'">
              <div class="form-grid">
                <div class="form-field">
                  <label>МІСТО</label>
                  <input v-model="form.city" type="text" placeholder="Введіть місто" />
                </div>
                <div class="form-field" v-if="delivery === 'np_office'">
                  <label>ВІДДІЛЕННЯ</label>
                  <input v-model="form.office" type="text" placeholder="Номер відділення" />
                </div>
                <div class="form-field full-width" v-if="delivery === 'np_address'">
                  <label>АДРЕСА</label>
                  <input v-model="form.address" type="text" placeholder="Вулиця, будинок, квартира" />
                </div>
              </div>
            </div>
          </div>

          <!-- ОПЛАТА -->
          <div class="form-section">
            <div class="section-title">СПОСІБ ОПЛАТИ</div>

            <div class="payment-options">
              <label class="payment-option" :class="{ active: payment === 'card' }">
                <input type="radio" v-model="payment" value="card" />
                <div class="payment-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  <span>Банківська картка</span>
                </div>
              </label>

              <label class="payment-option" :class="{ active: payment === 'cash' }">
                <input type="radio" v-model="payment" value="cash" />
                <div class="payment-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="2" y="6" width="20" height="12" rx="1"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>Готівка при отриманні</span>
                </div>
              </label>

              <label class="payment-option" :class="{ active: payment === 'parts' }">
                <input type="radio" v-model="payment" value="parts" />
                <div class="payment-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <span>Оплата частинами</span>
                </div>
              </label>
            </div>

            <!-- Поля картки -->
            <div class="card-fields" v-if="payment === 'card'">
              <div class="form-grid">
                <div class="form-field full-width">
                  <label>НОМЕР КАРТКИ</label>
                  <input v-model="form.cardNumber" type="text" placeholder="0000 0000 0000 0000" maxlength="19" @input="formatCard" />
                </div>
                <div class="form-field">
                  <label>ТЕРМІН ДІЇ</label>
                  <input v-model="form.cardExpiry" type="text" placeholder="MM/YY" maxlength="5" />
                </div>
                <div class="form-field">
                  <label>CVV</label>
                  <input v-model="form.cardCvv" type="password" placeholder="•••" maxlength="3" />
                </div>
              </div>
            </div>
          </div>

          <!-- КОМЕНТАР -->
          <div class="form-section">
            <div class="section-title">КОМЕНТАР ДО ЗАМОВЛЕННЯ</div>
            <textarea
              v-model="form.comment"
              placeholder="Додаткові побажання щодо замовлення..."
              rows="3"
            ></textarea>
          </div>

        </div>

        <!-- ПРАВА ЧАСТИНА — ПІДСУМОК -->
        <div class="checkout-summary">
          <div class="summary-title">ВАШЕ ЗАМОВЛЕННЯ</div>

          <div class="summary-items">
            <div class="summary-item" v-for="item in cartItems" :key="item.DressId">
              <div class="summary-img">
                <img :src="item.ImageUrl" :alt="item.DressName" />
              </div>
              <div class="summary-info">
                <span class="summary-brand">{{ item.Brand }}</span>
                <span class="summary-name">{{ item.DressName }}</span>
                <span class="summary-qty">× {{ item.Quantity }}</span>
              </div>
              <span class="summary-price">{{ formatPrice(item.Subtotal) }} ₴</span>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row">
            <span>Оренда</span>
            <span>{{ formatPrice(cartTotal) }} ₴</span>
          </div>
          <div class="summary-row">
            <span>Доставка</span>
            <span>{{ delivery === 'showroom' ? 'Безкоштовно' : '150 ₴' }}</span>
          </div>
          <div class="summary-row total">
            <span>РАЗОМ</span>
            <span>{{ formatPrice(finalTotal) }} ₴</span>
          </div>

          <button class="btn-order" @click="submitOrder" :disabled="ordering">
            {{ ordering ? 'ОФОРМЛЕННЯ...' : 'ПІДТВЕРДИТИ ЗАМОВЛЕННЯ' }}
          </button>

          <router-link to="/cart" class="btn-back">← Повернутись до кошика</router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const API = 'http://localhost:5008/api'
const authStore = useAuthStore()
const router = useRouter()

const isScrolled = ref(false)
const receiverType = ref('self')
const delivery = ref('np_office')
const payment = ref('card')
const ordering = ref(false)
const cartItems = ref([])
const cartTotal = ref(0)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'Ukraine',
  city: '',
  office: '',
  address: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  comment: ''
})

const finalTotal = computed(() => {
  return cartTotal.value + (delivery.value === 'showroom' ? 0 : 150)
})

function fillFromAccount() {
  if (authStore.user) {
    const name = authStore.user.username || ''
    const parts = name.split(' ')
    form.value.firstName = parts[0] || name
    form.value.lastName = parts[1] || ''
    form.value.email = authStore.user.email || ''
  }
}

function clearReceiver() {
  form.value.firstName = ''
  form.value.lastName = ''
  form.value.email = ''
  form.value.phone = ''
}

function formatCard() {
  form.value.cardNumber = form.value.cardNumber
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatPrice(p) {
  return Number(p).toLocaleString('uk-UA')
}

async function fetchCart() {
  if (!authStore.user) return
  try {
    const { data } = await axios.get(`${API}/cart/${authStore.user.id}`)
    cartItems.value = data.Items || []
    cartTotal.value = data.Total || 0
  } catch (e) {
    console.error(e)
  }
}

async function submitOrder() {
  if (!form.value.firstName || !form.value.phone) {
    alert("Заповніть ім'я та телефон")
    return
  }
  ordering.value = true
  try {
    await axios.post(`${API}/orders`, {
      userId: authStore.user.id,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      country: form.value.country,
      city: form.value.city,
      deliveryType: delivery.value,
      deliveryAddress: form.value.address || form.value.office || '',
      paymentType: payment.value,
      comment: form.value.comment
    })
    router.push('/')
  } catch (e) {
    console.error(e)
    alert('Помилка оформлення замовлення')
  } finally {
    ordering.value = false
  }
}

window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 40 })

onMounted(() => {
  if (!authStore.user) { router.push('/login'); return }
  fillFromAccount()
  fetchCart()
})
</script>

<style scoped>
.checkout-wrapper { min-height: 100vh; background: #0e0e0e; color: #fff; }

/* NAVBAR */
.navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 24px 48px; display: flex; align-items: center; justify-content: space-between; transition: all 0.4s; }
.navbar.scrolled { background: rgba(10,10,10,0.95); backdrop-filter: blur(20px); padding: 16px 48px; border-bottom: 1px solid rgba(201,168,76,0.15); }
.navbar-logo { font-size: 18px; font-weight: 400; letter-spacing: 0.15em; text-decoration: none; color: #f5f0e8; display: flex; align-items: center; gap: 8px; }
.logo-accent { color: #c9a84c; font-style: italic; }
.logo-separator { width: 20px; height: 1px; background: #c9a84c; display: inline-block; }
.nav-links { display: flex; align-items: center; gap: 40px; list-style: none; margin: 0; padding: 0; }
.nav-link { font-size: 10px; font-weight: 500; letter-spacing: 0.25em; color: #888; text-decoration: none; transition: color 0.2s; text-transform: uppercase; }
.nav-link:hover { color: #c9a84c; }
.nav-actions { display: flex; align-items: center; gap: 8px; }
.nav-icon-btn { width: 40px; height: 40px; background: transparent; border: none; color: #888; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color 0.2s; }
.nav-icon-btn:hover, .nav-icon-btn.active { color: #c9a84c; }
.btn-book { background: transparent; border: 1px solid rgba(201,168,76,0.5); color: #c9a84c; padding: 10px 24px; font-size: 10px; letter-spacing: 0.2em; cursor: pointer; transition: all 0.3s; }
.btn-book:hover { background: #c9a84c; color: #0a0a0a; }

/* PAGE */
.checkout-page { padding: 120px 60px 80px; max-width: 1200px; margin: 0 auto; }
.checkout-header { margin-bottom: 50px; padding-bottom: 25px; border-bottom: 1px solid #1e1e1e; }
.checkout-header h1 { font-size: 13px; letter-spacing: 4px; font-weight: 400; color: #fff; }

/* LAYOUT */
.checkout-layout { display: grid; grid-template-columns: 1fr 380px; gap: 60px; align-items: start; }

/* FORM SECTIONS */
.checkout-form { display: flex; flex-direction: column; gap: 40px; }
.form-section { display: flex; flex-direction: column; gap: 20px; }
.section-title { font-size: 10px; letter-spacing: 4px; color: #555; padding-bottom: 15px; border-bottom: 1px solid #1a1a1a; }

/* RECEIVER TOGGLE */
.receiver-toggle { display: flex; gap: 0; }
.toggle-btn { background: transparent; border: 1px solid #2a2a2a; color: #555; padding: 10px 20px; font-size: 11px; letter-spacing: 2px; cursor: pointer; transition: all 0.2s; }
.toggle-btn:first-child { border-right: none; }
.toggle-btn.active { border-color: #c9a84c; color: #c9a84c; background: rgba(201,168,76,0.05); }

/* FORM GRID */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.form-field { display: flex; flex-direction: column; gap: 8px; }
.form-field.full-width { grid-column: 1 / -1; }
.form-field label { font-size: 10px; letter-spacing: 2px; color: #555; }
.form-field input,
.form-field select,
textarea {
  background: #111;
  border: 1px solid #2a2a2a;
  color: #fff;
  padding: 12px 15px;
  font-size: 13px;
  outline: none;
  transition: border 0.2s;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}
.form-field input:focus,
.form-field select:focus,
textarea:focus { border-color: #c9a84c; }
.form-field select option { background: #111; }
textarea { resize: vertical; min-height: 80px; }

/* PHONE */
.phone-row { display: flex; }
.phone-code { background: #1a1a1a; border: 1px solid #2a2a2a; border-right: none; color: #666; padding: 12px 12px; font-size: 13px; white-space: nowrap; }
.phone-row input { border-left: none; }

/* DELIVERY */
.delivery-options { display: flex; flex-direction: column; gap: 10px; }
.delivery-option { display: flex; align-items: center; gap: 15px; padding: 16px 20px; border: 1px solid #2a2a2a; cursor: pointer; transition: all 0.2s; }
.delivery-option input { display: none; }
.delivery-option.active { border-color: #c9a84c; background: rgba(201,168,76,0.03); }
.delivery-option-content { display: flex; flex-direction: column; gap: 4px; }
.delivery-name { font-size: 13px; color: #fff; }
.delivery-desc { font-size: 11px; color: #555; letter-spacing: 1px; }
.delivery-option.active .delivery-name { color: #c9a84c; }
.np-fields { margin-top: 5px; }

/* PAYMENT */
.payment-options { display: flex; flex-direction: column; gap: 10px; }
.payment-option { display: flex; align-items: center; gap: 15px; padding: 16px 20px; border: 1px solid #2a2a2a; cursor: pointer; transition: all 0.2s; }
.payment-option input { display: none; }
.payment-option.active { border-color: #c9a84c; background: rgba(201,168,76,0.03); }
.payment-content { display: flex; align-items: center; gap: 12px; font-size: 13px; color: #888; }
.payment-option.active .payment-content { color: #c9a84c; }
.card-fields { margin-top: 10px; }

/* SUMMARY */
.checkout-summary { background: #111; border: 1px solid #1e1e1e; padding: 35px; position: sticky; top: 100px; display: flex; flex-direction: column; gap: 16px; }
.summary-title { font-size: 11px; letter-spacing: 4px; color: #fff; margin-bottom: 5px; }
.summary-items { display: flex; flex-direction: column; gap: 15px; }
.summary-item { display: grid; grid-template-columns: 60px 1fr auto; gap: 12px; align-items: center; }
.summary-img { width: 60px; height: 80px; overflow: hidden; background: #1a1a1a; }
.summary-img img { width: 100%; height: 100%; object-fit: cover; }
.summary-info { display: flex; flex-direction: column; gap: 4px; }
.summary-brand { font-size: 9px; letter-spacing: 2px; color: #c9a84c; }
.summary-name { font-size: 12px; color: #fff; font-weight: 300; }
.summary-qty { font-size: 11px; color: #444; }
.summary-price { font-size: 13px; color: #fff; white-space: nowrap; }
.summary-divider { height: 1px; background: #1e1e1e; margin: 5px 0; }
.summary-row { display: flex; justify-content: space-between; font-size: 12px; color: #666; letter-spacing: 1px; }
.summary-row.total { color: #fff; font-size: 14px; letter-spacing: 2px; padding-top: 12px; border-top: 1px solid #1e1e1e; margin-top: 5px; }

.btn-order { background: transparent; border: 1px solid #c9a84c; color: #c9a84c; padding: 16px; font-size: 11px; letter-spacing: 3px; cursor: pointer; transition: all 0.3s; margin-top: 5px; }
.btn-order:hover:not(:disabled) { background: #c9a84c; color: #0e0e0e; }
.btn-order:disabled { opacity: 0.5; cursor: default; }

.btn-back { text-align: center; font-size: 11px; color: #444; letter-spacing: 1px; text-decoration: none; transition: color 0.2s; }
.btn-back:hover { color: #c9a84c; }
</style>