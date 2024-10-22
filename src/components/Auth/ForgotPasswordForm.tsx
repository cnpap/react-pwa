import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { $fetch } from '@/openapi/api';

const schema = z.object({
  email: z.string().email('请输入有效的电子邮箱地址'),
});

type FormData = z.infer<typeof schema>;

const ForgotPasswordForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await $fetch.POST('/bues/auth/send-reset-password-email', {
        body: {
          email: data.email,
        },
      });
      if (res.data?.success) {
        setSuccess(true);
        setError(null);
      } else {
        setSuccess(false);
        setError('发送重置密码链接失败');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('发生未知错误');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">找回密码</h1>
      <div>
        <label htmlFor="email" className="input-label">
          电子邮箱
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="input-primary"
          placeholder="name@company.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">重置密码链接已发送到您的邮箱，请查收。</p>}
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? '发送中...' : '发送重置密码链接'}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        记起密码了？{' '}
        <Link
          to="/auth/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          返回登录
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
