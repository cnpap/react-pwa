import * as React from 'react';
import { BookOpen, Bot, Settings2, SquareTerminal } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { ProjectSwitcher } from '@/components/project-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAccount } from '@/hooks/useAccount';
import { useProjectList } from '@/hooks/useProjectList';

// 这是示例数据。
const data = {
  navMain: [
    {
      title: '游乐场',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: '历史',
          url: '#',
        },
        {
          title: '已收藏',
          url: '#',
        },
        {
          title: '设置',
          url: '#',
        },
      ],
    },
    {
      title: '模型',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '创世纪',
          url: '#',
        },
        {
          title: '探索者',
          url: '#',
        },
        {
          title: '量子',
          url: '#',
        },
      ],
    },
    {
      title: '文档',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: '介绍',
          url: '#',
        },
        {
          title: '开始使用',
          url: '#',
        },
        {
          title: '教程',
          url: '#',
        },
        {
          title: '更新日志',
          url: '#',
        },
      ],
    },
    {
      title: '设置',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: '通用',
          url: '#',
        },
        {
          title: '团队',
          url: '#',
        },
        {
          title: '账单',
          url: '#',
        },
        {
          title: '限制',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const account = useAccount();
  const projectList = useProjectList();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={projectList} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: account.avatar_url as string,
            name: account.username,
            email: account.email,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
