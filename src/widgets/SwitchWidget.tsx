import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SwitchWidget: React.FC<WidgetProps> = ({
  id,
  label,
  value,
  disabled,
  readonly,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} checked={value} disabled={disabled || readonly} onCheckedChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

export default SwitchWidget;
