import type { IconName } from '@/components/ui/icon';

export interface ParentNavItem {
  label: string;
  route: string;
  icon: IconName;
  end?: boolean;
}

export interface ParentNavSection {
  label: string;
  items: ParentNavItem[];
}

export const PARENT_NAV_SECTIONS: ParentNavSection[] = [
  {
    label: 'Overview',
    items: [{ label: 'Mission Control', route: '/app/parent', icon: 'Orbit', end: true }],
  },
  {
    label: 'Monitor',
    items: [
      { label: 'Assessments', route: '/app/parent/assessments', icon: 'ClipboardCheck' },
      { label: 'Activity', route: '/app/parent/activity', icon: 'Activity' },
    ],
  },
];
