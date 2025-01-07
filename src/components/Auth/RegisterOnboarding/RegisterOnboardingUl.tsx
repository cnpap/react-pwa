import React, { useState, useEffect, useMemo } from 'react';
import { AuthStep } from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/types';
import { CheckCircle } from 'lucide-react';

interface StepContentProps {
  number: number;
  text: string;
  isCompleted: boolean;
  animate: boolean;
}

export type Step = {
  number: number;
  text: string;
  keys: AuthStep[];
};

export const steps: Step[] = [
  { number: 1, text: '确认邮箱', keys: ['email', 'verification'] },
  { number: 2, text: '完善信息', keys: ['account'] },
  { number: 3, text: '完成注册', keys: ['success'] },
];

function StepContent({ number, text, isCompleted, animate }: StepContentProps) {
  return (
    <div
      className={`flex items-center sm:flex-col sm:items-center ${animate ? 'animate-bounce' : ''}`}
    >
      {isCompleted ? (
        <CheckCircle className="w-6 h-6 mb-2 text-primary" />
      ) : (
        <div className="w-6 h-6 mb-2 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          {number}
        </div>
      )}
      <div className="ml-2 sm:ml-0 w-16 text-sm">{text}</div>
    </div>
  );
}

interface LiProps {
  number: number;
  text: string;
  isCompleted: boolean;
  isActive: boolean;
  isLast?: boolean;
  animate: boolean;
}

function Li({ number, text, isCompleted, isActive, isLast = false, animate }: LiProps) {
  return (
    <li
      className={`flex items-center ${isLast ? '' : 'flex-1'} ${
        isCompleted || isActive ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <StepContent number={number} text={text} isCompleted={isCompleted} animate={animate} />
      {!isLast && <div className="hidden sm:block w-full h-[1px] bg-border mx-2" />}
    </li>
  );
}

function RegisterOnboardingUl({ step }: { step: AuthStep }) {
  const currentStep = useMemo(() => steps.find((s) => s.keys.includes(step))?.number ?? 1, [step]);
  const [animateStep, setAnimateStep] = useState(-1);
  const [prevStep, setPrevStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep !== prevStep) {
      setAnimateStep(currentStep);
      const timer = setTimeout(() => setAnimateStep(-1), 500); // 动画持续时间后重置
      setPrevStep(currentStep);
      return () => clearTimeout(timer);
    }
  }, [currentStep, prevStep]);

  return (
    <ol className="flex w-full items-center mb-6 text-sm font-medium text-center sm:text-base">
      {steps.map((step, index) => (
        <Li
          key={step.number}
          number={step.number}
          text={step.text}
          isCompleted={currentStep > step.number}
          isActive={currentStep === step.number}
          isLast={index === steps.length - 1}
          animate={animateStep === step.number}
        />
      ))}
    </ol>
  );
}

export default RegisterOnboardingUl;
