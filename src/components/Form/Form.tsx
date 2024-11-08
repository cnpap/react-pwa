// src/App.tsx
import Form from '@rjsf/core';
import widgets from '@/widgets';
import validator from '@rjsf/validator-ajv8';
import FieldTemplate from '@/fields/FieldTemplate';
import { RJSFSchema, UiSchema, ValidatorType } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';
import SubmitButton from '@/components/SubmitButton';
import ArrayFieldTemplate from '@/templates/ArrayFieldTemplate';
import ObjectFieldTemplate from '@/templates/ObjectFieldTemplate';
import ArrayFieldDescriptionTemplate from '@/templates/ArrayFieldDescriptionTemplate';
import ArrayFieldTitleTemplate from '@/templates/ArrayFieldTitleTemplate';
import ArrayFieldItemTemplate from '@/templates/ArrayFieldItemTemplate';
import BaseInputTemplate from '@/templates/BaseInputTemplate';
import FieldErrorTemplate from '@/templates/FieldErrorTemplate';
import FieldHelpTemplate from '@/templates/FieldHelpTemplate';
import TitleFieldTemplate from '@/templates/TitleFieldTemplate';
import DescriptionFieldTemplate from '@/templates/DescriptionFieldTemplate';
import ButtonTemplates from '@/templates/ButtonTemplates';
import UnsupportedFieldTemplate from '@/templates/UnsupportedFieldTemplate';
import WrapIfAdditionalTemplate from '@/templates/WrapIfAdditionalTemplate';
import { PropsWithChildren } from 'react';

interface AutoFormProps<T extends object> {
  onSubmit: (data: T) => void;
  schema: RJSFSchema;
  uiSchema: UiSchema<T>;
}

function AutoForm<T extends object>({
  onSubmit,
  schema,
  uiSchema,
  children,
}: PropsWithChildren<AutoFormProps<T>>) {
  const handleSubmit = ({ formData }: { formData: T }) => {
    onSubmit?.(formData);
  };

  return (
    <div className="p-4">
      <Form<T>
        schema={schema}
        uiSchema={uiSchema}
        widgets={widgets}
        validator={validator as ValidatorType<T, RJSFSchema>}
        templates={{
          FieldTemplate,
          ArrayFieldTemplate,
          ArrayFieldDescriptionTemplate,
          ArrayFieldTitleTemplate,
          ArrayFieldItemTemplate,
          ObjectFieldTemplate,
          BaseInputTemplate,
          FieldErrorTemplate,
          FieldHelpTemplate,
          TitleFieldTemplate,
          DescriptionFieldTemplate,
          ButtonTemplates,
          UnsupportedFieldTemplate,
          WrapIfAdditionalTemplate,
        }}
        showErrorList={false}
        onSubmit={(data: IChangeEvent<T>) => handleSubmit({ formData: data.formData! })}
      >
        {children ? (
          children
        ) : (
          <div className="flex justify-end pt-4">
            <SubmitButton>提交</SubmitButton>
          </div>
        )}
      </Form>
    </div>
  );
}

export default AutoForm;
