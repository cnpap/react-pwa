'use client';

import { EnvironmentVariable } from './data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<EnvironmentVariable>[] = [
  {
    accessorKey: 'name',
    header: '变量名',
    size: 200,
  },
  {
    accessorKey: 'value',
    header: '值',
    size: 300,
  },
  {
    accessorKey: 'type',
    header: '类型',
    size: 100,
  },
  {
    accessorKey: 'updatedAt',
    header: '更新时间',
    size: 120,
  },
];
