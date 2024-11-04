import { atom } from 'nanostores';
import type { ProjectType } from '@/types';
import { $session } from '@/store/browser/session';

export const $project = atom<ProjectType | null>($session.getItem('project'));
export const $projectId = atom<string | null>($project.get()?.id ?? null);

// 设置当前项目并持久化
export function setCurrentProject(project: ProjectType | null) {
  if (project) {
    $session.setItem('projectId', project.id);
    $session.setItem('project', project);
  } else {
    $session.removeItem('projectId');
    $session.removeItem('project');
  }
  $project.set(project);
  $projectId.set(project?.id ?? null);
}
