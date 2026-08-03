import React from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerSchema, type RegisterValues } from '../schemas/register.schema';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { AuthHeader } from '../components/AuthHeader';
import { AuthFooter } from '../components/AuthFooter';
import { PasswordField } from '../components/PasswordField';
import { RoleSelector } from '../components/RoleSelector';

export const RegisterPage: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: undefined,
    },
  });

  const onSubmit = async () => {
    // TODO: wire to auth service when the API is available
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          icon={<UserPlus className="h-6 w-6" />}
          title="Create your account"
          subtitle="Join Prerana and start exploring"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <Input
            label="Full Name"
            placeholder="Your full name"
            autoComplete="name"
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <PasswordField
              label="Password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <PasswordField
              label="Confirm Password"
              placeholder="Repeat password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <RoleSelector value={field.value} onChange={field.onChange} error={errors.role?.message} />
            )}
          />

          <div className="space-y-1.5">
            <label className="inline-flex cursor-pointer select-none items-start gap-2.5 text-sm text-slate-400">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-indigo-500"
                {...register('agreeToTerms')}
              />
              <span>
                I agree to the{' '}
                <Link
                  to="/terms"
                  className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-xs font-medium text-rose-400">{errors.agreeToTerms.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <Link
          to="/"
          className="mt-6 inline-flex w-full items-center justify-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <AuthFooter
          className="mt-6"
          prompt="Already have an account?"
          ctaText="Sign in"
          ctaTo="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};
