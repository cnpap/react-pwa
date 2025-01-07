import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DatePickerWidget: React.FC<WidgetProps> = ({
  value,
  disabled,
  readonly,
  placeholder,
  onChange,
  uiSchema,
}) => {
  const date = value ? new Date(value) : undefined;
  console.log(123123, date, uiSchema);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
          disabled={disabled || readonly}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'yyyy-MM-dd') : placeholder || '选择日期'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate: Date | undefined) => {
            onChange(newDate ? format(newDate, 'yyyy-MM-dd') : undefined);
          }}
          disabled={disabled || readonly}
          initialFocus
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerWidget;
