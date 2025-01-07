import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { $api } from '@/openapi/api';
import { ROUTE_AUTH_LOGIN } from '@/constant/route';
import { showToast } from '../Toast/ToastManager';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">设置密码</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input {...register('password')} type="password" id="password" placeholder="••••••••" />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">确认密码</Label>
            <Input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '设置中...' : '设置密码并完成注册'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          已经有账户？{' '}
          <Link to={ROUTE_AUTH_LOGIN} className="font-medium text-primary hover:underline">
            返回登录
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SetPasswordForm;
