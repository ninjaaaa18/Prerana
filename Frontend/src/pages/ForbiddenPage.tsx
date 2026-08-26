import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export const ForbiddenPage: React.FC = () => (
  <Container size="sm" className="flex min-h-[60vh] items-center justify-center py-16">
    <section className="w-full rounded-3xl border border-rose-500/20 bg-slate-950/75 p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.7)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-rose-400/30 bg-rose-500/10 text-rose-300">
        <ShieldAlert className="h-8 w-8" aria-hidden="true" />
      </div>
      <h1 className="mt-6 font-display text-2xl font-bold text-slate-50">Access restricted</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        This mission area is not available for your current role.
      </p>
      <Link to="/app" className={cn(buttonVariants({ variant: 'primary' }), 'mt-6')}>
        Return to dashboard
      </Link>
    </section>
  </Container>
);
