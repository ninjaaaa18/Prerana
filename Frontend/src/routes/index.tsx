import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AppShell } from '@/layouts/AppShell';
import { DashboardLayout } from '@/layouts/DashboardLayout';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
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
