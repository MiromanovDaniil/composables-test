import { ref, type Ref } from 'vue';
import type { FetchOptions } from '../types/fetch';

export function useFetch<T>() {
  const data: Ref<T | null> = ref(null);
  const status: Ref<number | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);
  const isSuccess: Ref<boolean> = ref(false);
  const isError: Ref<boolean> = ref(false);
  const errorMessage: Ref<string> = ref('');

  async function execute(options: FetchOptions) {
    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;
    errorMessage.value = '';
    data.value = null;
    status.value = null;

    try {
      const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      status.value = response.status;

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      try {
        data.value = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid JSON response'); 
      }

      isSuccess.value = true;
    } catch (error) {
      isError.value = true;
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error';
    } finally {
      isLoading.value = false;
    }
  }


  return {
    data,
    status,
    isLoading,
    isSuccess,
    isError,
    errorMessage,
    execute,
  };
}
