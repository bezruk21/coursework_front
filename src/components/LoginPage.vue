<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <div class="brand">PLATINUM — <em>RENT</em></div>
      <h2>Увійти</h2>

      <div class="error" v-if="error">{{ error }}</div>

      <div class="form">
        <div class="field">
          <label>EMAIL</label>
          <input v-model="email" type="email" placeholder="your@email.com" />
        </div>
        <div class="field">
          <label>ПАРОЛЬ</label>
          <input v-model="password" type="password" placeholder="••••••••" />
        </div>
        <button class="btn-gold" @click="submit" :disabled="loading">
          {{ loading ? 'ЗАВАНТАЖЕННЯ...' : 'УВІЙТИ' }}
        </button>
        <p class="switch">
          Немає акаунту?
          <router-link to="/register">Зареєструватися</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.message || 'Помилка входу'
  } finally {
    loading.value = false
  }

const toast = useToastStore()
}
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  background: #0e0e0e;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-box {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  padding: 60px 50px;
  min-width: 400px;
  text-align: center;
}
.brand {
  color: #fff;
  font-size: 13px;
  letter-spacing: 3px;
  margin-bottom: 40px;
  font-weight: 300;
}
.brand em { color: #c9a84c; font-style: italic; }
h2 {
  color: #fff;
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 35px;
}
.form { display: flex; flex-direction: column; gap: 20px; }
.field { text-align: left; }
.field label {
  display: block;
  color: #666;
  font-size: 11px;
  letter-spacing: 2px;
  margin-bottom: 8px;
}
.field input {
  width: 100%;
  background: #111;
  border: 1px solid #2a2a2a;
  color: #fff;
  padding: 12px 15px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border 0.3s;
}
.field input:focus { border-color: #c9a84c; }
.btn-gold {
  background: transparent;
  border: 1px solid #c9a84c;
  color: #c9a84c;
  padding: 14px;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-gold:hover:not(:disabled) {
  background: #c9a84c;
  color: #0e0e0e;
}
.btn-gold:disabled { opacity: 0.5; cursor: default; }
.switch { color: #555; font-size: 13px; margin-top: 5px; }
.switch a { color: #c9a84c; text-decoration: none; }
.error {
  background: #2a1111;
  border: 1px solid #5a1a1a;
  color: #e88;
  padding: 10px;
  font-size: 13px;
  margin-bottom: 15px;
}
</style>