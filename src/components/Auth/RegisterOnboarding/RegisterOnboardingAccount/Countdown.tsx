import React, { useState, useEffect } from 'react';
import { useMount } from 'ahooks';
import {
  LOCAL_STORAGE_STEP,
  LOCAL_STORAGE_STEP_EMAIL,
  LOCAL_STORAGE_VERIFICATION_CODE,
} from '@/constant/route';
import { Loader2 } from 'lucide-react';

type CountdownProps = {
  duration: number; // 倒计时时间（秒）
  onComplete: () => void; // 倒计时结束时的回调函数
};

const Countdown: React.FC<CountdownProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useMount(() => {
    window.localStorage.removeItem(LOCAL_STORAGE_STEP);
    window.localStorage.removeItem(LOCAL_STORAGE_STEP_EMAIL);
    window.localStorage.removeItem(LOCAL_STORAGE_VERIFICATION_CODE);
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <h1 className="text-2xl font-bold">注册成功！</h1>
      <p className="text-muted-foreground">您将在 {timeLeft} 秒后自动跳转。</p>
    </div>
  );
};

export default Countdown;
