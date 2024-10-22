import React, { useCallback, useState } from 'react';
import { VerificationFormProps } from './types';
import { $fetch } from '@/openapi/api';
import { LOCAL_STORAGE_VERIFICATION_CODE } from '@/constant/route';

function VerificationForm({
  email,
  verificationCode,
  setVerificationCode,
  setStep,
  isVisible,
}: VerificationFormProps) {
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);

  const handleVerificationCodeChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) {
        // 处理粘贴多位数字的情况
        const pastedValue = value.slice(0, 6).split('');
        setVerificationCode((prevCode) => {
          const newCode = [...prevCode];
          pastedValue.forEach((digit, i) => {
            if (index + i < 6) {
              newCode[index + i] = digit;
            }
          });
          window.localStorage.setItem(LOCAL_STORAGE_VERIFICATION_CODE, newCode.join(''));
          return newCode;
        });
        // 聚焦到最后一个输入框或下一个空输入框
        const nextEmptyIndex = pastedValue.length + index;
        const nextInputId = nextEmptyIndex < 6 ? `code-${nextEmptyIndex + 1}` : 'code-6';
        document.getElementById(nextInputId)?.focus();
      } else {
        setVerificationCode((prevCode) => {
          const newCode = [...prevCode];
          if (value === '') {
            // 如果当前输入框被清空
            newCode[index] = '';
            if (index > 0) {
              // 如果不是第一个输入框，聚焦到前一个输入框
              document.getElementById(`code-${index}`)?.focus();
            }
          } else {
            // 输入新的数字
            newCode[index] = value;
            if (index < 5) {
              // 如果不是最后一个输入框，聚焦到下一个输入框
              document.getElementById(`code-${index + 2}`)?.focus();
            }
          }
          window.localStorage.setItem(LOCAL_STORAGE_VERIFICATION_CODE, newCode.join(''));
          return newCode;
        });
      }
    },
    [setVerificationCode],
  );

  const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVerificationLoading(true);
    try {
      const { data } = await $fetch.POST('/bues/auth/verify-email-register-code', {
        body: {
          email,
          verificationCode: verificationCode.join(''),
        },
      });
      if (data?.success) {
        window.localStorage.setItem('token', data.data.token);
        window.localStorage.setItem('id', data.data.id);
        setStep('account');
      }
    } finally {
      setIsVerificationLoading(false);
    }
  };

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
        setVerificationCode((prevCode) => {
          const newCode = [...prevCode];
          newCode[index - 1] = '';
          window.localStorage.setItem(LOCAL_STORAGE_VERIFICATION_CODE, newCode.join(''));
          return newCode;
        });
        document.getElementById(`code-${index}`)?.focus();
      }
    },
    [verificationCode, setVerificationCode],
  );

  const handlePreviousStep = useCallback(() => {
    // 清空验证码
    setVerificationCode(['', '', '', '', '', '']);
    // 清除本地存储的验证码
    window.localStorage.removeItem(LOCAL_STORAGE_VERIFICATION_CODE);
    // 返回到上一步
    setStep('email');
  }, [setVerificationCode, setStep]);

  return (
    <div
      className={`absolute top-0 left-0 w-full transition-all duration-300 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 leding-tight dark:text-white">
        验证您的邮箱地址
      </h1>
      <p className="font-light text-gray-500 dark:text-gray-400">
        我们已经发送了一个6位数验证码到{' '}
        <span className="font-medium text-gray-900 dark:text-white">{email}</span>。
        请在下面输入该验证码。
      </p>
      <form onSubmit={handleVerificationSubmit}>
        <div className="flex my-4 space-x-2 sm:space-x-4 md:my-6">
          {verificationCode.map((digit, index) => (
            <div key={index}>
              <label htmlFor={`code-${index + 1}`} className="sr-only">
                {`Code ${index + 1}`}
              </label>
              <input
                type="text"
                maxLength={1}
                id={`code-${index + 1}`}
                className="block w-12 h-12 py-3 text-2xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg sm:py-4 sm:text-4xl sm:w-16 sm:h-16 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                value={digit}
                onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedData = e.clipboardData.getData('text');
                  handleVerificationCodeChange(index, pastedData);
                }}
                disabled={isVerificationLoading}
              />
            </div>
          ))}
        </div>
        <p className="p-4 mb-4 text-sm text-gray-500 rounded-lg bg-gray-50 dark:text-gray-400 md:mb-6 dark:bg-gray-800">
          请保持此窗口打开，同时检查您的收件箱。
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={handlePreviousStep}
            className="w-full text-center items-center py-2.5 sm:py-3.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 disabled:opacity-50"
            disabled={isVerificationLoading}
          >
            上一步
          </button>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"
            disabled={isVerificationLoading}
          >
            {isVerificationLoading ? (
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
                验证中...
              </span>
            ) : (
              '下一步'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerificationForm;
