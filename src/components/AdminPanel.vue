<template>
  <div class="admin-page">
    <div class="admin-header">
      <div class="admin-brand">PLATINUM — <em>RENT</em></div>
      <h1>ПАНЕЛЬ АДМІНІСТРАТОРА</h1>
      <router-link to="/" class="back-link">← На головну</router-link>
    </div>

    <div class="admin-content">
      <div class="admin-card">
        <h2>{{ editingId ? 'РЕДАГУВАТИ СУКНЮ' : 'ДОДАТИ СУКНЮ' }}</h2>

        <div class="admin-form">
          <div class="form-row">
            <div class="form-field">
              <label>НАЗВА</label>
              <input v-model="form.name" placeholder="Сукня Thelma" />
            </div>
            <div class="form-field">
              <label>БРЕНД</label>
              <input v-model="form.brand" placeholder="AFRM" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>ЦІНА (₴)</label>
              <input v-model.number="form.price" type="number" />
            </div>
            <div class="form-field">
              <label>РОЗМІР</label>
              <select v-model="form.size">
                <option value="">Вибрати...</option>
                <option v-for="s in sizes" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>КОЛІР</label>
              <input v-model="form.color" placeholder="Чорний" />
            </div>
            <div class="form-field">
              <label>ДРЕСКОД</label>
              <select v-model="form.dresscode">
                <option value="">Вибрати...</option>
                <option v-for="dc in dresscodes" :key="dc" :value="dc">{{ dc }}</option>
              </select>
            </div>
            <!-- Розміри -->
<div class="form-field full-width">
  <label>ДОСТУПНІ РОЗМІРИ (вибери кілька)</label>
  <div class="occasions-grid">
    <label v-for="s in allSizes" :key="s" class="occasion-check">
      <input type="checkbox" :value="s" v-model="form.sizes" />
      <span>{{ s }}</span>
    </label>
  </div>
</div>

<!-- Застава -->
<div class="form-row">
  <div class="form-field">
    <label>ЗАСТАВА (₴)</label>
    <input v-model.number="form.deposit" type="number" placeholder="1700" />
  </div>
</div>
          </div>

          <div class="form-field full-width">
            <label>СУКНЯ ДЛЯ (можна вибрати кілька)</label>
            <div class="occasions-grid">
              <label v-for="occ in occasionsList" :key="occ" class="occasion-check">
                <input type="checkbox" :value="occ" v-model="form.occasions" />
                <span>{{ occ }}</span>
              </label>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field-check">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.isNew" />
                <span>Новинка</span>
              </label>
            </div>
            <div class="form-field-check">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.wasRented" />
                <span>Була в прокаті</span>
              </label>
            </div>
          </div>

          <div class="form-field full-width">
            <label>ФОТО (додай кілька)</label>
            <div class="img-add-row">
              <input v-model="form.newImageUrl" placeholder="https://..." @keyup.enter="addImage" />
              <button class="btn-add-img" @click="addImage">+ Додати</button>
            </div>
            <div class="images-list" v-if="form.images.length > 0">
              <div class="img-item" v-for="(img, i) in form.images" :key="i">
                <img :src="img" />
                <button class="img-remove" @click="removeImage(i)">×</button>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button class="btn-gold" @click="submitDress" :disabled="loading">
              {{ loading ? 'ЗБЕРЕЖЕННЯ...' : (editingId ? 'ЗБЕРЕГТИ' : 'ДОДАТИ СУКНЮ') }}
            </button>
            <button class="btn-outline" v-if="editingId" @click="cancelEdit">СКАСУВАТИ</button>
          </div>

          <div class="success-msg" v-if="successMsg">{{ successMsg }}</div>
          <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
        </div>
      </div>

      <div class="admin-card">
        <div class="list-header">
          <h2>ВСІ СУКНІ</h2>
          <span class="count">{{ dresses.length }} позицій</span>
        </div>
        <div class="loading-row" v-if="listLoading">Завантаження...</div>
        <div class="dresses-list" v-else>
          <div class="dress-row" v-for="dress in dresses" :key="dress.id">
            <div class="dress-row-img">
              <img :src="getFirstImage(dress)" :alt="dress.name" />
            </div>
            <div class="dress-row-info">
              <span class="dress-row-brand">{{ dress.brand }}</span>
              <span class="dress-row-name">{{ dress.name }}</span>
              <span class="dress-row-meta">{{ dress.size }} · {{ dress.color }}</span>
            </div>
            <div class="dress-row-price">{{ dress.price?.toLocaleString('uk-UA') }} ₴</div>
            <div class="dress-row-badge" v-if="dress.isNew">NEW</div>
            <div class="dress-row-actions">
              <button class="btn-edit" @click="startEdit(dress)">Редагувати</button>
              <button class="btn-delete" @click="deleteDress(dress.id, dress.name)">Видалити</button>
            </div>
          </div>
          <div class="empty-list" v-if="dresses.length === 0">Поки немає жодної сукні</div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" v-if="confirmDelete" @click.self="confirmDelete = null">
      <div class="modal">
        <h3>Видалити сукню?</h3>
        <p>«{{ confirmDelete.name }}» буде видалена назавжди</p>
        <div class="modal-actions">
          <button class="btn-delete" @click="confirmDeleteDress">ВИДАЛИТИ</button>
          <button class="btn-outline" @click="confirmDelete = null">СКАСУВАТИ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API = 'http://localhost:5008/api'

const occasionsList = [
  'Весілля', 'Вагітних', 'Вечірки в стилі Гетсбі',
  'Випускного вечора', 'Клубної вечірки', 'Корпоративної вечірки',
  'Новорічної ночі', 'Офіційного заходу', 'Подружки нареченої', 'Романтичного вечора'
]
const dresscodes = ['Black tie', 'Cocktail', 'Smart casual', 'Casual']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const emptyForm = () => ({
  name: '',
  brand: '',
  price: 0,
  deposit: 0,        // ← додай
  imageUrl: '',
  images: [],
  newImageUrl: '',
  size: '',
  sizes: [],         // ← додай
  color: '',
  isNew: true,
  occasions: [],
  dresscode: '',
  wasRented: false
})

const form = ref(emptyForm())
const dresses = ref([])
const loading = ref(false)
const listLoading = ref(true)
const successMsg = ref('')
const errorMsg = ref('')
const editingId = ref(null)
const confirmDelete = ref(null)

function getFirstImage(dress) {
  try {
    const imgs = JSON.parse(dress.images || '[]')
    if (imgs.length > 0) return imgs[0]
  } catch {}
  return dress.imageUrl || 'https://via.placeholder.com/60x80'
}

function addImage() {
  if (form.value.newImageUrl.trim()) {
    form.value.images.push(form.value.newImageUrl.trim())
    form.value.newImageUrl = ''
  }
}

function removeImage(index) {
  form.value.images.splice(index, 1)
}

async function fetchDresses() {
  listLoading.value = true
  try {
    const { data } = await axios.get(`${API}/dresses`)
    dresses.value = data
  } catch (e) {
    console.error(e)
  } finally {
    listLoading.value = false
  }
}

async function submitDress() {
  if (!form.value.name || !form.value.brand || !form.value.price) {
    errorMsg.value = 'Заповніть назву, бренд і ціну'
    return
  }
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''

  const payload = {
    name: form.value.name,
  brand: form.value.brand,
  price: form.value.price,
  deposit: form.value.deposit,          // ← додай
  imageUrl: form.value.images[0] || '',
  images: JSON.stringify(form.value.images),
  size: form.value.sizes[0] || '',
  sizes: JSON.stringify(form.value.sizes), // ← додай
  color: form.value.color,
  isNew: form.value.isNew,
  occasions: JSON.stringify(form.value.occasions),
  dresscode: form.value.dresscode,
  wasRented: form.value.wasRented
  }

  try {
    if (editingId.value) {
      await axios.put(`${API}/dresses/${editingId.value}`, payload)
      successMsg.value = '✓ Сукню оновлено'
    } else {
      await axios.post(`${API}/dresses`, payload)
      successMsg.value = '✓ Сукню додано'
    }
    form.value = emptyForm()
    editingId.value = null
    await fetchDresses()
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch (e) {
    errorMsg.value = 'Помилка збереження'
    console.error(e)
  } finally {
    loading.value = false
  }
}

function startEdit(dress) {
  editingId.value = dress.id
  let occasions = []
  let images = []
  let sizes = []
try { sizes = JSON.parse(dress.sizes || '[]') } catch {}
  try { occasions = JSON.parse(dress.occasions || '[]') } catch {}
  try { images = JSON.parse(dress.images || '[]') } catch {}

  form.value = {
    name: dress.name,
    brand: dress.brand,
    price: dress.price,
    imageUrl: dress.imageUrl || '',
    images,
    newImageUrl: '',
    size: dress.size,
    color: dress.color,
    isNew: dress.isNew,
    occasions,
    deposit: dress.deposit || 0,
    sizes,
    size: dress.size || '',
    dresscode: dress.dresscode || '',
    wasRented: dress.wasRented || false
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelEdit() {
  editingId.value = null
  form.value = emptyForm()
}

function deleteDress(id, name) {
  confirmDelete.value = { id, name }
}

async function confirmDeleteDress() {
  try {
    await axios.delete(`${API}/dresses/${confirmDelete.value.id}`)
    confirmDelete.value = null
    await fetchDresses()
  } catch (e) {
    errorMsg.value = 'Помилка видалення'
    confirmDelete.value = null
  }
}

onMounted(fetchDresses)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

/* ===================== WRAPPER ===================== */
.admin-page { 
  min-height: 100vh; 
  background: var(--black, #0e0e0e); 
  color: var(--cream, #fff); 
  padding: 40px 60px; 
  font-family: var(--font-body, 'Montserrat', sans-serif);
  font-weight: 300;
  line-height: 1.6;
}

/* ===================== HEADER ===================== */
.admin-header { 
  display: flex; align-items: center; gap: 30px; 
  margin-bottom: 50px; padding-bottom: 25px; 
  border-bottom: 1px solid rgba(201,168,76,0.15); 
}
.admin-brand { 
  font-family: var(--font-display, 'Cormorant Garamond', serif);
  font-size: 20px; letter-spacing: 0.15em; color: var(--cream, #fff); font-weight: 400; 
}
.admin-brand em { color: var(--gold, #c9a84c); font-style: italic; }
.admin-header h1 { 
  font-family: var(--font-display, 'Cormorant Garamond', serif);
  font-size: 24px; letter-spacing: 0.1em; font-weight: 300; color: var(--cream-muted, #888); flex: 1; 
  text-transform: uppercase;
}
.back-link { 
  font-size: 11px; letter-spacing: 0.2em; color: var(--gold, #c9a84c); 
  text-decoration: none; text-transform: uppercase; transition: color var(--transition-fast, 0.2s);
}
.back-link:hover { color: var(--cream, #fff); }

/* ===================== CARDS ===================== */
.admin-content { display: flex; flex-direction: column; gap: 40px; }
.admin-card { 
  background: var(--black-soft, #111); 
  border: 1px solid rgba(201,168,76,0.12); 
  padding: 40px; 
  border-radius: var(--radius-md, 8px);
}
.admin-card h2 { 
  font-family: var(--font-display, 'Cormorant Garamond', serif);
  font-size: 22px; letter-spacing: 0.1em; font-weight: 300; margin-bottom: 35px; color: var(--cream, #fff);
}

/* ===================== FORMS ===================== */
.admin-form { display: flex; flex-direction: column; gap: 24px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.form-row.full-width { grid-template-columns: 1fr; }
.form-field { display: flex; flex-direction: column; gap: 8px; }
.form-field.full-width { grid-column: 1 / -1; }
.form-field label { 
  font-size: 10px; letter-spacing: 0.2em; color: var(--grey-text, #555); text-transform: uppercase; font-weight: 500;
}
.form-field input, .form-field select { 
  background: var(--black, #0e0e0e); 
  border: 1px solid rgba(201,168,76, 0.2); 
  color: var(--cream, #fff); 
  padding: 12px 15px; font-size: 13px; outline: none; 
  transition: border var(--transition-fast, 0.2s); 
  font-family: var(--font-body, 'Montserrat', sans-serif);
  border-radius: var(--radius-sm, 4px);
}
.form-field input:focus, .form-field select:focus { border-color: var(--gold, #c9a84c); }
.form-field select option { background: var(--black-soft, #111); }

/* CHECKBOXES */
.form-field-check { display: flex; align-items: center; }
.checkbox-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13px; color: var(--cream-muted, #888); }
.checkbox-label input { accent-color: var(--gold, #c9a84c); width: 16px; height: 16px; cursor: pointer; }
.occasions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px; }
.occasion-check { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--cream-muted, #888); cursor: pointer; }
.occasion-check input { accent-color: var(--gold, #c9a84c); cursor: pointer; }
.occasion-check:hover span { color: var(--cream, #fff); }

/* IMAGES */
.img-add-row { display: flex; gap: 10px; margin-bottom: 12px; }
.img-add-row input { 
  flex: 1; background: var(--black, #0e0e0e); border: 1px solid rgba(201,168,76, 0.2); 
  color: var(--cream, #fff); padding: 10px 15px; font-size: 13px; outline: none; border-radius: var(--radius-sm, 4px);
}
.img-add-row input:focus { border-color: var(--gold, #c9a84c); }

.images-list { display: flex; gap: 12px; flex-wrap: wrap; }
.img-item { position: relative; width: 80px; height: 100px; border-radius: var(--radius-sm, 4px); overflow: hidden; border: 1px solid rgba(201,168,76, 0.1); }
.img-item img { width: 100%; height: 100%; object-fit: cover; }
.img-remove { 
  position: absolute; top: 4px; right: 4px; width: 22px; height: 22px; 
  background: rgba(0,0,0,0.7); border: 1px solid transparent; color: var(--cream, #fff); 
  cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; 
  border-radius: 50%; transition: all var(--transition-fast, 0.2s);
}
.img-remove:hover { background: var(--gold, #c9a84c); color: var(--black, #0e0e0e); }

/* ===================== BUTTONS ===================== */
.form-actions { display: flex; gap: 15px; margin-top: 10px; }

/* Золота кнопка з анімацією як на сайті */
.btn-gold, .btn-add-img { 
  background: transparent; border: 1px solid var(--gold, #c9a84c); color: var(--gold, #c9a84c); 
  padding: 14px 35px; font-size: 10px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase;
  cursor: pointer; transition: color var(--transition, 0.4s); 
  font-family: var(--font-body, 'Montserrat', sans-serif);
  border-radius: var(--radius-full, 50px);
  position: relative; overflow: hidden;
}
.btn-add-img { padding: 10px 24px; }

.btn-gold::before, .btn-add-img::before {
  content: ''; position: absolute; inset: 0; background: var(--gold, #c9a84c);
  transform: translateX(-100%); transition: transform var(--transition, 0.4s); z-index: -1;
}
.btn-gold:hover:not(:disabled), .btn-add-img:hover { color: var(--black, #0e0e0e); }
.btn-gold:hover:not(:disabled)::before, .btn-add-img:hover::before { transform: translateX(0); }
.btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-outline { 
  background: transparent; border: 1px solid rgba(201,168,76, 0.2); color: var(--grey-text, #666); 
  padding: 14px 35px; font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase;
  cursor: pointer; transition: all var(--transition-fast, 0.2s); border-radius: var(--radius-full, 50px);
  font-family: var(--font-body, 'Montserrat', sans-serif);
}
.btn-outline:hover { border-color: var(--gold, #c9a84c); color: var(--gold, #c9a84c); }

.success-msg { color: #6a9; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; }
.error-msg { color: #e88; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; }

/* ===================== LIST ===================== */
.list-header { display: flex; align-items: center; gap: 15px; margin-bottom: 30px; }
.count { font-size: 11px; color: var(--cream-muted, #888); letter-spacing: 0.1em; text-transform: uppercase; }
.loading-row { color: var(--cream-muted, #888); font-size: 13px; padding: 20px 0; }

.dresses-list { display: flex; flex-direction: column; }
.dress-row { 
  display: grid; grid-template-columns: 60px 1fr auto auto auto; gap: 24px; 
  align-items: center; padding: 15px 0; border-bottom: 1px solid rgba(201,168,76, 0.08); 
  transition: background var(--transition-fast, 0.2s); border-radius: var(--radius-sm, 4px);
}
.dress-row:hover { background: rgba(255,255,255,0.02); padding-left: 10px; padding-right: 10px; margin: 0 -10px; }

.dress-row-img { width: 60px; height: 80px; overflow: hidden; background: var(--black, #1a1a1a); border-radius: var(--radius-sm, 4px); }
.dress-row-img img { width: 100%; height: 100%; object-fit: cover; }
.dress-row-info { display: flex; flex-direction: column; gap: 4px; }
.dress-row-brand { font-size: 9px; letter-spacing: 0.3em; color: var(--gold, #c9a84c); text-transform: uppercase; }
.dress-row-name { font-family: var(--font-display, 'Cormorant Garamond', serif); font-size: 18px; color: var(--cream, #fff); font-weight: 300; }
.dress-row-meta { font-size: 11px; color: var(--grey-text, #555); }

.dress-row-price { font-size: 15px; color: var(--cream, #fff); min-width: 80px; text-align: right; font-family: var(--font-display, serif); }
.dress-row-badge { font-size: 9px; letter-spacing: 0.2em; background: var(--gold, #c9a84c); color: var(--black, #0e0e0e); padding: 3px 8px; font-weight: 600; border-radius: var(--radius-sm, 4px); }

.dress-row-actions { display: flex; gap: 10px; }
.btn-edit, .btn-delete { 
  background: transparent; border: 1px solid rgba(201,168,76, 0.2); 
  padding: 8px 16px; font-size: 9px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; transition: all var(--transition-fast, 0.2s); border-radius: var(--radius-full, 50px);
  color: var(--cream-muted, #888); font-family: var(--font-body, 'Montserrat', sans-serif);
}
.btn-edit:hover { border-color: var(--gold, #c9a84c); color: var(--gold, #c9a84c); }
.btn-delete:hover { border-color: #933; color: #e55; }

.empty-list { color: var(--grey-text, #333); font-size: 13px; padding: 40px 0; text-align: center; text-transform: uppercase; letter-spacing: 0.1em; }

/* ===================== MODAL ===================== */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(5px); }
.modal { 
  background: var(--black-soft, #111); border: 1px solid rgba(201,168,76, 0.2); 
  padding: 40px; min-width: 380px; text-align: center; border-radius: var(--radius-md, 8px); 
}
.modal h3 { font-family: var(--font-display, 'Cormorant Garamond', serif); font-size: 22px; letter-spacing: 0.05em; font-weight: 300; margin-bottom: 15px; color: var(--cream, #fff); }
.modal p { color: var(--cream-muted, #888); font-size: 13px; margin-bottom: 30px; font-family: var(--font-body, sans-serif); }
.modal-actions { display: flex; gap: 15px; justify-content: center; }

.btn-delete-main {
  background: transparent; border: 1px solid #933; color: #e55; 
  padding: 14px 30px; font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase;
  cursor: pointer; transition: all var(--transition-fast, 0.2s); border-radius: var(--radius-full, 50px);
  font-family: var(--font-body, 'Montserrat', sans-serif);
}
.btn-delete-main:hover { background: #933; color: #fff; }
</style>