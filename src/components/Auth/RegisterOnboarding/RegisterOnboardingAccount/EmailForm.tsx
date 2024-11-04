import React, { useState } from 'react';
import { EmailFormProps } from './types';
import { $fetch } from '@/openapi/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { $local } from '@/store/browser/local';

function EmailForm({ email, setEmail, setStep }: EmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await $fetch.POST('/bues/auth/send-email-register-code', {
        body: { email },
      });
      if (data?.success) {
        $local.setItem('stepEmail', email);
        setStep('verification');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleEmailSubmit} className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">邮箱验证</h1>
        <p className="text-muted-foreground">请输入您的邮箱地址，我们将向您发送验证码。</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">您的邮箱</Label>
        <Input
          type="email"
          id="email"
          placeholder="name@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            发送中...
          </>
        ) : (
          '发送验证码'
        )}
      </Button>
    </form>
  );
}

export default EmailForm;
