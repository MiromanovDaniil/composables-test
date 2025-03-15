import { reactive, computed, watch } from 'vue';
import type { FieldValidity, FormData } from '../types/form';

export function useFormValidation(formData: FormData) {
  const fieldsValidity = reactive<Record<string, FieldValidity>>({});
  const submitted = reactive({ value: false });

  Object.keys(formData).forEach(fieldName => {
    fieldsValidity[fieldName] = { isValid: true, errorMessage: '' };
  });

  const validateField = (fieldName: string) => {
    if (!fieldsValidity[fieldName]) {
      fieldsValidity[fieldName] = { isValid: true, errorMessage: '' };
    }
    const field = formData[fieldName];
    
    if (!field.rules || !Array.isArray(field.rules)) {
      fieldsValidity[fieldName].isValid = true;
      fieldsValidity[fieldName].errorMessage = '';
      return;
    }

    for (const rule of field.rules) {
      const result = rule(field.value);
      if (result !== true) {
        fieldsValidity[fieldName].isValid = false;
        fieldsValidity[fieldName].errorMessage = typeof result === 'string' ? result : 'Invalid';
        return;
      }
    }
    fieldsValidity[fieldName].isValid = true;
    fieldsValidity[fieldName].errorMessage = '';
  };

  const validateForm = () => {
    submitted.value = true;
    Object.keys(formData).forEach(fieldName => validateField(fieldName));
  };

  const resetValidation = () => {
    submitted.value = false;
    Object.keys(fieldsValidity).forEach(field => {
      fieldsValidity[field].isValid = true;
      fieldsValidity[field].errorMessage = '';
    });
  };

  const isFormValid = computed(() => {
    return Object.values(fieldsValidity).every(field => field.isValid);
  });

  watch(formData, () => {
    Object.keys(formData).forEach(validateField);
  }, { deep: true });

  return {
    fieldsValidity,
    isFormValid,
    submitted,
    validateField,
    validateForm,
    resetValidation,
  };
}