import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 1. Має бути імпорт
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router) // 2. НАЙГОЛОВНІШИЙ РЯДОК! Вмикає переходи
app.mount('#app')