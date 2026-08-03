import React from 'react';
import { BarChart3, BookOpen, ClipboardCheck, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import type { WeekStudyDatum } from '../types';

export interface StudyChartProps {
  data: WeekStudyDatum[];
  className?: string;
}

interface Series {
  key: 'hours' | 'lessons' | 'assessments';
  label: string;
  color: string;
  dashed?: boolean;
}

const SERIES: Series[] = [
  { key: 'hours', label: 'Study hours', color: '#818cf8' },
  { key: 'lessons', label: 'Lessons', color: '#34d399' },
  { key: 'assessments', label: 'Assessments', color: '#38bdf8', dashed: true },
];

const WIDTH = 720;
const HEIGHT = 280;
const PAD = { top: 18, right: 18, bottom: 32, left: 44 };

interface Point {
  x: number;
  y: number;
}

function smoothPath(points: Point[]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

export const StudyChart: React.FC<StudyChartProps> = ({ data, className }) => {
  if (data.length === 0) {
    return (
      <Card className={className}>
        <EmptyState
          icon={<BarChart3 className="h-8 w-8" />}
          title="No study data yet"
          description="Once you start learning, your weekly activity will be charted here."
        />
      </Card>
    );
  }

  const maxValue = Math.max(...data.flatMap((d) => [d.hours, d.lessons, d.assessments]));
  const yMax = Math.max(4, Math.ceil(maxValue / 4) * 4);
  const step = yMax / 4;

  const plotW = WIDTH - PAD.left - PAD.right;
  const plotH = HEIGHT - PAD.top - PAD.bottom;
  const xStep = plotW / (data.length - 1);

  const xFor = (index: number): number => PAD.left + index * xStep;
  const yFor = (value: number): number => PAD.top + plotH - (value / yMax) * plotH;

  const points: Record<Series['key'], Point[]> = {
    hours: data.map((d, i) => ({ x: xFor(i), y: yFor(d.hours) })),
    lessons: data.map((d, i) => ({ x: xFor(i), y: yFor(d.lessons) })),
    assessments: data.map((d, i) => ({ x: xFor(i), y: yFor(d.assessments) })),
  };

  const hoursArea = `${smoothPath(points.hours)} L ${points.hours[points.hours.length - 1].x.toFixed(2)} ${PAD.top + plotH} L ${points.hours[0].x.toFixed(2)} ${PAD.top + plotH} Z`;

  const totalHours = data.reduce((sum, d) => sum + d.hours, 0);
  const totalLessons = data.reduce((sum, d) => sum + d.lessons, 0);
  const totalAssessments = data.reduce((sum, d) => sum + d.assessments, 0);

  return (
    <Card className={cn('space-y-4', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-base font-bold text-slate-100">Weekly study</h3>
          <p className="text-xs text-slate-500">Last 10 weeks at a glance</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {SERIES.map((series) => (
            <span key={series.key} className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: series.color }}
              />
              {series.label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full min-w-[560px]"
          role="img"
          aria-label="Line chart of weekly study hours, lessons completed, and assessments over the past 10 weeks"
        >
          <defs>
            <linearGradient id="hours-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4].map((tick) => {
            const value = step * tick;
            const y = yFor(value);
            return (
              <g key={tick}>
                <line
                  x1={PAD.left}
                  x2={WIDTH - PAD.right}
                  y1={y}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={10}
                  fill="#64748b"
                >
                  {Math.round(value)}
                </text>
              </g>
            );
          })}

          <path d={hoursArea} fill="url(#hours-fill)" />

          {SERIES.map((series) => (
            <g key={series.key}>
              <path
                d={smoothPath(points[series.key])}
                fill="none"
                stroke={series.color}
                strokeWidth={2.25}
                strokeLinecap="round"
                strokeDasharray={series.dashed ? '6 5' : undefined}
              />
              {points[series.key].map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r={3}
                  fill={series.color}
                >
                  <title>
                    {data[i].label} — {series.label}: {data[i][series.key]}
                  </title>
                </circle>
              ))}
            </g>
          ))}

          {data.map((d, i) =>
            i % 2 === 0 ? (
              <text
                key={`x-${i}`}
                x={xFor(i)}
                y={HEIGHT - 10}
                textAnchor="middle"
                fontSize={10}
                fill="#64748b"
              >
                {d.label}
              </text>
            ) : null
          )}
        </svg>
      </div>

      <dl className="grid grid-cols-3 gap-3 border-t border-slate-800 pt-4">
        <div className="space-y-0.5">
          <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
            <Clock className="h-3 w-3" /> Total hours
          </dt>
          <dd className="font-display text-lg font-bold tabular-nums text-slate-100">
            {Math.round(totalHours)}
          </dd>
        </div>
        <div className="space-y-0.5">
          <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
            <BookOpen className="h-3 w-3" /> Lessons
          </dt>
          <dd className="font-display text-lg font-bold tabular-nums text-slate-100">
            {totalLessons}
          </dd>
        </div>
        <div className="space-y-0.5">
          <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
            <ClipboardCheck className="h-3 w-3" /> Assessments
          </dt>
          <dd className="font-display text-lg font-bold tabular-nums text-slate-100">
            {totalAssessments}
          </dd>
        </div>
      </dl>
    </Card>
  );
};
