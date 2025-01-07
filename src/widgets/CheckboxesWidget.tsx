import { ChangeEvent } from 'react';
import { WidgetProps } from '@rjsf/utils';

const CheckboxesWidget = ({
  id,
  options,
  value,
  disabled,
  readonly,
  onChange,
}: WidgetProps) => {
  const { enumOptions, inline } = options;

  const _onChange = (option: any) => ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    const newValue = [...(value || [])];
    if (checked) {
      newValue.push(option.value);
    } else {
      newValue.splice(newValue.indexOf(option.value), 1);
    }
    onChange(newValue);
  };

  return (
    <div className={`${inline ? 'flex flex-wrap gap-4' : 'flex flex-col gap-2'}`}>
      {enumOptions?.map((option: any, index: number) => {
        const checked = value && value.indexOf(option.value) !== -1;
        const itemDisabled = disabled || readonly;
        
        return (
          <div 
            key={index}
            className={`flex items-center ${inline ? 'mr-4' : ''}`}
          >
            <input
              id={`${id}_${index}`}
              type="checkbox"
              checked={checked}
              disabled={itemDisabled}
              onChange={_onChange(option)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor={`${id}_${index}`}
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxesWidget; 