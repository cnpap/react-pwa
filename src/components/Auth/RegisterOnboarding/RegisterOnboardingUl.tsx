import React, { useState, useEffect, useMemo } from 'react';
import { AuthStep } from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/types';

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
      className={`flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500 ${
        animate ? 'animate-bounce-vertical' : ''
      }`}
    >
      {isCompleted ? (
        <svg
          className="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <div className="mr-2 sm:mb-2 sm:mx-auto">{number}</div>
      )}
      <div className="w-16">{text}</div>
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
        isCompleted || isActive ? 'text-primary-600 dark:text-primary-500' : ''
      } ${
        !isLast
          ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
          : ''
      }`}
    >
      <StepContent number={number} text={text} isCompleted={isCompleted} animate={animate} />
    </li>
  );
}

function RegisterOnboardingUl({ step }: { step: AuthStep }) {
  // const currentStep = useMemo(() => steps.find((s) => s.key === step)?.number ?? 1, [step]);
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
    <ol className="flex w-full items-center mb-6 text-sm font-medium text-center text-gray-500 dark:text-gray-400 lg:mb-8 sm:text-base">
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
