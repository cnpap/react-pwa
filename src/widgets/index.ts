// src/widgets/index.ts
import TextWidget from './TextWidget';
import TextareaWidget from './TextareaWidget';
import SelectWidget from './SelectWidget';
import DatePickerWidget from './DatePickerWidget';
import CheckboxWidget from './CheckboxWidget';
import RadioWidget from './RadioWidget';
import SwitchWidget from './SwitchWidget';

const widgets = {
  TextWidget,
  text: TextWidget,
  select: SelectWidget,
  switch: SwitchWidget,
  radio: RadioWidget,
  checkbox: CheckboxWidget,
  textarea: TextareaWidget,
  ['date-picker']: DatePickerWidget,
};

export default widgets;
