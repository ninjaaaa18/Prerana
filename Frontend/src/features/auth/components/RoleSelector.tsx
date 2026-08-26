import React from 'react';
import { GraduationCap, HeartHandshake, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRoleOption } from '../types';

const ROLE_OPTIONS: UserRoleOption[] = [
  { value: 'student', label: 'Student', description: 'I want to learn' },
  { value: 'teacher', label: 'Teacher', description: 'I teach students' },
  { value: 'parent', label: 'Parent', description: 'I guide my child' },
];

const ROLE_ICONS: Record<UserRoleOption['value'], React.ReactNode> = {
  student: <GraduationCap className="h-5 w-5" />,
  teacher: <Users className="h-5 w-5" />,
  parent: <HeartHandshake className="h-5 w-5" />,
};

export interface RoleSelectorProps {
  value?: UserRoleOption['value'];
  onChange?: (role: UserRoleOption['value']) => void;
  error?: string;
  className?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange, error, className }) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
        I am a
      </span>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Select your role">
        {ROLE_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange?.(option.value)}
              className={cn(
                'group flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60',
                selected
                  ? 'border-indigo-500/60 bg-indigo-500/10 text-indigo-200 shadow-md shadow-indigo-500/10'
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800/60'
              )}
            >
              <span
                className={cn(
                  'transition-colors',
                  selected ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
                )}
              >
                {ROLE_ICONS[option.value]}
              </span>
              <span className="text-xs font-semibold">{option.label}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs font-medium text-rose-400">{error}</p>}
    </div>
  );
};
