import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import { $fetch } from '@/openapi/api';
import SpinWind from '@/components/Spin/SpinWind';
import { useMount } from 'ahooks';
import { $local } from '@/store/browser/local';
import { showToast } from '@/components/Toast/ToastManager';

const SupabaseCallback: React.FC = () => {
  const navigate = useNavigate();

  useMount(() => {
    const handleAuthCallback = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        $local.setItem('token', data.session.access_token);
        // 使用 axios 调用后端 API 来初始化用户数据
        $fetch.POST('/bues/account/init-by-supabase').then((res) => {
          if (res.data?.success) {
            $local.setItem('token', res.data.data.token);
            navigate('/dashboard');
          } else {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error('初始化用户数据失败');
          }
        });
      } else {
        showToast({ message: '登录失败', type: 'error' });
      }
    };
    handleAuthCallback();

    // noinspection JSIgnoredPromiseFromCall
  });

  return (
    <div className="w-screen h-screen bg-bg">
      <SpinWind fullscreen={true} />;
    </div>
  );
};

export default SupabaseCallback;
