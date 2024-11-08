import { BaseInputTemplateProps } from '@rjsf/utils';

const BaseInputTemplate = ({
  id,
  placeholder,
  required,
  readonly,
  disabled,
  type,
  value,
  onChange,
  onBlur,
  onFocus,
  autofocus,
  options,
}: BaseInputTemplateProps) => {
  const inputValue = value || value === 0 ? value : '';

  const handleChange = ({ target: { value: val } }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(val === '' ? options.emptyValue : val);
  };

  return (
    <input
      id={id}
      className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
      type={type}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      value={inputValue}
      onChange={handleChange}
      onBlur={onBlur && ((event) => onBlur(id, event.target.value))}
      onFocus={onFocus && ((event) => onFocus(id, event.target.value))}
      autoFocus={autofocus}
    />
  );
};

export default BaseInputTemplate;
