import { $fetch } from '@/openapi/api';
import { useQuery } from '@tanstack/react-query';

export const useAccountInfo = () => {
  const { data } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const res = await $fetch.GET('/bues/account/info');
      if (!res.data?.success) {
        throw new Error('x');
      }
      return res.data?.data;
    },
  });

  if (!data) {
    return undefined;
  }
  return data;
};

// 获取 useAccountInfo 的返回类型
type UseAccountInfoReturnType = ReturnType<typeof useAccountInfo>;
// 排除 undefined
export type NonUndefinedUseAccountInfoReturnType = Exclude<UseAccountInfoReturnType, undefined>;
