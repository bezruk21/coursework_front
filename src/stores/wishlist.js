import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

const API = 'http://localhost:5008/api'

export const useWishlistStore = defineStore('wishlist', () => {
  // Зберігаємо ID суконь, які лайкнув юзер
  const wishedIds = ref(new Set())
  
  // Автоматично рахуємо кількість
  const count = computed(() => wishedIds.value.size)

  // Функція для завантаження обраного з сервера
  async function fetchWishlist() {
    const authStore = useAuthStore()
    if (!authStore.user) return

    try {
      const { data } = await axios.get(`${API}/wishlist/${authStore.user.id}`)
      const items = Array.isArray(data) ? data : (data?.items || [])
      wishedIds.value = new Set(items.map(item => item.dressId ?? item.id))
    } catch (e) {
      console.error('Помилка завантаження обраного:', e)
    }
  }

  // Функція для кліку по сердечку
  async function toggleWish(dressId) {
    const authStore = useAuthStore()
    if (!authStore.user) return false // Повертаємо false, якщо не авторизований

    try {
      await axios.post(`${API}/wishlist/${authStore.user.id}/toggle/${dressId}`)
      
      // Оновлюємо кількість локально
      if (wishedIds.value.has(dressId)) {
        wishedIds.value.delete(dressId)
      } else {
        wishedIds.value.add(dressId)
      }
      return true
    } catch (e) {
      console.error('Помилка:', e)
      return false
    }
  }

  return { wishedIds, count, fetchWishlist, toggleWish }
})