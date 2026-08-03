import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { resetPasswordSchema, type ResetPasswordValues } from '../schemas/reset-password.schema';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { AuthHeader } from '../components/AuthHeader';
import { PasswordField } from '../components/PasswordField';
import { cn } from '@/lib/utils';

export const ResetPasswordPage: React.FC = () => {
  const [resetDone, setResetDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async () => {
    // TODO: wire to auth service when the API is available
    await new Promise((resolve) => setTimeout(resolve, 900));
    setResetDone(true);
  };

  if (resetDone) {
    return (
      <AuthLayout>
        <AuthCard>
          <div className="space-y-6 text-center">
            <div className="relative mx-auto inline-flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/15 blur-2xl" aria-hidden="true" />
              <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="h-9 w-9" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-100">
                Password updated
              </h1>
              <p className="mx-auto max-w-sm text-sm text-slate-400">
                Your password has been reset successfully. You can now sign in with your new
                password.
              </p>
            </div>

            <Link
              to="/login"
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full')}
            >
              Return to login
            </Link>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          icon={<Lock className="h-6 w-6" />}
          title="Set a new password"
          subtitle="Choose a strong password you haven't used before"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <PasswordField
            label="New Password"
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordField
            label="Confirm New Password"
            placeholder="Repeat new password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Reset password'}
          </Button>
        </form>

        <Link
          to="/login"
          className="mt-6 inline-flex w-full items-center justify-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to login
        </Link>
      </AuthCard>
    </AuthLayout>
  );
};
