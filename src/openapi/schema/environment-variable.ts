import { z } from 'zod';

export const EnvironmentVariableSchema = z.object({
  id: z.string().uuid().optional(),
  project_id: z.string().uuid(),
  name: z.string().max(255),
  value: z.string(),
  format: z.enum(['env', 'json', 'yaml']),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  deleted_flag: z.boolean().default(false),
});

export const EnvironmentVariableCreateSchema = EnvironmentVariableSchema.pick({
  project_id: true,
  name: true,
  value: true,
  format: true,
});

export type EnvironmentVariableCreate = z.infer<typeof EnvironmentVariableCreateSchema>;

export const EnvironmentVariableUpdateSchema = EnvironmentVariableSchema.pick({
  id: true,
  name: true,
  value: true,
  format: true,
});

export type EnvironmentVariableUpdate = z.infer<typeof EnvironmentVariableUpdateSchema>;
