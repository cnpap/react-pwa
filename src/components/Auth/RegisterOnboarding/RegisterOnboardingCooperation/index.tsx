import React, { useState } from 'react';
import RegisterOnboardingRoleChoose from './RegisterOnboardingRoleChoose';
import RegisterOnboardingInterestChoose from './RegisterOnboardingInterestChoose';

export interface RegisterOnboardingCooperationProps {
  onNext: (role: string, interests: string[]) => void;
}

function RegisterOnboardingCooperation({ onNext }: RegisterOnboardingCooperationProps) {
  const [step, setStep] = useState<'role' | 'interest'>('role');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleRoleSelect = (role: string) => {
    console.log(selectedInterests);
    setSelectedRole(role);
    setStep('interest');
  };

  const handleInterestSelect = (interests: string[]) => {
    setSelectedInterests(interests);
    onNext(selectedRole!, interests);
  };

  const handleBack = () => {
    setStep('role');
    setSelectedInterests([]);
  };

  return (
    <div className="transition-all pb-8 duration-300 ease-in-out" style={{ minHeight: '500px' }}>
      <h1 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:mb-4 dark:text-white">
        请告诉我们你的角色和兴趣
      </h1>
      <p className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
        这真的对我很重要，完成问卷，将会提供 $5 的通用 gpt tokens。
      </p>
      {step === 'role' && <RegisterOnboardingRoleChoose onSelect={handleRoleSelect} />}
      {step === 'interest' && selectedRole && (
        <RegisterOnboardingInterestChoose
          role={selectedRole}
          onSelect={handleInterestSelect}
          onBack={handleBack}
        />
      )}
      <p className="pt-4 text-sm font-light text-gray-500 dark:text-gray-400">
        已经有账户了？{' '}
        <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
          在这里登录
        </a>
        。
      </p>
    </div>
  );
}

export default RegisterOnboardingCooperation;
