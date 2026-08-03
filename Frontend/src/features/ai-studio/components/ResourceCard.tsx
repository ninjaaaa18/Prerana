import React from 'react';
import { Eye, FileDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ResourceItem } from '../types';

export interface ResourceCardProps {
  resource: ResourceItem;
  onPreview: (resource: ResourceItem) => void;
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onPreview, className }) => {
  const { title, description, icon: Icon, color, fileType, size } = resource;

  return (
    <Card isHoverable className={cn('group flex h-full flex-col gap-4 overflow-hidden', className)}>
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <Badge variant="secondary" size="sm">
          {fileType} · {size}
        </Badge>
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display text-base font-bold tracking-tight text-slate-100">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{description}</p>
      </div>

      <div className="mt-auto flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onPreview(resource)}
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onPreview(resource)}
        >
          <FileDown className="h-3.5 w-3.5" />
          Generate
        </Button>
      </div>
    </Card>
  );
};
