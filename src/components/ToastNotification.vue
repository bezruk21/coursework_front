<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="toast.type"
      >
        <div class="toast-icon">
          <!-- success -->
          <svg v-if="toast.type === 'success'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <!-- error -->
          <svg v-if="toast.type === 'error'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          <!-- info -->
          <svg v-if="toast.type === 'info'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <span class="toast-msg">{{ toast.message }}</span>
        <button class="toast-close" @click="remove(toast.id)">×</button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)
const { remove } = toastStore
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 360px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  font-size: 13px;
  letter-spacing: 0.5px;
  color: #ccc;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  min-width: 280px;
}

.toast.success { border-left: 3px solid #c9a84c; }
.toast.success .toast-icon { color: #c9a84c; }

.toast.error { border-left: 3px solid #e55; }
.toast.error .toast-icon { color: #e55; }

.toast.info { border-left: 3px solid #888; }
.toast.info .toast-icon { color: #888; }

.toast-icon { flex-shrink: 0; }
.toast-msg { flex: 1; line-height: 1.4; }

.toast-close {
  background: none;
  border: none;
  color: #444;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.2s;
}
.toast-close:hover { color: #c9a84c; }

/* Анімація */
.toast-enter-active { transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from { opacity: 0; transform: translateX(40px); }
.toast-leave-to { opacity: 0; transform: translateX(40px); }
</style>