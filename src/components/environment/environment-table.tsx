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
import { MiniCardBox } from '../Box/MiniCardBox';

export function EnvironmentTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;
  const navigate = useNavigate();

  const searchValue = (columnFilters[0]?.value as string) ?? '';

  const filteredData = environmentGroups.filter((item) => {
    const matchesSearch =
      !searchValue || item.name.toLowerCase().includes(searchValue.toLowerCase());
    return matchesSearch;
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
        // onTypeChange={(type) => setTypeFilter(type as EnvType)}
        placeholder="search ..."
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

      <MiniCardBox>
        {paginatedData.map((group) => (
          <EnvCard key={group.id} group={group} onEdit={handleEdit} />
        ))}
      </MiniCardBox>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        // itemName="个环境"
        itemName="env"
      />
    </div>
  );
}
