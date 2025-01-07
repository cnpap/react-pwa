import React, { useState, useRef } from 'react';
import { AccountFormProps } from './types';
import { $fetch } from '@/openapi/api';
import { showToast } from '../../../Toast/ToastManager';
import { RegisterSchema } from '@/openapi/schema/auth';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Pencil } from 'lucide-react';

function AccountForm({ email, setStep, verificationCode }: AccountFormProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setAvatarUploaded(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    try {
      RegisterSchema.parse({
        email,
        verificationCode: verificationCode.join(''),
        password,
        username: fullName,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleAccountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: '密码和确认密码不匹配' });
      return;
    }
    if (!avatar) {
      setErrors({ ...errors, avatar: '请上传头像' });
      return;
    }
    setIsLoading(true);
    try {
      if (!avatarUploaded) {
        const { data: avatarUploadUrlData } = await $fetch.GET('/edge/s3/avatar-upload-url');
        if (!avatarUploadUrlData?.success) {
          showToast({ type: 'error', message: '获取头像上传URL失败' });
          return;
        }
        const { url } = avatarUploadUrlData.data;
        const response = await fetch(avatar);
        const blob = await response.blob();
        const uploadRequest = new Request(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'image/png' },
          body: blob,
        });
        const uploadResponse = await fetch(uploadRequest);
        if (uploadResponse.status !== 200) {
          showToast({ type: 'error', message: '头像上传失败，请重试' });
          return;
        }
        setAvatarUploaded(true);
      }

      const { data: registerData } = await $fetch.POST('/bues/auth/register', {
        body: {
          email,
          username: fullName,
          password,
          verificationCode: verificationCode.join(''),
        },
      });
      if (!registerData?.success) {
        showToast({ type: 'error', message: '注册失败，请重试' });
        return;
      }
      setStep('success');
    } catch (error) {
      console.error('注册过程中出错:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">创建账户</h1>
        <p className="text-muted-foreground">请填写以下信息完成注册。</p>
      </div>
      <form onSubmit={handleAccountSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatar || undefined} style={{ objectFit: 'cover' }} />
            <AvatarFallback>头像</AvatarFallback>
          </Avatar>
          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Pencil className="mr-2 h-4 w-4" />
              上传头像
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">JPG, GIF 或 PNG. 最大 1MB</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        {errors.avatar && <p className="text-sm text-destructive">{errors.avatar}</p>}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input type="email" id="email" value={email} readOnly className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full-name">全名</Label>
            <Input
              type="text"
              id="full-name"
              placeholder="张三"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">确认密码</Label>
            <Input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <Button type="button" variant="outline" onClick={() => setStep('verification')}>
            上一步
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                处理中...
              </>
            ) : (
              '创建账户'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
