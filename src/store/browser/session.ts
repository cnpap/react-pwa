import { TypedStorageService } from './store';

export type ProjectType = {
  id: string;
  name: string;
  plan: string;
};

export type ApplicationType = {
  id: string;
  name: string;
};

type $SessionStorage = {
  projectId: string;
  project: ProjectType;
  applicationId: string;
  application: ApplicationType;
};

export const $session = new TypedStorageService<$SessionStorage>(sessionStorage);
