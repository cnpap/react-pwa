'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ColumnFiltersState } from '@tanstack/react-table';
import { environmentGroups } from './data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconButton } from './icon-button';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '../ui/button';

export function EnvironmentTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  // 过滤数据
  const filteredData = environmentGroups.filter(
    (item) =>
      !columnFilters.length ||
      item.name.toLowerCase().includes(((columnFilters[0]?.value as string) || '').toLowerCase()),
  );

  // 分页数据
  const paginatedData = filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <div className="h-full flex flex-col">
      {/* 搜索框和新增按钮 */}
      <div className="sticky top-0 z-10 bg-background h-[65px] flex-none border-b flex items-center">
        <div className="flex-1 h-full">
          <Input
            placeholder="搜索环境..."
            value={(columnFilters[0]?.value as string) ?? ''}
            onChange={(e) =>
              setColumnFilters(
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
      </div>

      {/* 卡片网格布局 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((group) => (
            <Card
              key={group.id}
              className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-sm shadow-none rounded-sm"
            >
              {/* 卡片头部 */}
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg tracking-tight truncate">{group.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* 更新时间 */}
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-green-500 mr-2" />
                    活跃
                  </div>
                  <div className="mx-2">·</div>
                  更新于 {group.updatedAt}
                </div>
              </div>

              {/* 操作按钮组 - 移除了添加按钮 */}
              <div className="px-4 py-3 bg-muted/50 border-t border-border/50 flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="rounded-sm shrink-0 h-6 px-2 font-normal border-border/50"
                >
                  {group.variables.length} 个变量
                </Badge>
                <div className="flex items-center justify-end gap-1">
                  <Button className="h-8 px-2 text-sm">
                    <Pencil className="h-4 w-4" />
                    编辑
                  </Button>
                  <Button variant="destructive" className="h-8 px-2 text-sm">
                    <Trash2 className="h-4 w-4" />
                    删除
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 底部分页 - 使用磨砂玻璃效果 */}
      <div className="sticky bottom-[64px] md:bottom-0 z-10 bg-background h-[65px] flex-none border-t border-border/50">
        <div className="flex items-center h-full justify-between px-4">
          <div className="text-sm text-muted-foreground">共 {filteredData.length} 个环境</div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 text-sm border rounded-sm disabled:opacity-50 hover:bg-accent transition-colors"
            >
              上一页
            </button>
            <span className="hidden md:inline text-sm text-muted-foreground">
              第 {currentPage + 1} 页，共 {Math.ceil(filteredData.length / pageSize)} 页
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= Math.ceil(filteredData.length / pageSize) - 1}
              className="px-4 py-2 text-sm border rounded-sm disabled:opacity-50 hover:bg-accent transition-colors"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
