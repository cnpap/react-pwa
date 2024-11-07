import React, { useState } from 'react';
import { supabase } from '@/utils/supabase';
import SpinWind from '@/components/Spin/SpinWind';
import TypescriptSvg from '@/components/Svg/typescript-icon-svgrepo-com.svg';

import { Button } from '@/components/ui/button';

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/supabase-callback`,
        },
      });
      if (error) {
        throw error;
      }
    } finally {
      // 延迟 5 秒后关闭 loading
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
  };

  return (
    <div className="w-full max-w-[300px] mx-auto relative">
      {loading && <SpinWind fullscreen={true} />}
      <div className="mb-6">
        <h2 className="text-2xl text-[#ff3f1a] font-bold">Login in</h2>
        <p className="text-sm text-[#9f9aa0]">
          {/* 在任何位置任何时间完成你的配置 */}
          Anywhere, Anytime Complete your configuration
        </p>
        <div className="flex items-center mt-4 gap-2">
          <img src={TypescriptSvg} alt="typescript" className="w-6 h-6 rounded-[1px]" />
          <p className="text-sm text-[#9f9aa0]">
            {/* typescript 优先支持 */}
            Typescript Priority Support
          </p>
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        <Button
          className="bg-[#ebeaeb] rounded-md border-none"
          variant="outline"
          type="button"
          onClick={() => handleSocialLogin('google')}
        >
          Google
        </Button>
        <Button
          className="bg-[#ebeaeb] rounded-md border-none"
          variant="outline"
          type="button"
          onClick={() => handleSocialLogin('github')}
        >
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
