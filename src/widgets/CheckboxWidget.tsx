import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CheckboxWidget: React.FC<WidgetProps> = ({
  id,
  label,
  value,
  disabled,
  readonly,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={value}
        disabled={disabled || readonly}
        onCheckedChange={onChange}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

export default CheckboxWidget;
