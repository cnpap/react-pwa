import * as React from 'react';
import { ChevronsUpDown, GalleryVerticalEnd, Plus, Lock } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { CreateProjectDialog } from '@/components/create-project-dialog';
import { ProjectType } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { $project, setCurrentProject } from '@/store/atom/project-atom';
import { useStore } from '@nanostores/react';

export function ProjectSwitcher({ projects }: { projects: ProjectType[] }) {
  const { isMobile } = useSidebar();
  const queryClient = useQueryClient();
  const currentProject = useStore($project);
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = React.useState(false);

  const handleProjectSwitch = async (project: ProjectType) => {
    setCurrentProject(project);
    await queryClient.invalidateQueries({
      queryKey: ['applicationList'],
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="w-full justify-between data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center space-x-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{currentProject?.name}</span>
                  <span className="truncate text-xs">{currentProject?.plan}</span>
                </div>
              </div>
              <ChevronsUpDown className="ml-2 size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-sm"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              项目列表
            </DropdownMenuLabel>
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => handleProjectSwitch(project)}
                className="flex items-center space-x-3 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <GalleryVerticalEnd className="size-4 shrink-0" />
                </div>
                <span className="flex-1">{project.name}</span>
                {currentProject?.id === project.id && (
                  <Lock className="size-4 text-muted-foreground mr-2" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setCreateProjectDialogOpen(true)}
              className="flex items-center space-x-3 p-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border border-primary-foreground/20">
                <Plus className="size-4 shrink-0" />
              </div>
              <span className="flex-1">创建项目</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <CreateProjectDialog
        open={createProjectDialogOpen}
        onOpenChange={setCreateProjectDialogOpen}
      />
    </SidebarMenu>
  );
}
