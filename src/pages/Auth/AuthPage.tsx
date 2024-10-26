import React from 'react';
import { useLocation } from 'react-router-dom';
import AuthLayout from '@/components/Auth/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';
import SetPasswordForm from '@/components/Auth/SetPasswordForm';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';
import MessagePage from '@/components/Auth/MessagePage';
import WelcomeContent from '@/components/Welcome/WelcomeContent';
import RegisterOnboarding from '@/pages/Auth/RegisterOnboarding';
import {
  ROUTE_AUTH_FORGOT_PASSWORD,
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_SET_PASSWORD,
} from '@/constant/route';

const AuthPage: React.FC = () => {
  const location = useLocation();

  const renderForm = () => {
    if (location.pathname.startsWith('/auth/register')) {
      return <RegisterOnboarding />;
    }
    switch (location.pathname) {
      case ROUTE_AUTH_LOGIN:
        return <LoginForm />;
      case ROUTE_AUTH_SET_PASSWORD:
        return <SetPasswordForm />;
      case ROUTE_AUTH_FORGOT_PASSWORD:
        return <ForgotPasswordForm />;
      case '/auth/register-success':
        return (
          <MessagePage
            title="注册邮件已发送"
            message="我们已经向您的邮箱发送了一封包含注册链接的邮件。请查看您的邮箱并点击链接完成注册。"
            linkText="返回登录页面"
            linkTo="/auth/login"
          />
        );
      default:
        return <LoginForm />;
    }
  };

  return (
    <div
      className="
    w-full absolute inset-0 z-0 h-full bg-white dark:bg-[#090909]
    bg-[linear-gradient(to_right,#f9f9f9_1px,transparent_1px),linear-gradient(to_bottom,#f9f9f9_1px,transparent_1px)] bg-[size:10rem_10rem]
    dark:bg-[linear-gradient(to_right,#090909_1px,transparent_1px),linear-gradient(to_bottom,#090909_1px,transparent_1px)]
    [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)
    "
    >
      <div className="dark:bg-gray-900 min-h-screen flex">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <AuthLayout>{renderForm()}</AuthLayout>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/2">
          <WelcomeContent />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
