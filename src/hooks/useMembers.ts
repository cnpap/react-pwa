import { $fetch } from '@/openapi/api';
import { useQuery } from '@tanstack/react-query';

export const useMembers = () => {
  const { data } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await $fetch.GET('/bues/project/member-list/:id', {
        params: {
          path: {},
        },
      });
      if (!res.data?.success) {
        throw new Error('x');
      }
      return res.data?.data;
    },
  });

  return data ?? [];
};
