import { ObjectFieldTemplateProps } from '@rjsf/utils';

const ObjectFieldTemplate = ({
  title,
  description,
  properties,
  required,
}: ObjectFieldTemplateProps) => {
  return (
    <div>
      {title && (
        <div className="mb-4 pb-2 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}
      <div className="space-y-4 border border-gray-200 p-4">
        {properties.map((prop) => prop.content)}
      </div>
    </div>
  );
};

export default ObjectFieldTemplate;
