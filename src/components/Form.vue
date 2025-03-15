<script setup lang="ts">
import { reactive } from 'vue';
import { useFormValidation } from '../composables/useFormValidation';
import type { FormData } from '../types/form';

const formData = reactive<FormData>({
  email: {
    value: '',
    rules: [
      (v: any) => !!v || 'Email обязателен',
      (v: string) => /.+@.+\..+/.test(v) || 'Email должен быть валидным'
    ]
  },
  password: {
    value: '',
    rules: [
      (v: any) => !!v || 'Пароль обязателен',
      (v: string) => v.length >= 6 || 'Пароль должен быть не менее 6 символов'
    ]
  }
});

const { fieldsValidity, isFormValid, submitted} = useFormValidation(formData);

const submitForm = () => {

  submitted.value = true;

  if (isFormValid.value) {
    console.log('Form submitted successfully', {
      email: formData.email.value,
      password: formData.password.value
    });

    formData.email.value = '';
    formData.password.value = '';
    submitted.value = false;
  }
};
</script>


<template>
  <form @submit.prevent="submitForm" class="form">
    <h2>Регистрация</h2>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="formData.email.value"
        type="email"
        placeholder="Введите email"
        class="form-input"
        aria-describedby="email-error"
      />
      <p
        v-if="submitted.value && !fieldsValidity.email.isValid"
        id="email-error"
        class="error"
        aria-live="polite"
      >
        {{ fieldsValidity.email.errorMessage }}
      </p>
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input
        id="password"
        v-model="formData.password.value"
        type="password"
        placeholder="Введите пароль"
        class="form-input"
        aria-describedby="password-error"
      />
      <p
        v-if="submitted.value && !fieldsValidity.password.isValid"
        id="password-error"
        class="error"
        aria-live="polite"
      >
        {{ fieldsValidity.password.errorMessage }}
      </p>
    </div>
    <button
      type="submit"
      class="btn"
      :disabled="submitted.value && !isFormValid"
    >
      Отправить
    </button>
  </form>
</template>


<style scoped>
.form {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error {
  color: #ef4444;
  margin-top: 8px;
  font-size: 14px;
  transition: opacity 0.3s ease;
}

.success {
  color: #22c55e;
  text-align: center;
  margin-top: 20px;
  font-weight: 500;
}

.btn {
  width: 100%;
  background: #667eea;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background: #5a67d8;
}

.btn:active {
  transform: scale(0.98);
}

.btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}
</style>