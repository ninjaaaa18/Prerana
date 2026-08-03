import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MailCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AuthCard } from '../components/AuthCard';

export interface EmailSentPageProps {
  email?: string;
  title?: string;
  message?: string;
}

export const EmailSentPage: React.FC<EmailSentPageProps> = ({
  email,
  title = 'Check your inbox',
  message = "We've sent you a link to reset your password. The link expires in 30 minutes.",
}) => {
  return (
    <AuthCard>
      <div className="space-y-6 text-center">
        <div className="relative mx-auto inline-flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/15 blur-2xl" aria-hidden="true" />
          <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <MailCheck className="h-9 w-9" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-100">{title}</h1>
          <p className="mx-auto max-w-sm text-sm text-slate-400">{message}</p>
          {email && <p className="text-sm font-medium text-slate-300">{email}</p>}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full')}
          >
            Return to login
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
      </div>
    </AuthCard>
  );
};
