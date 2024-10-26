import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterOnboardingLayout from '@/components/Auth/RegisterOnboarding/RegisterOnboardingLayout';
import RegisterOnboardingUl from '@/components/Auth/RegisterOnboarding/RegisterOnboardingUl';
import EmailForm from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/EmailForm';
import VerificationForm from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/VerificationForm';
import AccountForm from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/AccountForm';
import Countdown from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/Countdown';
import { AuthStep } from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/types';
import { LOCAL_STORAGE_STEP, LOCAL_STORAGE_STEP_EMAIL } from '@/constant/route';

const RegisterOnboarding: React.FC = () => {
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStep = localStorage.getItem(LOCAL_STORAGE_STEP) as AuthStep | null;
    const storedEmail = localStorage.getItem(LOCAL_STORAGE_STEP_EMAIL);

    if (storedStep) {
      setStep(storedStep);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_STEP, step);
  }, [step]);

  const handleComplete = () => {
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 'email':
        return <EmailForm email={email} setEmail={setEmail} setStep={setStep} />;
      case 'verification':
        return (
          <VerificationForm
            email={email}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            setStep={setStep}
          />
        );
      case 'account':
        return <AccountForm email={email} setStep={setStep} verificationCode={verificationCode} />;
      case 'success':
        return <Countdown duration={5} onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <RegisterOnboardingLayout>
      <RegisterOnboardingUl step={step} />
      {renderStep()}
    </RegisterOnboardingLayout>
  );
};

export default RegisterOnboarding;
