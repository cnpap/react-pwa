import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center px-4 lg:py-0 sm:px-0 w-full min-h-screen">
      <div className="w-full max-w-[400px] space-y-4 md:space-y-6">{children}</div>
    </div>
  );
};

export default AuthLayout;
