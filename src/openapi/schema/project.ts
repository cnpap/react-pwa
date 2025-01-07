import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().nullable(),
  max_applications: z.number().int().default(10),
  max_collaborators: z.number().int().default(50),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  deleted_flag: z.boolean().default(false),
});

export const ProjectCreateSchema = ProjectSchema.pick({
  name: true,
  description: true,
});

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;

export const ProjectUpdateSchema = ProjectSchema.pick({
  id: true,
  name: true,
  description: true,
});

export type ProjectUpdate = z.infer<typeof ProjectUpdateSchema>;

export const ProjectMemberInviteSchema = z.object({
  project_id: z.string().uuid(),
  email: z.string().email(),
});

export type ProjectMemberInvite = z.infer<typeof ProjectMemberInviteSchema>;
