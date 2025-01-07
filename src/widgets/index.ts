// src/widgets/index.ts
import TextareaWidget from './TextareaWidget';
import SelectWidget from './SelectWidget';
import DatePickerWidget from './DatePickerWidget';
import CheckboxWidget from './CheckboxWidget';
import RadioWidget from './RadioWidget';
import SwitchWidget from './SwitchWidget';
import { Input } from '@/components/ui/input';

const widgets = {
  TextWidget: Input,
  text: Input,
  select: SelectWidget,
  switch: SwitchWidget,
  radio: RadioWidget,
  checkbox: CheckboxWidget,
  textarea: TextareaWidget,
  ['date-picker']: DatePickerWidget,
};

export default widgets;
