import { FieldErrorProps } from '@rjsf/utils';

const FieldErrorTemplate = ({ errors = [] }: FieldErrorProps) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="mt-1">
      {errors.map((error, i) => (
        <p key={i} className="text-sm text-red-500">
          {error}
        </p>
      ))}
    </div>
  );
};

export default FieldErrorTemplate;
