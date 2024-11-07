'use client';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemName?: string;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  itemName = '项',
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="sticky bottom-[64px] md:bottom-0 z-10 bg-background h-[65px] flex-none border-t border-border/50">
      <div className="flex items-center h-full justify-between px-4">
        <div className="text-sm text-muted-foreground">
          {totalItems} {itemName}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 text-sm border rounded-sm disabled:opacity-50 hover:bg-accent transition-colors"
          >
            prev
          </button>
          <span className="hidden md:inline text-sm text-muted-foreground">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 text-sm border rounded-sm disabled:opacity-50 hover:bg-accent transition-colors"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}
