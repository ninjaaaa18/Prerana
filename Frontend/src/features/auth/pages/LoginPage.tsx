import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema, type LoginValues } from '../schemas/login.schema';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { AuthHeader } from '../components/AuthHeader';
import { AuthDivider } from '../components/AuthDivider';
import { AuthFooter } from '../components/AuthFooter';
import { PasswordField } from '../components/PasswordField';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { getAuthErrorMessage } from '@/context/auth-context';
import { useAuth } from '@/hooks/use-auth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = async (values: LoginValues) => {
    setSubmitError(null);
    try {
      const user = await login(values.email, values.password);
      navigate(user.role === 'parent' ? '/app/parent' : '/app');
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          icon={<LogIn className="h-6 w-6" />}
          title="Welcome back"
          subtitle="Sign in to continue your learning journey"
        />
        {submitError && (
          <p role="alert" className="mt-5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            {submitError}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="inline-flex cursor-pointer select-none items-center gap-2 text-slate-400">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-indigo-500"
                {...register('remember')}
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <AuthDivider className="mt-6" />

        <div className="mt-6 space-y-3">
          <SocialLoginButton />
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>

        <AuthFooter
          className="mt-6"
          prompt="New to Prerana?"
          ctaText="Create an account"
          ctaTo="/register"
        />
      </AuthCard>
    </AuthLayout>
  );
};
