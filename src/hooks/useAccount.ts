import { NonUndefinedUseAccountInfoReturnType, useAccountInfo } from '@/hooks/useAccountInfo';

export const useAccount = () => {
  const { account } = useAccountInfo() as unknown as NonUndefinedUseAccountInfoReturnType;
  return account;
};
