import { z } from 'zod';

export const InterfaceVersionChangeSchema = z.object({
  id: z.string().uuid().optional(),
  application_id: z.string().uuid(),
  user_id: z.string().max(40),
  change_details: z.any(),
  version: z.number().int(),
  changed_at: z.date().default(() => new Date()),
  deleted_flag: z.boolean().default(false),
});

export const InterfaceVersionChangeCreateSchema = InterfaceVersionChangeSchema.pick({
  application_id: true,
  change_details: true,
});

export type InterfaceVersionChangeCreate = z.infer<typeof InterfaceVersionChangeCreateSchema>;
