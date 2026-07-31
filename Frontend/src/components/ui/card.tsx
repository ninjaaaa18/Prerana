import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardLiftVariants } from '@/constants/animations';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'basic' | 'feature' | 'stats';
  isHoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'basic', isHoverable = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="rest"
        whileHover={isHoverable ? 'hover' : undefined}
        variants={isHoverable ? cardLiftVariants : undefined}
        className={cn(
          'rounded-2xl bg-slate-900/80 border border-slate-800 p-6 text-slate-100 backdrop-blur-sm transition-colors',
          variant === 'feature' && 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800/80 shadow-soft',
          variant === 'stats' && 'bg-slate-900/90 border-slate-800 flex flex-col justify-between',
          isHoverable && 'cursor-pointer hover:border-slate-700',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';

export interface StatsCardProps extends CardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  className,
  ...props
}) => {
  return (
    <Card variant="stats" isHoverable className={cn('space-y-4', className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        {icon && <div className="p-2.5 rounded-xl bg-slate-800/80 text-indigo-400">{icon}</div>}
      </div>
      <div>
        <div className="text-3xl font-extrabold font-display text-slate-100">{value}</div>
        {change && (
          <p className={cn('text-xs font-medium mt-1', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
            {isPositive ? '↑' : '↓'} {change} <span className="text-slate-500">vs last month</span>
          </p>
        )}
      </div>
    </Card>
  );
};

export interface FeatureCardProps extends CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badgeText?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  badgeText,
  className,
  ...props
}) => {
  return (
    <Card variant="feature" isHoverable className={cn('space-y-4 relative overflow-hidden', className)} {...props}>
      {badgeText && (
        <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {badgeText}
        </span>
      )}
      <div className="inline-flex p-3 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
        {icon}
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold font-display text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};

export { Card };
