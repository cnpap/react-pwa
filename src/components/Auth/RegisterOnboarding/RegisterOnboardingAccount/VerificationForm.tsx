import React, { useCallback, useState } from 'react';
import { VerificationFormProps } from './types';
import { $fetch } from '@/openapi/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { $local } from '@/store/browser/local';

function VerificationForm({
  email,
  verificationCode,
  setVerificationCode,
  setStep,
}: VerificationFormProps) {
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);

  const handleVerificationCodeChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) {
        const pastedValue = value.slice(0, 6).split('');
        setVerificationCode((prevCode) => {
          const newCode = [...prevCode];
          pastedValue.forEach((digit, i) => {
            if (index + i < 6) {
              newCode[index + i] = digit;
            }
          });
          $local.setItem('verificationCode', newCode.join(''));
          return newCode;
        });
        const nextEmptyIndex = pastedValue.length + index;
        const nextInputId = nextEmptyIndex < 6 ? `code-${nextEmptyIndex + 1}` : 'code-6';
        document.getElementById(nextInputId)?.focus();
      } else {
        setVerificationCode((prevCode) => {
          const newCode = [...prevCode];
          if (value === '') {
            newCode[index] = '';
            if (index > 0) {
              document.getElementById(`code-${index}`)?.focus();
            }
          } else {
            newCode[index] = value;
            if (index < 5) {
              document.getElementById(`code-${index + 2}`)?.focus();
            }
          }
          $local.setItem('verificationCode', newCode.join(''));
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
        $local.setItem('token', data.data.token);
        $local.setItem('uid', data.data.id);
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
          $local.setItem('verificationCode', newCode.join(''));
          return newCode;
        });
        document.getElementById(`code-${index}`)?.focus();
      }
    },
    [verificationCode, setVerificationCode],
  );

  const handlePreviousStep = useCallback(() => {
    setVerificationCode(['', '', '', '', '', '']);
    $local.removeItem('verificationCode');
    setStep('email');
  }, [setVerificationCode, setStep]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">验证您的邮箱地址</h1>
        <p className="text-muted-foreground">
          我们已经发送了一个6位数验证码到 <span className="font-medium">{email}</span>。
          请在下面输入该验证码。
        </p>
      </div>
      <form onSubmit={handleVerificationSubmit} className="space-y-4">
        <div className="flex justify-between space-x-2">
          {verificationCode.map((digit, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              id={`code-${index + 1}`}
              className="w-12 h-12 text-center text-2xl"
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
          ))}
        </div>
        <p className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          请保持此窗口打开，同时检查您的收件箱。
        </p>
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePreviousStep}
            disabled={isVerificationLoading}
          >
            上一步
          </Button>
          <Button type="submit" disabled={isVerificationLoading}>
            {isVerificationLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                验证中...
              </>
            ) : (
              '下一步'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default VerificationForm;
