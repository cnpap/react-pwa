import { TitleFieldProps } from '@rjsf/utils';

const TitleFieldTemplate = ({ title, id, required }: TitleFieldProps) => {
  if (!title) {
    return null;
  }

  return (
    <h3 id={id} className="text-lg font-medium text-gray-900">
      {title}
      {required && <span className="text-red-500 ml-1">*</span>}
    </h3>
  );
};

export default TitleFieldTemplate;
