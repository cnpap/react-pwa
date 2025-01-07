import { ArrayFieldTitleProps } from '@rjsf/utils';

const ArrayFieldTitleTemplate = <T extends object>({
  title,
  required,
}: ArrayFieldTitleProps<T>) => {
  if (!title) {
    return null;
  }

  return (
    <h3 className="text-lg font-medium text-gray-900">
      {title}
      {required && <span className="text-red-500 ml-1">*</span>}
    </h3>
  );
};

export default ArrayFieldTitleTemplate;
