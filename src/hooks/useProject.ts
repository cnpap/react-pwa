import { $fetch } from '@/openapi/api';
import { useQuery } from '@tanstack/react-query';

export const useProjectList = () => {
  const { data } = useQuery({
    queryKey: ['project'],
    queryFn: async () => {
      const res = await $fetch.GET('/bues/project/{id}', {
        params: {
          path: {
            id: '12',
          },
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
