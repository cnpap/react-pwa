import { FieldHelpProps } from '@rjsf/utils';

const FieldHelpTemplate = ({ help }: FieldHelpProps) => {
  if (!help) {
    return null;
  }

  return <p className="mt-1 text-sm text-gray-400">{help}</p>;
};

export default FieldHelpTemplate;
