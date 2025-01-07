import { NonUndefinedUseAccountInfoReturnType, useAccountInfo } from '@/hooks/useAccountInfo';

export const useProjectList = () => {
  const { projectList } = useAccountInfo() as NonUndefinedUseAccountInfoReturnType;
  return projectList;
};
