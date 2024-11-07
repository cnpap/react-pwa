'use client';

import { Input } from '@/components/ui/input';
import { IconButton } from './icon-button';
import { Plus } from 'lucide-react';
import { ColumnFiltersState } from '@tanstack/react-table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';

interface EnvSearchHeaderProps {
  columnFilters: ColumnFiltersState;
  onFilterChange: (filters: ColumnFiltersState) => void;
  onTypeChange: (type: string) => void;
}

export function EnvSearchHeader({
  columnFilters,
  onFilterChange,
  onTypeChange,
}: EnvSearchHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-background h-[65px] flex-none border-b flex items-center">
      <div className="flex-1 h-full">
        <Input
          placeholder="搜索环境..."
          value={(columnFilters[0]?.value as string) ?? ''}
          onChange={(e) =>
            onFilterChange(
              e.target.value
                ? [
                    {
                      id: 'name',
                      value: e.target.value,
                    },
                  ]
                : [],
            )
          }
          className="h-full shadow-none px-4 rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
        />
      </div>
      <div className="px-4 h-full flex items-center border-l border-border/50">
        <IconButton
          variant="default"
          onClick={() => {
            /* 新增环境 */
          }}
          className="h-9 w-9"
          title="新增环境"
        >
          <Plus className="h-4 w-4" />
        </IconButton>
      </div>
      <div className="flex items-center gap-4 px-4">
        <Select onValueChange={onTypeChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="环境类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">全部</SelectItem>
            <SelectItem value="env">ENV</SelectItem>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="yaml">YAML</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
