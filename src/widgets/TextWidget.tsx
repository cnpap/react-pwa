// src/widgets/TextWidget.tsx
import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import { Input, InputProps } from '@/components/ui/input'; // 根据实际路径调整

const TextWidget: React.FC<WidgetProps & InputProps> = ({
  id,
  placeholder,
  value,
  required,
  disabled,
  readonly,
  autofocus,
  onBlur,
  onFocus,
  onChange,
}) => (
  <Input
    readOnly={readonly}
    id={id}
    placeholder={placeholder}
    value={value || ''}
    required={required}
    disabled={disabled || readonly}
    autoFocus={autofocus}
    onBlur={onBlur ? (event) => onBlur(id, event.target.value) : undefined}
    onFocus={onFocus ? (event) => onFocus(id, event.target.value) : undefined}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default TextWidget;
