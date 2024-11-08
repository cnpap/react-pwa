import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import { Textarea } from '@/components/ui/textarea';

const TextareaWidget: React.FC<WidgetProps> = ({
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
  <Textarea
    id={id}
    placeholder={placeholder}
    value={value || ''}
    required={required}
    disabled={disabled || readonly}
    autoFocus={autofocus}
    className="min-h-[100px]"
    onBlur={onBlur ? (event) => onBlur(id, event.target.value) : undefined}
    onFocus={onFocus ? (event) => onFocus(id, event.target.value) : undefined}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default TextareaWidget;
