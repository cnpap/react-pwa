// src/fields/FieldTemplate.tsx
import { FieldTemplateProps } from '@rjsf/utils';

const FieldTemplate = ({
  id,
  children,
  displayLabel,
  label,
  required,
  rawErrors = [],
  errors,
  help,
  description,
  hidden,
  schema,
}: FieldTemplateProps) => {
  if (hidden) {
    return <div className="hidden">{children}</div>;
  }

  // 如果是数组项内的字段，且父级是对象，则不显示标签
  const isArrayItemField = id.includes('_') && schema.type === 'object';
  const showLabel = displayLabel && !isArrayItemField;

  return (
    <div className={`${rawErrors.length > 0 ? 'has-error' : ''}`}>
      {showLabel && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 ${
            rawErrors.length > 0 ? 'text-red-500' : 'text-gray-900'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {errors && <div className="mt-1 text-sm text-red-500">{errors}</div>}
      {help && <div className="mt-1 text-sm text-gray-500">{help}</div>}
    </div>
  );
};

export default FieldTemplate;
