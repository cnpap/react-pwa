import React from 'react';
import AuthLayout from '@/components/Auth/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';
import WelcomeContent from '@/components/Welcome/WelcomeContent';

const Welcome: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex flex-col lg:flex-row">
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
      <div className="hidden lg:flex lg:w-1/2">
        <WelcomeContent />
      </div>
    </section>
  );
};

export default Welcome;
