import { PropsWithChildren } from 'react';

export function MiniCardBox({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}
