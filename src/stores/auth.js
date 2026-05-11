import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL + '/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isLoggedIn = computed(() => !!user.value)

  async function login(email, password) {
    const res = await axios.post(`${API}/auth/login`, { email, password })
    user.value = res.data
    localStorage.setItem('user', JSON.stringify(res.data))
  }

  async function register(username, email, password) {
    const res = await axios.post(`${API}/auth/register`, { username, email, password })
    user.value = res.data
    localStorage.setItem('user', JSON.stringify(res.data))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }
  function updateUser(data) {
  user.value = { ...user.value, ...data }
  // якщо є localStorage:
  localStorage.setItem('user', JSON.stringify(user.value))
}

  return { user, isLoggedIn, login, register, logout, updateUser }
})