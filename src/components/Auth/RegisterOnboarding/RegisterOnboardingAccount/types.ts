import React from 'react';

export type SetStep = (step: AuthStep) => void;

export type StepState = {
  step: AuthStep;
  setStep: SetStep;
};

export type RegisterOnboardingAccountProps = {
  onSuccess: () => void;
} & StepState;

export type EmailFormProps = {
  email: string;
  setEmail: (email: string) => void;
  setStep: SetStep;
};

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
  setStep: SetStep;
};
