import { $fetch } from '@/openapi/api';
import { useQuery } from '@tanstack/react-query';
import { $project, setCurrentProject } from '@/store/atom/project-atom';

export const useAccountInfo = () => {
  const { data, refetch } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const res = await $fetch.GET('/bues/account/info');
      if (!res.data?.success) {
        throw new Error('获取账户信息失败');
      }

      const projectList = res.data.data.projectList;
      const currentProject = $project.get();

      // 如果没有选中的项目或当前项目不在列表中，则选择第一个项目
      if (!currentProject || !projectList.find((p) => p.id === currentProject.id)) {
        setCurrentProject(projectList[0]!);
      }

      return res.data.data;
    },
  });

  if (!data) {
    return undefined;
  }

  return {
    account: data.account,
    projectList: data.projectList,
    refetch,
  };
};

// 获取 useAccountInfo 的返回类型
type UseAccountInfoReturnType = ReturnType<typeof useAccountInfo>;
// 排除 undefined
export type NonUndefinedUseAccountInfoReturnType = Exclude<UseAccountInfoReturnType, undefined>;
