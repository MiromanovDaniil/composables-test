<script setup lang="ts">
import { useFetch } from '../composables/useFetch';
import { ref } from 'vue';

const { data, isLoading, execute } = useFetch<any>();
const error = ref<string | null>(null);

const loadData = async () => {
  try {
    error.value = null;
    await execute({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'GET'
    });
  } catch (err) {
    error.value = 'Failed to load data. Please try again.';
  }
};
</script>

<template>
  <div class="container">
    <button 
      @click="loadData"
      class="fetch-button"
      :disabled="isLoading"
    >
      <span v-if="!isLoading">✨ Load Data</span>
      <span v-else class="loading-text">🚀 Loading...</span>
    </button>

    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
    </div>

    <transition name="fade">
      <div v-if="isLoading" class="loading-spinner">
        <div class="spinner"></div>
      </div>
    </transition>

    <transition name="slide">
      <div 
        v-if="data && !isLoading"
        class="data-container"
      >
        <pre class="data-content">{{ data }}</pre>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.fetch-button {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
}

.fetch-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
}

.fetch-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.data-container {
  margin-top: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.data-content {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: #334155;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #e2e8f0;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #fca5a5;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>