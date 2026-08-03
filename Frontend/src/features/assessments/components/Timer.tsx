import React from 'react';
import { AlarmClock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimerProps {
  initialSeconds: number;
  onExpire?: () => void;
  onTick?: (secondsLeft: number) => void;
  className?: string;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export const Timer: React.FC<TimerProps> = ({ initialSeconds, onExpire, onTick, className }) => {
  const [secondsLeft, setSecondsLeft] = React.useState(initialSeconds);
  const expiredRef = React.useRef(false);
  const onTickRef = React.useRef(onTick);
  const onExpireRef = React.useRef(onExpire);

  React.useEffect(() => {
    onTickRef.current = onTick;
    onExpireRef.current = onExpire;
  }, [onTick, onExpire]);

  React.useEffect(() => {
    setSecondsLeft(initialSeconds);
    expiredRef.current = false;
  }, [initialSeconds]);

  React.useEffect(() => {
    if (secondsLeft <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current?.();
      }
      return;
    }
    onTickRef.current?.(secondsLeft);
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft, initialSeconds]);

  const isUrgent = secondsLeft <= 30;
  const isWarning = secondsLeft <= 60 && !isUrgent;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-display text-lg font-bold tabular-nums transition-colors',
        isUrgent
          ? 'border-rose-500/60 bg-rose-600/15 text-rose-300'
          : isWarning
            ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
            : 'border-slate-800 bg-slate-900/70 text-slate-100',
        className
      )}
      role="timer"
      aria-label="Time remaining"
      aria-live={isWarning ? 'polite' : 'off'}
    >
      <AlarmClock className={cn('h-5 w-5', isUrgent && 'animate-pulse')} />
      {formatTime(secondsLeft)}
    </div>
  );
};
