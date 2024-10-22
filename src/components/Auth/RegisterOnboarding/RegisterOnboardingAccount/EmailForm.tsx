import React, { useState } from 'react';
import { EmailFormProps } from './types';
import { $fetch } from '@/openapi/api';
import { LOCAL_STORAGE_STEP_EMAIL } from '@/constant/route';

function EmailForm({ email, setEmail, setStep, isVisible }: EmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await $fetch.POST('/bues/auth/send-email-register-code', {
        body: {
          email,
        },
      });
      if (data?.success) {
        window.localStorage.setItem(LOCAL_STORAGE_STEP_EMAIL, email);
        setStep('verification');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleEmailSubmit}
      className={`absolute top-0 left-0 w-full transition-all duration-300 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leading-tight dark:text-white">
        邮箱验证
      </h1>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          您的邮箱
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 py-2.5 sm:py-3.5 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"
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
            发送中...
          </span>
        ) : (
          '发送验证码'
        )}
      </button>
    </form>
  );
}

export default EmailForm;
