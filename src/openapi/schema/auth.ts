import { z } from 'zod';

export const EmailSchema = z.object({ email: z.string().email() });
export type Email = z.infer<typeof EmailSchema>;

export const VerificationCodeSchema = z.object({
  email: z.string().email(),
  verificationCode: z.string().length(6),
});
export type VerificationCode = z.infer<typeof VerificationCodeSchema>;

export const RegisterSchema = z.object({
  email: z.string().email(),
  verificationCode: z.string().length(6),
  password: z.string().min(8).max(100),
  username: z.string().min(3).max(50),
});

export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8).max(100),
});

export type Register = z.infer<typeof RegisterSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;

export interface VerificationResult {
  success: boolean;
  message: string;
  data: {
    token: string;
    id: string;
  };
}
