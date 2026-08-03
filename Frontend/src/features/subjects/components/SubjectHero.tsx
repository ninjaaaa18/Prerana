import React from 'react';
import { BookOpen, Clock, GraduationCap, Layers } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { SubjectBanner } from './SubjectBanner';
import { ProgressSummary } from './ProgressSummary';
import { getSubjectTotals } from '../data';
import type { Subject } from '../types';

interface MetaItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const MetaItem: React.FC<MetaItemProps> = ({ icon, label, value }) => {
  return (
    <div className="space-y-1">
      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
        {icon}
        {label}
      </span>
      <p className="text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
};

export const SubjectHero: React.FC<{ subject: Subject }> = ({ subject }) => {
  const { chaptersTotal, lessonsTotal, lessonsCompleted, progress } = getSubjectTotals(subject);

  return (
    <div className="space-y-5">
      <SubjectBanner color={subject.color} name={subject.name} icon={subject.icon} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="space-y-5 lg:col-span-2">
          <div className="space-y-1">
            <h2 className="font-display text-lg font-bold text-slate-100">About this subject</h2>
            <p className="text-sm leading-relaxed text-slate-400">{subject.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <MetaItem
              icon={<GraduationCap className="h-3.5 w-3.5" />}
              label="Teacher"
              value={subject.teacher}
            />
            <MetaItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Chapters"
              value={`${chaptersTotal}`}
            />
            <MetaItem
              icon={<BookOpen className="h-3.5 w-3.5" />}
              label="Lessons"
              value={`${lessonsTotal}`}
            />
            <MetaItem
              icon={<Clock className="h-3.5 w-3.5" />}
              label="Est. duration"
              value={`${subject.estimatedHours} hrs`}
            />
          </div>
        </Card>

        <Card className="space-y-5">
          <h2 className="font-display text-lg font-bold text-slate-100">Your progress</h2>
          <ProgressSummary
            value={progress}
            color={subject.color}
            label="Complete"
            detail={`${lessonsCompleted} of ${lessonsTotal} lessons done`}
          />
          <ProgressBar value={progress} variant="primary" size="sm" />
        </Card>
      </div>
    </div>
  );
};
