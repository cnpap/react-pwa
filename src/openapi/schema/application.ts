import { z } from 'zod';

export const ApplicationSchema = z.object({
  id: z.string().uuid().optional(),
  project_id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().nullable(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  version: z.number().int().default(1),
  deleted_flag: z.boolean().default(false),
});

export const ApplicationCreateSchema = ApplicationSchema.pick({
  project_id: true,
  name: true,
  description: true,
});

export type ApplicationCreate = z.infer<typeof ApplicationCreateSchema>;

export const ApplicationUpdateSchema = ApplicationSchema.pick({
  id: true,
  name: true,
  description: true,
});

export type ApplicationUpdate = z.infer<typeof ApplicationUpdateSchema>;
