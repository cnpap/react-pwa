import { IconButtonProps } from '@rjsf/utils';
import classNames from 'classnames';

interface CustomButtonProps extends IconButtonProps {
  uiSchema?: Record<string, unknown>;
}

const ButtonTemplates = {
  SubmitButton: ({ uiSchema = {}, ...props }: CustomButtonProps) => {
    const submitOptions = uiSchema?.['ui:submitButtonOptions'] || {};
    const { submitText, props: submitProps = {} } = submitOptions;
    return (
      <button
        type="submit"
        {...submitProps}
        className={classNames(
          'inline-flex justify-center rounded-sm border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          submitProps.className,
        )}
      >
        {submitText || props.children || '提交'}
      </button>
    );
  },
  AddButton: ({ ...props }: CustomButtonProps) => {
    return (
      <button
        type="button"
        {...props}
        className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded-sm hover:border-blue-300 transition-colors"
      >
        + {props.children || '添加'}
      </button>
    );
  },
  RemoveButton: ({ ...props }: CustomButtonProps) => {
    return (
      <button
        type="button"
        {...props}
        className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-sm hover:border-red-300 transition-colors"
      >
        × {props.children || '删除'}
      </button>
    );
  },
  MoveDownButton: ({ ...props }: CustomButtonProps) => {
    return (
      <button
        type="button"
        {...props}
        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
      >
        ↓
      </button>
    );
  },
  MoveUpButton: ({ ...props }: CustomButtonProps) => {
    return (
      <button
        type="button"
        {...props}
        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
      >
        ↑
      </button>
    );
  },
};

export default ButtonTemplates;
