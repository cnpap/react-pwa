'use client';

import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';

interface SearchHeaderProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rightElement?: ReactNode;
}

export function SearchHeader({
  value,
  onChange,
  placeholder = '搜索...',
  rightElement,
}: SearchHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-background h-[65px] flex-none border-b flex items-center">
      <div className="flex-1 h-full">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-full shadow-none px-4 rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
        />
      </div>
      {rightElement && (
        <div className="px-4 h-full flex items-center border-l border-border/50">
          {rightElement}
        </div>
      )}
    </div>
  );
}
