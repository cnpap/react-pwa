import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { $api } from '@/openapi/api';
import { ROUTE_AUTH_LOGIN } from '@/constant/route';
import { showToast } from '../Toast/ToastManager';

const schema = z
  .object({
    password: z.string().min(6, '密码至少需要6个字符'),
    confirmPassword: z.string().min(6, '密码至少需要6个字符'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

const SetPasswordForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token') as string;

  const { mutateAsync, isPending } = $api.useMutation('post', '/bues/auth/reset-password');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await mutateAsync({
        body: { token, password: data.password },
      });
      if (!res.success) {
        setError('设置密码失败，请稍后重试。');
      } else {
        showToast({
          type: 'success',
          message: '设置密码成功，请重新登录。',
        });
        navigate(ROUTE_AUTH_LOGIN);
      }
    } catch (error) {
      setError('设置密码失败，请稍后重试。');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">设置密码</h1>
      <div>
        <label htmlFor="password" className="input-label">
          密码
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          placeholder="••••••••"
          className="input-primary"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="input-label">
          确认密码
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          className="input-primary"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? '设置中...' : '设置密码并完成注册'}
      </button>
    </form>
  );
};

export default SetPasswordForm;
