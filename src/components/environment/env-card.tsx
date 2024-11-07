'use client';

import { Button } from '../ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { EnvironmentGroup } from './data';

interface EnvCardProps {
  group: EnvironmentGroup;
  onEdit: (id: string) => void;
}

export function EnvCard({ group, onEdit }: EnvCardProps) {
  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-sm shadow-none">
      <div className="p-6 py-4 md:p-6 sm:p-6 flex-1 bg-slate-50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg tracking-tight truncate">{group.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-6 sm:px-6 py-3 bg-muted/50 border-t border-border/50 flex flex-col">
        <div className="grid grid-cols-2 gap-2">
          <Button className="h-8 px-2" onClick={() => onEdit(group.id)}>
            <Pencil className="h-4 w-4" />
            <span className="md:hidden">edit</span>
          </Button>
          <Button variant="destructive" className="h-8 px-2">
            <Trash2 className="h-4 w-4" />
            <span className="md:hidden">delete</span>
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-center text-xs text-muted-foreground">
          <div>
            format: <span className="text-foreground w-12">{group.type.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
