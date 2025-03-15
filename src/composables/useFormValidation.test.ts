import { reactive } from 'vue';
import { useFormValidation } from './useFormValidation';
import { describe, expect, it } from 'vitest';

describe('useFormValidation', () => {
  it('validates required field as invalid if empty', () => {
    const formData = reactive({
      username: {
        value: '',
        rules: [(v: any) => !!v || 'Field is required'],
      },
    });

    const { validateForm, isFormValid, fieldsValidity } = useFormValidation(formData);
    validateForm();
    expect(isFormValid.value).toBe(false);
    expect(fieldsValidity.username.isValid).toBe(false);
    expect(fieldsValidity.username.errorMessage).toBe('Field is required');
  });

  it('validates required field as valid if non-empty', () => {
    const formData = reactive({
      username: {
        value: 'john',
        rules: [(v: any) => !!v || 'Field is required'],
      },
    });

    const { validateForm, isFormValid, fieldsValidity } = useFormValidation(formData);
    validateForm();
    expect(isFormValid.value).toBe(true);
    expect(fieldsValidity.username.isValid).toBe(true);
    expect(fieldsValidity.username.errorMessage).toBe('');
  });

  it('validates multiple fields with one invalid', () => {
    const formData = reactive({
      username: {
        value: 'john',
        rules: [(v: any) => !!v || 'Field is required'],
      },
      email: {
        value: '',
        rules: [
          (v: any) => !!v || 'Email is required',
          (v: any) => (v.includes('@') ? true : 'Email must be valid'),
        ],
      },
    });

    const { validateForm, isFormValid, fieldsValidity } = useFormValidation(formData);
    validateForm();
    expect(isFormValid.value).toBe(false);
    expect(fieldsValidity.username.isValid).toBe(true);
    expect(fieldsValidity.email.isValid).toBe(false);
    expect(fieldsValidity.email.errorMessage).toBe('Email is required');
  });

  it('validates multiple fields successfully', () => {
    const formData = reactive({
      username: {
        value: 'john',
        rules: [(v: any) => !!v || 'Field is required'],
      },
      email: {
        value: 'john@example.com',
        rules: [
          (v: any) => !!v || 'Email is required',
          (v: any) => (v.includes('@') ? true : 'Email must be valid'),
        ],
      },
    });

    const { validateForm, isFormValid, fieldsValidity } = useFormValidation(formData);
    validateForm();
    expect(isFormValid.value).toBe(true);
    expect(fieldsValidity.username.isValid).toBe(true);
    expect(fieldsValidity.email.isValid).toBe(true);
  });

  it('validates field with multiple rules and returns the first error encountered', () => {
    const formData = reactive({
      password: {
        value: '123',
        rules: [
          (v: any) => (v.length >= 6 ? true : 'Password must be at least 6 characters'),
          (v: any) => (/[A-Z]/.test(v) ? true : 'Password must include an uppercase letter'),
        ],
      },
    });

    const { validateField, fieldsValidity } = useFormValidation(formData);
    validateField('password');
    expect(fieldsValidity.password.isValid).toBe(false);
    expect(fieldsValidity.password.errorMessage).toBe('Password must be at least 6 characters');
  });

  it('updates validation when field value changes', () => {
    const formData = reactive({
      username: {
        value: '',
        rules: [(v: any) => !!v || 'Field is required'],
      },
    });

    const { validateField, fieldsValidity, isFormValid } = useFormValidation(formData);

    // Initially invalid
    validateField('username');
    expect(isFormValid.value).toBe(false);
    expect(fieldsValidity.username.isValid).toBe(false);

    // Update the value to be valid
    formData.username.value = 'john';
    
    validateField('username');
    expect(isFormValid.value).toBe(true);
    expect(fieldsValidity.username.isValid).toBe(true);
    expect(fieldsValidity.username.errorMessage).toBe('');
  });
});
