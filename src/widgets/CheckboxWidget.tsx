import { ChangeEvent } from 'react';
import { WidgetProps } from '@rjsf/utils';

interface EnumOption {
  const?: string | number;
  title?: string;
  value: string | number;
  label: string;
}

const CheckboxWidget = ({
  id,
  value,
  required,
  disabled,
  readonly,
  label,
  onChange,
  options,
  schema,
}: WidgetProps) => {
  const { inline, enumOptions } = options;

  // 处理多选模式
  if (schema.type === 'array') {
    return (
      <div className={`${inline ? 'flex flex-wrap gap-4' : 'flex flex-col gap-2'}`}>
        {(enumOptions as EnumOption[])?.map((option, index) => {
          // 使用 const 作为值，title 作为显示文本
          const optionValue = option.const ?? option.value;
          const optionLabel = option.title ?? option.label;
          const checked = Array.isArray(value) && value.indexOf(optionValue) !== -1;
          const itemDisabled = disabled || readonly;

          const _onChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
            const newValue = [...(value || [])];
            if (checked) {
              newValue.push(optionValue);
            } else {
              newValue.splice(newValue.indexOf(optionValue), 1);
            }
            onChange(newValue);
          };

          return (
            <div key={index} className={`flex items-center ${inline ? 'mr-4' : ''}`}>
              <input
                id={`${id}_${index}`}
                type="checkbox"
                checked={checked}
                disabled={itemDisabled}
                onChange={_onChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor={`${id}_${index}`}
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                {label ?? optionLabel}
              </label>
            </div>
          );
        })}
      </div>
    );
  }

  // 处理单选模式
  const _onChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    onChange(checked);
  };

  return (
    <div className={`flex items-center ${inline ? 'inline-flex mr-4' : ''}`}>
      <input
        id={id}
        type="checkbox"
        checked={value || false}
        required={required}
        disabled={disabled || readonly}
        onChange={_onChange}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label htmlFor={id} className="ml-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CheckboxWidget;
