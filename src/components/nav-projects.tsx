import { Plus, type LucideIcon } from 'lucide-react';
import React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CreateProjectDialog } from './create-project-dialog';

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = React.useState(false);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>项目列表</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            onClick={() => setCreateProjectDialogOpen(true)}
          >
            <Plus className="text-current" />
            <span>create project</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <CreateProjectDialog
        open={createProjectDialogOpen}
        onOpenChange={setCreateProjectDialogOpen}
      />
    </SidebarGroup>
  );
}
