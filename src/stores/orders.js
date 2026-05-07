import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref(JSON.parse(localStorage.getItem('orders') || '[]'))

  function addOrder(item) {
    const order = {
      id: Date.now(),
      ...item,
      status: 'active',
      statusLabel: 'АКТИВНЕ',
      createdAt: new Date().toISOString(),
    }
    orders.value.unshift(order)
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }

  return { orders, addOrder }
})