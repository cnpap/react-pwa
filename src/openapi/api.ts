import createClient from 'openapi-react-query';
import { paths } from '@/openapi/schema';
import createFetchClient from 'openapi-fetch';
import { showToast } from '@/components/Toast/ToastManager';
import { $local } from '@/store/browser/local';
import { ROUTE_AUTH_LOGIN } from '@/constant/route';

export const $fetch = createFetchClient<paths>({
  baseUrl: '/api',
  fetch: async (r) => {
    const token = $local.getItem('token');
    if (token) {
      r.headers.set('Authorization', `Bearer ${token}`);
    }
    const result = await fetch(r);
    if (result.status > 200) {
      if ([401, 403].includes(result.status)) {
        setTimeout(() => {
          window.location.href = ROUTE_AUTH_LOGIN;
        }, 1000);
      }
      if (result.headers.get('Content-Type')?.includes('application/json')) {
        const data = (await result.json()) as { message?: string };
        if (data.message) {
          showToast({ message: data.message, type: 'error' });
        }
      }
    }
    return result;
  },
});

export const $api = createClient($fetch);
