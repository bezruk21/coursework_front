<template>
  <div class="auth-center">
    <div class="auth-box">

      <div class="brand">
        PLATINUM <span class="logo-separator"></span> <em>RENT</em>
      </div>

      <h2>Увійти</h2>
      <p class="subtitle">Доступ до особистого кабінету</p>

      <Transition name="fade">
        <div class="error-bar" v-if="error">{{ error }}</div>
      </Transition>

      <div class="form">
        <div class="form-field">
          <label class="form-label">EMAIL</label>
          <input
            class="form-input"
            :class="{ error: fieldError === 'email' }"
            v-model="email"
            type="email"
            placeholder="your@email.com"
          />
        </div>

        <div class="form-field">
          <label class="form-label">ПАРОЛЬ</label>
          <input
            class="form-input"
            :class="{ error: fieldError === 'password' }"
            v-model="password"
            type="password"
            placeholder="••••••••"
            @keydown.enter="submit"
          />
        </div>

        <button class="btn-gold" @click="submit" :disabled="loading">
          <span>{{ loading ? 'ЗАВАНТАЖЕННЯ...' : 'УВІЙТИ' }}</span>
        </button>

        <div class="divider">
          <div class="divider-line"></div>
          <span class="divider-text">АБО</span>
          <div class="divider-line"></div>
        </div>

        <router-link to="/register" class="btn-outline">РЕЄСТРАЦІЯ</router-link>

        <p class="switch">
          Забули пароль?
          <router-link to="/forgot">Відновити доступ</router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const fieldError = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  fieldError.value = ''

  if (!email.value) { fieldError.value = 'email'; error.value = 'Введіть email'; return }
  if (!password.value) { fieldError.value = 'password'; error.value = 'Введіть пароль'; return }

  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.message || 'Невірний email або пароль'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ===== BASE ===== */
:root {
  --black: #0a0a0a;
  --black-soft: #111111;
  --gold: #c9a84c;
  --gold-dark: #a8893a;
  --gold-light: #dfc06e;
  --cream: #f0ead8;
  --cream-muted: #d4cbb8;
  --grey-text: #888880;
  --grey-mid: #555550;
  --grey-dark: #333330;
  --radius-full: 999px;
  --radius-lg: 16px;
  --radius-sm: 6px;
  --transition: 0.3s ease;
  --transition-fast: 0.15s ease;
}

.auth-center {
  min-height: 100vh;
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

/* ===== BOX ===== */
.auth-box {
  background: var(--black-soft);
  border: 1px solid rgba(201, 168, 76, 0.15);
  border-radius: var(--radius-lg);
  padding: 60px 50px;
  width: 100%;
  max-width: 440px;
  text-align: center;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
}

/* ===== BRAND ===== */
.brand {
  color: var(--cream);
  font-size: 12px;
  letter-spacing: 3px;
  margin-bottom: 40px;
  font-weight: 300;
}
.brand em { color: var(--gold); font-style: italic; }
.logo-separator {
  display: inline-block;
  width: 20px;
  height: 1px;
  background: var(--gold);
  vertical-align: middle;
  margin: 0 4px;
}

/* ===== HEADINGS ===== */
h2 {
  font-size: 30px;
  font-weight: 300;
  color: var(--cream);
  margin-bottom: 8px;
}
.subtitle {
  color: var(--grey-text);
  font-size: 13px;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

/* ===== ERROR ===== */
.error-bar {
  background: rgba(150, 30, 30, 0.15);
  border: 1px solid rgba(200, 60, 60, 0.3);
  color: #e55;
  padding: 12px 16px;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 24px;
  border-radius: var(--radius-sm);
  text-align: left;
}

/* ===== FORM ===== */
.form { display: flex; flex-direction: column; gap: 20px; }
.form-field { display: flex; flex-direction: column; gap: 8px; text-align: left; }

.form-label {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--grey-mid);
}

.form-input {
  background: var(--black);
  border: 1px solid rgba(201, 168, 76, 0.12);
  color: var(--cream);
  padding: 14px 16px;
  font-size: 13px;
  outline: none;
  border-radius: var(--radius-sm);
  width: 100%;
  box-sizing: border-box;
  transition: border-color var(--transition);
}
.form-input:focus { border-color: var(--gold); }
.form-input.error { border-color: #933; }
.form-input::placeholder { color: var(--grey-dark); }

/* ===== BUTTONS ===== */
.btn-gold {
  display: block;
  width: 100%;
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 15px 40px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 4px;
  cursor: pointer;
  border-radius: var(--radius-full);
  position: relative;
  overflow: hidden;
  transition: color var(--transition);
  margin-top: 8px;
}
.btn-gold::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold);
  transform: translateX(-100%);
  transition: transform var(--transition);
  z-index: 0;
}
.btn-gold span { position: relative; z-index: 1; }
.btn-gold:hover:not(:disabled) { color: var(--black); }
.btn-gold:hover:not(:disabled)::before { transform: translateX(0); }
.btn-gold:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-outline {
  display: block;
  text-align: center;
  background: transparent;
  border: 1px solid rgba(201, 168, 76, 0.2);
  color: var(--grey-text);
  padding: 15px 40px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 3px;
  text-decoration: none;
  border-radius: var(--radius-full);
  transition: border-color var(--transition), color var(--transition);
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold); }

/* ===== DIVIDER ===== */
.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 4px 0;
}
.divider-line { flex: 1; height: 1px; background: rgba(201, 168, 76, 0.1); }
.divider-text { font-size: 10px; letter-spacing: 3px; color: var(--grey-dark); }

/* ===== SWITCH ===== */
.switch { color: var(--grey-mid); font-size: 12px; margin-top: 8px; letter-spacing: 1px; }
.switch a { color: var(--gold); text-decoration: none; transition: color var(--transition-fast); }
.switch a:hover { color: var(--gold-light); }

/* ===== TRANSITIONS ===== */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>