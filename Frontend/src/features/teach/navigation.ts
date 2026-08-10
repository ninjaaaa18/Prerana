import type { IconName } from '@/components/ui/icon';

export interface TeachNavItem {
  label: string;
  route: string;
  icon: IconName;
  end?: boolean;
}

export interface TeachNavSection {
  label: string;
  items: TeachNavItem[];
}

export const TEACH_NAV_SECTIONS: TeachNavSection[] = [
  {
    label: 'Content',
    items: [
      { label: 'Overview', route: '/app/teach', icon: 'LayoutDashboard', end: true },
      { label: 'Subjects', route: '/app/teach/subjects', icon: 'BookOpen' },
    ],
  },
  {
    label: 'Classroom',
    items: [
      { label: 'Classes', route: '/app/teach/classes', icon: 'Users' },
      { label: 'Progress', route: '/app/teach/progress', icon: 'BarChart3' },
    ],
  },
  {
    label: 'Assessment',
    items: [{ label: 'Assessments', route: '/app/teach/assessments', icon: 'ClipboardCheck' }],
  },
];
