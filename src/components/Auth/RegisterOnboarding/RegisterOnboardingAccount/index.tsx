import React, { useState } from 'react';
import EmailForm from './EmailForm';
import VerificationForm from './VerificationForm';
import AccountForm from './AccountForm';
import Countdown from './Countdown'; // 导入 Countdown 组件
import { AuthStep, RegisterOnboardingAccountProps } from './types';
import { useMount } from 'ahooks';
import { $local } from '@/store/browser/local';

function RegisterOnboardingAccount({ onSuccess, step, setStep }: RegisterOnboardingAccountProps) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);

  useMount(() => {
    const step = $local.getItem('step');
    if (step) {
      setStep(step as AuthStep);
    }
    const email = $local.getItem('stepEmail');
    if (email) {
      setEmail(email);
    }
  });

  const handleSetStep = (step: AuthStep) => {
    setStep(step);
    $local.setItem('step', step);
  };

  return (
    <div className="w-full relative" style={{ minHeight: '500px' }}>
      <EmailForm
        step={step}
        email={email}
        setEmail={setEmail}
        setStep={handleSetStep}
        isVisible={step === 'email'}
      />
      <VerificationForm
        step={step}
        email={email}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        setStep={handleSetStep}
        isVisible={step === 'verification'}
      />
      <AccountForm
        step={step}
        email={email}
        verificationCode={verificationCode}
        setStep={handleSetStep}
        isVisible={step === 'account'}
      />
      {step === 'success' && <Countdown duration={555} onComplete={onSuccess} />}
    </div>
  );
}

export default RegisterOnboardingAccount;
