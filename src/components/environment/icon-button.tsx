import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { type ButtonProps } from '@/components/ui/button';

interface IconButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function IconButton({
  className,
  children,
  variant = 'ghost',
  size = 'icon',
  ...props
}: IconButtonProps) {
  return (
    <Button variant={variant} size={size} className={cn('h-8 w-8', className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement<React.HTMLAttributes<HTMLDivElement>>(
            child as React.ReactElement<React.HTMLAttributes<HTMLDivElement>>,
            {
              className: cn('h-4 w-4 ', child.props.className),
            },
          );
        }
        return child;
      })}
    </Button>
  );
}
