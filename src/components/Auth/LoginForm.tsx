import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/utils/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTE_AUTH_REGISTER_ACCOUNT } from '@/constant/route';

// 定义表单验证模式
const schema = z.object({
  email: z.string().email('请输入有效的电子邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        // noinspection ExceptionCaughtLocallyJS
        throw error;
      }
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/supabase-callback`,
        },
      });
      if (error) {
        // noinspection ExceptionCaughtLocallyJS
        throw error;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">欢迎登录</h1>
      <div className="items-center space-x-0 space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="w-full inline-flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_13183_10121)">
              <path
                d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                fill="#3F83F8"
              />
              <path
                d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                fill="#34A853"
              />
              <path
                d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                fill="#FBBC04"
              />
              <path
                d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_13183_10121">
                <rect width="20" height="20" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
          登录 Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('github')}
          className="w-full inline-flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg
            className="w-5 h-5 mr-2 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
              clipRule="evenodd"
            />
          </svg>
          登录 GitHub
        </button>
      </div>
      <div className="flex items-center">
        <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
        <div className="px-5 text-center text-gray-500 dark:text-gray-400">或</div>
        <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div>
        <label htmlFor="email" className="input-label">
          电子邮箱
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="input-primary"
          placeholder="请输入您的电子邮箱"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
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
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              {...register('remember')}
              id="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
              记住我
            </label>
          </div>
        </div>
        <Link
          to="/auth/forgot-password"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          忘记密码？
        </Link>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? '登录中...' : '登录您的账户'}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        还没有账户？{' '}
        <Link
          to={ROUTE_AUTH_REGISTER_ACCOUNT}
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          注册
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
