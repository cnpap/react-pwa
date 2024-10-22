import createClient from 'openapi-react-query';
import { paths } from '@/openapi/schema';
import createFetchClient from 'openapi-fetch';
import { showToast } from '@/components/Toast/ToastManager';

export const $fetch = createFetchClient<paths>({
  baseUrl: '/api',
  fetch: async (r) => {
    const token = localStorage.getItem('token') as string;
    if (token) {
      r.headers.set('Authorization', `Bearer ${token}`);
    }
    const result = await fetch(r);
    if (result.status > 200) {
      if (result.headers.get('Content-Type')?.includes('application/json')) {
        const data = (await result.json()) as { error?: string };
        if (data.error) {
          showToast({ message: data.error, type: 'error' });
        }
      }
    }
    return result;
  },
});

export const $api = createClient($fetch);
