import React from 'react';

export type StepState = {
  step: AuthStep;
  setStep: (step: AuthStep) => void;
};

export type RegisterOnboardingAccountProps = {
  onSuccess: () => void;
} & StepState;

export type EmailFormProps = {
  email: string;
  setEmail: (email: string) => void;
  isVisible: boolean;
} & StepState;

export type AuthStep = 'email' | 'verification' | 'account' | 'success';

export interface VerificationFormProps {
  email: string;
  verificationCode: string[];
  setVerificationCode: React.Dispatch<React.SetStateAction<string[]>>;
  setStep: (step: AuthStep) => void;
}

export type AccountFormProps = {
  email: string;
  verificationCode: string[];
  isVisible: boolean;
} & StepState;
