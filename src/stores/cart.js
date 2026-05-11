import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

const API = 'http://localhost:5008/api'

export const useCartStore = defineStore('cart', () => {
  const count = ref(0) // Загальна кількість товарів

  async function fetchCartCount() {
    const authStore = useAuthStore()
    if (!authStore.user) return

    try {
      // Робимо запит до вашого бекенду за кошиком
      const { data } = await axios.get(`${API}/cart/${authStore.user.id}`)
      count.value = data.count ?? 0
    } catch (e) {
      console.error('Помилка завантаження кошика:', e)
      count.value = 0
    }
  }

  return { count, fetchCartCount }
})