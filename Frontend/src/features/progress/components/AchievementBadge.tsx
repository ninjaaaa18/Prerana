import React from 'react';
import { Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Achievement, AchievementRarity } from '../types';

export interface AchievementBadgeProps {
  achievement: Achievement;
  className?: string;
}

const rarityStyles: Record<AchievementRarity, { ring: string; icon: string; badge: 'secondary' | 'primary' | 'warning' }> = {
  common: {
    ring: 'border-indigo-500/25 bg-indigo-600/10 text-indigo-300',
    icon: 'text-indigo-300',
    badge: 'secondary',
  },
  rare: {
    ring: 'border-violet-500/40 bg-violet-600/10 text-violet-300',
    icon: 'text-violet-300',
    badge: 'primary',
  },
  epic: {
    ring: 'border-amber-400/50 bg-amber-400/10 text-amber-300 shadow-[0_0_24px_-6px_rgba(251,191,36,0.35)]',
    icon: 'text-amber-300',
    badge: 'warning',
  },
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement, className }) => {
  const { icon: Icon } = achievement;
  const locked = !achievement.earnedDate;
  const styles = rarityStyles[achievement.rarity];

  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center transition-colors hover:border-slate-700',
        locked && 'opacity-70',
        className
      )}
    >
      {locked && (
        <span className="absolute right-3 top-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          Locked
        </span>
      )}

      <div
        className={cn(
          'relative inline-flex h-16 w-16 items-center justify-center rounded-full border',
          styles.ring
        )}
      >
        {locked ? (
          <Lock className="h-7 w-7 text-slate-500" />
        ) : (
          <Icon className={cn('h-7 w-7', styles.icon)} />
        )}
        {!locked && achievement.rarity === 'epic' && (
          <span className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent" aria-hidden="true" />
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-100">{achievement.title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{achievement.description}</p>
      </div>

      {achievement.earnedDate ? (
        <Badge variant={styles.badge} size="sm">
          Earned {achievement.earnedDate}
        </Badge>
      ) : (
        <Badge variant="outline" size="sm">
          In progress
        </Badge>
      )}
    </div>
  );
};
