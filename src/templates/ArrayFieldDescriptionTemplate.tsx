import { ArrayFieldDescriptionProps } from '@rjsf/utils';

const ArrayFieldDescriptionTemplate = <T extends object>({
  description,
}: ArrayFieldDescriptionProps<T>) => {
  if (!description) {
    return null;
  }

  return <p className="mt-1 text-sm text-gray-500">{description}</p>;
};

export default ArrayFieldDescriptionTemplate;
