import { useFetch } from './useFetch';
import type { FetchOptions } from '../types/fetch';
import { describe, expect, it, vi } from 'vitest';

describe('useFetch', () => {
  it('fetches data successfully', async () => {
    const { data, status, isLoading, isSuccess, isError, errorMessage, execute } = useFetch();

    const options: FetchOptions = {
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'GET',
    };

    await execute(options);

    expect(isLoading.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(isError.value).toBe(false);
    expect(status.value).toBe(200);
    expect(data.value).toHaveProperty('id', 1);
    expect(errorMessage.value).toBe('');
  });

  it('handles 404 error', async () => {
    const { data, status, isLoading, isSuccess, isError, errorMessage, execute } = useFetch();

    const options: FetchOptions = {
      url: 'https://jsonplaceholder.typicode.com/posts/invalid',
      method: 'GET',
    };

    await execute(options);

    expect(isLoading.value).toBe(false);
    expect(isSuccess.value).toBe(false);
    expect(isError.value).toBe(true);
    expect(status.value).toBe(404);
    expect(data.value).toBeNull();
    expect(errorMessage.value).toContain('HTTP error! status: 404');
  });

  it('posts data successfully', async () => {
    const { data, status, isLoading, isSuccess, isError, errorMessage, execute } = useFetch();

    const options: FetchOptions = {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    };

    await execute(options);

    expect(isLoading.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(isError.value).toBe(false);
    expect(status.value).toBe(201);
    expect(data.value).toHaveProperty('id');
    expect(data.value).toMatchObject({
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
    expect(errorMessage.value).toBe('');
  });

  it('handles non-JSON response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('<html>Not JSON</html>', {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      })
    );

    const { data, isLoading, isSuccess, isError, errorMessage, execute } = useFetch();

    await execute({ url: 'https://example.com/html', method: 'GET' });

    expect(isLoading.value).toBe(false);
    expect(isSuccess.value).toBe(false);
    expect(isError.value).toBe(true);
    expect(data.value).toBeNull();
    expect(errorMessage.value).toContain('Invalid JSON response'); 

    vi.restoreAllMocks();
  });

  it('sets isLoading to true while fetch is pending', async () => {
    const { isLoading, execute } = useFetch();

    const originalFetch = globalThis.fetch;
    globalThis.fetch = () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(new Response(JSON.stringify({ id: 1 }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }));
        }, 100);
      }) as Promise<Response>;

    const executePromise = execute({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'GET',
    });

    expect(isLoading.value).toBe(true);

    await executePromise;
    expect(isLoading.value).toBe(false);

    globalThis.fetch = originalFetch;
  });
});
