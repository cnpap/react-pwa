import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children = '提交', className, ...props }) => {
  return (
    <Button type="submit" className={cn('w-full sm:w-auto', className)} {...props}>
      {children}
    </Button>
  );
};

export default SubmitButton;
