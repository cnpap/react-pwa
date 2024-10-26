import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { $fetch } from '@/openapi/api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">找回密码</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">电子邮箱</Label>
            <Input {...register('email')} type="email" id="email" placeholder="name@company.com" />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>重置密码链接已发送到您的邮箱，请查收。</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '发送中...' : '发送重置密码链接'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          记起密码了？{' '}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            返回登录
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
