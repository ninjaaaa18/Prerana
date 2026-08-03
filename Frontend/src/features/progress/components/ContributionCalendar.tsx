import React, { useMemo } from 'react';
import { Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import type { ActivityLevel, DayActivity } from '../types';

export interface ContributionCalendarProps {
  days: DayActivity[];
  className?: string;
}

const levelStyles: Record<ActivityLevel, string> = {
  0: 'bg-slate-800/70 border border-slate-800',
  1: 'bg-emerald-950 border border-emerald-900',
  2: 'bg-emerald-800 border border-emerald-700/60',
  3: 'bg-emerald-600 border border-emerald-500/50',
  4: 'bg-emerald-400 border border-emerald-300/60',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const weekdaySlot = (index: number): string => {
  if (index === 1) return 'Mon';
  if (index === 3) return 'Wed';
  if (index === 5) return 'Fri';
  return '';
};

interface WeekColumn {
  days: Array<{ date: Date; level: ActivityLevel; minutes: number }>;
  monthLabel?: string;
}

const parseDate = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const ContributionCalendar: React.FC<ContributionCalendarProps> = ({ days, className }) => {
  const { weeks, activeDays, totalMinutes, todayKey } = useMemo(() => {
    const map = new Map<string, DayActivity>();
    days.forEach((day) => map.set(day.date, day));

    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
    const first = sorted[0] ? parseDate(sorted[0].date) : new Date();
    const last = sorted.length > 0 ? parseDate(sorted[sorted.length - 1].date) : new Date();

    const start = new Date(first);
    start.setDate(start.getDate() - start.getDay());

    const columns: WeekColumn[] = [];
    const cursor = new Date(start);
    let previousMonth: number | null = null;

    while (cursor <= last) {
      const cells: WeekColumn['days'] = [];
      for (let i = 0; i < 7; i += 1) {
        const iso = cursor.toISOString().slice(0, 10);
        const activity = map.get(iso);
        cells.push({
          date: new Date(cursor),
          level: activity?.level ?? 0,
          minutes: activity?.minutes ?? 0,
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      const monthLabel =
        previousMonth === null || cells[0].date.getMonth() !== previousMonth
          ? MONTHS[cells[0].date.getMonth()]
          : undefined;
      previousMonth = cells[0].date.getMonth();
      columns.push({ days: cells, monthLabel });
    }

    const active = days.filter((day) => day.level > 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayIso = today.toISOString().slice(0, 10);

    return {
      weeks: columns,
      activeDays: active.length,
      totalMinutes: active.reduce((sum, day) => sum + day.minutes, 0),
      todayKey: todayIso,
    };
  }, [days]);

  if (weeks.length === 0 || activeDays === 0) {
    return (
      <Card className={className}>
        <EmptyState
          icon={<Flame className="h-8 w-8" />}
          title="No study history yet"
          description="Complete your first lesson and your daily activity will light up here."
        />
      </Card>
    );
  }

  const hours = Math.round(totalMinutes / 60);

  return (
    <Card className={cn('space-y-4', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-base font-bold text-slate-100">Activity calendar</h3>
          <p className="text-xs text-slate-500">
            {activeDays} active days · {hours} hrs studied
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pb-1" aria-hidden="false">
        <div
          role="img"
          aria-label={`Study activity over the last ${weeks.length} weeks: you studied on ${activeDays} days for about ${hours} hours.`}
          className="inline-flex min-w-[430px] flex-col gap-1"
        >
          <div className="flex gap-[3px]">
            <span className="w-[34px] shrink-0" />
            {weeks.map((week, index) => (
              <span key={`month-${index}`} className="relative h-3 w-3 shrink-0">
                {week.monthLabel && (
                  <span className="absolute left-0 top-0 whitespace-nowrap text-[9px] font-medium leading-none text-slate-500">
                    {week.monthLabel}
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            <div className="flex w-[34px] shrink-0 flex-col gap-[3px]">
              {Array.from({ length: 7 }, (_, index) => (
                <span key={index} className="h-3 text-[9px] leading-[12px] text-slate-500">
                  {weekdaySlot(index)}
                </span>
              ))}
            </div>

            {weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="flex flex-col gap-[3px]">
                {week.days.map((cell) => {
                  const key = cell.date.toISOString().slice(0, 10);
                  const isToday = key === todayKey;
                  return (
                    <div
                      key={key}
                      title={`${cell.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${cell.minutes} minutes`}
                      className={cn(
                        'h-3 w-3 rounded-[3px]',
                        levelStyles[cell.level],
                        isToday && 'ring-1 ring-indigo-400 ring-offset-1 ring-offset-slate-900'
                      )}
                      role="gridcell"
                      aria-label={`${cell.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}${cell.minutes > 0 ? `, ${cell.minutes} minutes` : ', no activity'}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-500">
        <span className="mr-0.5">Less</span>
        {(Object.keys(levelStyles) as unknown as ActivityLevel[]).map((level) => (
          <span key={level} className={cn('h-3 w-3 rounded-[3px]', levelStyles[level])} />
        ))}
        <span className="ml-0.5">More</span>
      </div>
    </Card>
  );
};
