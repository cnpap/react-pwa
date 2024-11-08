import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SelectWidget: React.FC<WidgetProps> = ({
  options,
  value,
  disabled,
  readonly,
  placeholder,
  onChange,
}) => {
  const { enumOptions } = options;

  return (
    <Select value={value || undefined} onValueChange={onChange} disabled={disabled || readonly}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder || '请选择'} />
      </SelectTrigger>
      <SelectContent>
        {enumOptions?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectWidget;
