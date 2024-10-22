import { z } from 'zod';

export const PhoneSchema = z.object({ phone: z.string() });
export type Phone = z.infer<typeof PhoneSchema>;
export const VerificationCodeByPhoneSchema = z.object({
  phone: z.string().email(),
  verificationCode: z.string().length(6),
  preference: z.any(),
});
export type VerificationCodeByPhone = z.infer<typeof VerificationCodeByPhoneSchema>;
