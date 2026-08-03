import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/breadcrumb';
import { BREADCRUMB_LABELS } from '@/config/navigation';
import { cn } from '@/lib/utils';

export interface BreadcrumbBarProps {
  className?: string;
}

const homeCrumb: BreadcrumbItem = { label: 'Home', href: '/app' };

export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({ className }) => {
  const location = useLocation();

  const items = React.useMemo<BreadcrumbItem[]>(() => {
    const segments = location.pathname.replace(/^\/app\/?/, '').split('/').filter(Boolean);

    const crumbs: BreadcrumbItem[] = [homeCrumb];
    if (segments.length === 0) return crumbs;

    let cumulative = '/app';
    segments.forEach((segment, index) => {
      cumulative = `${cumulative}/${segment}`;
      const label = BREADCRUMB_LABELS[segment] ?? segment.replace(/-/g, ' ');
      const isLast = index === segments.length - 1;
      crumbs.push(isLast ? { label, isCurrent: true } : { label, href: cumulative });
    });
    return crumbs;
  }, [location.pathname]);

  return (
    <div className={cn('flex min-w-0 items-center', className)}>
      <Breadcrumb items={items} />
    </div>
  );
};
