import { FieldTemplateProps } from '@rjsf/utils';

const FieldTemplate = ({
  id,
  children,
  displayLabel,
  label,
  required,
  errors,
  help,
  description,
  hidden,
  classNames: classes,
}: FieldTemplateProps) => {
  if (hidden) {
    return <div className="hidden">{children}</div>;
  }

  return (
    <div className={classes}>
      {displayLabel && label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {children}
      {errors}
      {help}
    </div>
  );
};

export default FieldTemplate;
