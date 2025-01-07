import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const RadioWidget: React.FC<WidgetProps> = ({
  id,
  options,
  value,
  disabled,
  readonly,
  onChange,
}) => {
  const { enumOptions } = options;

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      disabled={disabled || readonly}
      className="flex flex-col space-y-2"
    >
      {enumOptions?.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={`${id}-${option.value}`} />
          <Label htmlFor={`${id}-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioWidget;
