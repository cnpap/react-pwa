import React from 'react';
import { DescriptionFieldProps } from '@rjsf/utils';

const DescriptionFieldTemplate: React.FC<DescriptionFieldProps> = ({ description, id }) => {
  if (!description) {
    return null;
  }

  return (
    <div id={id} className="text-sm text-muted-foreground mb-2">
      {description}
    </div>
  );
};

export default DescriptionFieldTemplate;
