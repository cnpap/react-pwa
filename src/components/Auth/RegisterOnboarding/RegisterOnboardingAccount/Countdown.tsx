import React, { useState, useEffect } from 'react';
import { useMount } from 'ahooks';
import {
  LOCAL_STORAGE_STEP,
  LOCAL_STORAGE_STEP_EMAIL,
  LOCAL_STORAGE_VERIFICATION_CODE,
} from '@/constant/route';

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
    <div className="flex absolute top-0 left-0 w-full h-full flex-col justify-center items-center">
      <div className="flex items-center justify-center mb-4">
        <svg
          className="animate-spin h-10 w-10 text-primary-600"
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
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">注册成功！</h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">您将在 {timeLeft} 秒后自动跳转。</p>
    </div>
  );
};

export default Countdown;
