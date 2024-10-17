import { z } from 'zod';

export const AccountSchema = z.object({
  user_id: z.string().max(40),
  username: z.string().max(255),
  email: z.string().max(255),
  avatar_url: z.string().max(255).nullable(),
  status: z.enum(['active', 'inactive', 'suspended']).default('active'),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  deleted_flag: z.boolean().default(false),
});

export const AccountUpdateSchema = AccountSchema.pick({
  username: true,
  avatar_url: true,
});

export type AccountUpdate = z.infer<typeof AccountUpdateSchema>;
