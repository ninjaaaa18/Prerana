import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  showValue?: boolean;
  variant?: 'primary' | 'emerald' | 'amber' | 'coral' | 'sky';
  size?: 'sm' | 'md' | 'lg';
}

const variantColors = {
  primary: 'bg-indigo-600',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  coral: 'bg-rose-500',
  sky: 'bg-sky-500',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showValue = false,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full space-y-1.5', className)} {...props}>
      {showValue && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.round(percentage)}
        aria-label="Progress"
        className={cn(
          'w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50',
          size === 'sm' && 'h-2',
          size === 'md' && 'h-3.5',
          size === 'lg' && 'h-5'
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('h-full rounded-full transition-colors', variantColors[variant])}
        />
      </div>
    </div>
  );
};
