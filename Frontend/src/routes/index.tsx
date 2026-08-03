import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AppShell } from '@/layouts/AppShell';
import { DashboardLayout } from '@/layouts/DashboardLayout';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('@/features/auth/pages/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);
const ForgotPasswordPage = lazy(() =>
  import('@/features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import('@/features/auth/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage }))
);
const DesignSystemPage = lazy(() =>
  import('@/pages/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage }))
);
const PlaceholderPage = lazy(() =>
  import('@/pages/PlaceholderPage').then((m) => ({ default: m.PlaceholderPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="terms" element={<PlaceholderPage title="Terms of Service" />} />
        <Route path="privacy" element={<PlaceholderPage title="Privacy Policy" />} />
        <Route path="design-system" element={<DesignSystemPage />} />
      </Route>

      <Route path="/app" element={<AppShell />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<PlaceholderPage title="Home" />} />
        </Route>
        <Route path="subjects" element={<PlaceholderPage title="Subjects" />} />
        <Route path="ai-studio" element={<PlaceholderPage title="AI Studio" />} />
        <Route path="library" element={<PlaceholderPage title="Library" />} />
        <Route path="assessments" element={<PlaceholderPage title="Assessments" />} />
        <Route path="progress" element={<PlaceholderPage title="Progress" />} />
        <Route path="teach" element={<PlaceholderPage title="Teach" />} />
        <Route path="admin" element={<PlaceholderPage title="Admin Console" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        <Route path="profile" element={<PlaceholderPage title="Profile" />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
