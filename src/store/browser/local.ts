import { AuthStep } from '@/components/Auth/RegisterOnboarding/RegisterOnboardingAccount/types';
import { TypedStorageService } from './store';
import { Themes } from '@/theme/types';

type $LocalStorage = {
  uid: string;
  token: string;
  step: AuthStep;
  stepEmail: string;
  'theme-mode': Themes;
  verificationCode: string;
};

export const $local = new TypedStorageService<$LocalStorage>(localStorage);
