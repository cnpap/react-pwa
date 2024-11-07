'use client';

import { useState } from 'react';
import { ColumnFiltersState } from '@tanstack/react-table';
import { environmentGroups } from './data';
import { EnvCard } from './env-card';
import { SearchHeader } from '@/components/shared/search-header';
import { Pagination } from '@/components/shared/pagination';
import { IconButton } from '@/components/environment/icon-button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type EnvType = 'env' | 'json' | 'yaml';

export function EnvironmentTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [typeFilter, setTypeFilter] = useState<EnvType | ''>('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;
  const navigate = useNavigate();

  const searchValue = (columnFilters[0]?.value as string) ?? '';

  const filteredData = environmentGroups.filter((item) => {
    const matchesSearch =
      !searchValue || item.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesType = !typeFilter || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const paginatedData = filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handleEdit = (id: string) => {
    navigate(`/dashboard/environment-variable/${id}`);
  };

  return (
    <div className="h-full flex flex-col">
      <SearchHeader
        value={searchValue}
        onChange={(value) => setColumnFilters(value ? [{ id: 'name', value }] : [])}
        onTypeChange={(type) => setTypeFilter(type as EnvType)}
        placeholder="搜索环境..."
        rightElement={
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
        }
      />

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((group) => (
            <EnvCard key={group.id} group={group} onEdit={handleEdit} />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        itemName="个环境"
      />
    </div>
  );
}
