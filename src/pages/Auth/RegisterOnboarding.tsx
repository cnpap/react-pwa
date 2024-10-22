import React, { useState } from 'react';
import RegisterOnboardingLayout from '@/components/Auth/RegisterOnboarding/RegisterOnboardingLayout';
import { useNavigate } from 'react-router-dom';
import RegisterOnboardingAccount from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/index';
import RegisterOnboardingUl from '@/components/Auth/RegisterOnboarding/RegisterOnboardingUl';
import { ROUTE_DASHBOARD } from '@/constant/route';
import { AuthStep } from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/types';

const RegisterOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<AuthStep>('email');

  return (
    <RegisterOnboardingLayout>
      <RegisterOnboardingUl step={step} />
      <RegisterOnboardingAccount
        step={step}
        setStep={setStep}
        onSuccess={() => navigate(ROUTE_DASHBOARD)}
      />
    </RegisterOnboardingLayout>
  );
};

export default RegisterOnboarding;
