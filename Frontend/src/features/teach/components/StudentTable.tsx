import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { ProgressBar } from '@/components/ui/progress-bar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StudentStatusBadge } from './StudentStatusBadge';
import type { StudentProgress } from '../types';

export interface StudentTableProps {
  students: StudentProgress[];
  classId: string;
  className?: string;
}

export const StudentTable: React.FC<StudentTableProps> = ({ students, classId, className }) => {
  return (
    <div className={cn('overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60', className)}>
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Students and their performance in this class</caption>
        <thead>
          <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
            <th scope="col" className="px-5 py-3 font-semibold">
              Student
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Completion
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Average Score
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Last Active
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Status
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const isPositive = student.trend >= 0;
            return (
              <tr key={student.id} className="border-b border-slate-800/60 last:border-b-0">
                <th scope="row" className="px-5 py-3.5 font-medium">
                  <span className="flex items-center gap-3">
                    <Avatar name={student.name} size="sm" />
                    <span className="text-slate-100">{student.name}</span>
                  </span>
                </th>
                <td className="px-5 py-3.5">
                  <div className="flex w-full max-w-[180px] items-center gap-2">
                    <ProgressBar value={student.completion} variant="primary" size="sm" className="flex-1" />
                    <span className="text-xs font-semibold text-slate-200">{student.completion}%</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="font-semibold text-slate-200">{student.averageScore}%</span>
                  <span className={cn('ml-2 text-xs font-medium', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
                    {isPositive ? '↑' : '↓'} {Math.abs(student.trend)}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-400">{student.lastActive}</td>
                <td className="px-5 py-3.5">
                  <StudentStatusBadge status={student.status} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link
                    to={`/app/teach/classes/${classId}`}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'inline-flex items-center gap-1.5')}
                  >
                    View
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
