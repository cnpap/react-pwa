'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { EnvironmentGroup } from './data';

interface EnvCardProps {
  group: EnvironmentGroup;
  onEdit: (id: string) => void;
}

type EnvType = 'env' | 'json' | 'yaml';

const typeColorMap: Record<EnvType, string> = {
  env: 'bg-blue-500',
  json: 'bg-green-500',
  yaml: 'bg-purple-500',
};

export function EnvCard({ group, onEdit }: EnvCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-sm shadow-none rounded-sm">
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Badge className={`${typeColorMap[group.type]} rounded-sm`}>
                {group.type.toUpperCase()}
              </Badge>
              <h3 className="font-medium text-lg tracking-tight truncate">{group.name}</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{group.description}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="w-1 h-1 rounded-full bg-green-500 mr-2" />
            活跃
          </div>
          <div className="mx-2">·</div>
          更新于 {group.updatedAt}
        </div>
      </div>

      <div className="px-4 py-3 bg-muted/50 border-t border-border/50 flex items-center justify-between">
        <Badge
          variant="outline"
          className="rounded-sm shrink-0 h-6 px-2 font-normal border-border/50"
        >
          {group.variables.length} 个变量
        </Badge>
        <div className="flex items-center justify-end gap-1">
          <Button className="h-8 px-2 text-sm" onClick={() => onEdit(group.id)}>
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
  );
}
