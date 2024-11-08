import { WrapIfAdditionalTemplateProps } from '@rjsf/utils';

const WrapIfAdditionalTemplate = <T extends object>({
  children,
  classNames,
  disabled,
  id,
  label,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  schema,
}: WrapIfAdditionalTemplateProps<T>) => {
  const additional = Object.prototype.hasOwnProperty.call(schema, 'additionalProperties');

  if (!additional) {
    return <div className={classNames}>{children}</div>;
  }

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => onKeyChange(target.value);

  return (
    <div className={classNames}>
      <div className="flex items-center gap-2">
        <input
          className="mt-1 block rounded-sm border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          type="text"
          onBlur={handleBlur}
          defaultValue={label}
          disabled={disabled || readonly}
          id={`${id}-key`}
        />
        {children}
        <button
          type="button"
          onClick={onDropPropertyClick(label)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          删除
        </button>
      </div>
    </div>
  );
};

export default WrapIfAdditionalTemplate;
