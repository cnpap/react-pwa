import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import { $fetch } from '@/openapi/api';
import SpinWind from '@/components/Spin/SpinWind';
import { useMount } from 'ahooks';
import { $local } from '@/store/browser/local';

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
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    handleAuthCallback();
  });

  return <SpinWind />;
};

export default SupabaseCallback;
