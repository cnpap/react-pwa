import createClient from 'openapi-react-query';
import { paths } from '@/openapi/schema';
import createFetchClient from 'openapi-fetch';
import { supabase } from '@/utils/supabase';

export const $fetch = createFetchClient<paths>({
  baseUrl: '/api',
  fetch: async (r) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) {
      r.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetch(r);
  },
});

export const $api = createClient($fetch);
