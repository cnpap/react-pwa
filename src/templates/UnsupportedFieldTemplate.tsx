import { UnsupportedFieldProps } from '@rjsf/utils';

const UnsupportedFieldTemplate = ({ schema, reason }: UnsupportedFieldProps) => {
  return (
    <div className="p-4 border border-red-200 rounded-sm bg-red-50">
      <p className="text-sm text-red-600">不支持的字段类型: {schema.type}</p>
      {reason && <p className="mt-1 text-sm text-red-500">原因: {reason}</p>}
    </div>
  );
};

export default UnsupportedFieldTemplate;
