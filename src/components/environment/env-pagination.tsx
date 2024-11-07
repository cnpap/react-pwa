'use client';

interface EnvPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function EnvPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: EnvPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="sticky bottom-[64px] md:bottom-0 z-10 bg-background h-[65px] flex-none border-t border-border/50">
      <div className="flex items-center h-full justify-between px-4">
        <div className="text-sm text-muted-foreground">共 {totalItems} 个环境</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 text-sm border rounded-sm disabled:opacity-50 hover:bg-accent transition-colors"
          >
            上一页
          </button>
          <span className="hidden md:inline text-sm text-muted-foreground">
            第 {currentPage + 1} 页，共 {totalPages} 页
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 text-sm border rounded-sm disabled:opacity-50 hover:bg-accent transition-colors"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
}
