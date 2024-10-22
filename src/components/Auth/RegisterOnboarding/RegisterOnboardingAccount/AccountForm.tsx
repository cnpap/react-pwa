import React, { useState, useRef } from 'react';
import { AccountFormProps } from './types';
import { $fetch } from '@/openapi/api';
import { showToast } from '../../../Toast/ToastManager';
import { RegisterSchema } from '@/openapi/schema/auth';
import { z } from 'zod';

function AccountForm({ email, setStep, isVisible, verificationCode }: AccountFormProps) {
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
        setAvatarUploaded(false); // 重置上传状态
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
    if (!validateForm()) {
      return;
    }
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
        // 将Base64编码的头像转换为Blob对象
        const response = await fetch(avatar);
        const blob = await response.blob();
        const uploadRequest = new Request(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/png',
          },
          body: blob,
        });
        const uploadResponse = await fetch(uploadRequest);
        if (uploadResponse.status !== 200) {
          showToast({ type: 'error', message: '头像上传失败，请重试' });
          return;
        }
        setAvatarUploaded(true);
        console.log('头像上传成功');
      } else {
        console.log('头像已上传，跳过上传步骤');
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
      // 这里可以添加成功注册后的逻辑，比如更新用户信息等
    } catch (error) {
      console.error('注册过程中出错:', error);
      // showToast({ type: 'error', message: '注册过程中出错，请重试' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full transition-all duration-300 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leding-tight dark:text-white">
        创建账户
      </h1>
      <form onSubmit={handleAccountSubmit}>
        {/* 头像上传部分 */}
        <div className="grid gap-5 my-6 sm:grid-cols-2">
          <div className="sm:col-span-2 flex items-center space-x-4">
            <div className="relative">
              <img
                src={
                  avatar ||
                  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                }
                alt="头像"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-1 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">上传头像</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">JPG, GIF PNG. 最大 1MB</p>
            </div>
          </div>
          {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>}

          {/* 邮箱字段 */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              邮箱
            </label>
            <div className="relative group">
              <input
                type="email"
                id="email"
                value={email}
                className="bg-gray-100 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-green-500 dark:text-white cursor-default"
                readOnly
              />
              <svg
                className="w-5 h-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-10 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                邮箱验证已就绪
              </span>
            </div>
          </div>

          {/* 全名字�� */}
          <div>
            <label
              htmlFor="full-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              全名
            </label>
            <input
              type="text"
              name="full-name"
              id="full-name"
              className={`bg-gray-50 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
              placeholder="张三"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          {/* 密码字段 */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              密码
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className={`bg-gray-50 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* 确认密码字段 */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              确认密码
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              className={`bg-gray-50 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* 表单按钮 */}
        <div className="grid gap-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setStep('verification')}
            className="w-full text-center items-center py-2.5 sm:py-3.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            disabled={isLoading}
          >
            上一步
          </button>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                处理中...
              </span>
            ) : (
              '创建账户'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
