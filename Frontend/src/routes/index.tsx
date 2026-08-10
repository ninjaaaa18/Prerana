import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AppShell } from '@/layouts/AppShell';
import { DashboardLayout } from '@/layouts/DashboardLayout';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const SubjectsPage = lazy(() =>
  import('@/features/subjects/pages/SubjectsPage').then((m) => ({ default: m.SubjectsPage }))
);
const SubjectDetailPage = lazy(() =>
  import('@/features/subjects/pages/SubjectDetailPage').then((m) => ({
    default: m.SubjectDetailPage,
  }))
);
const ChapterDetailPage = lazy(() =>
  import('@/features/subjects/pages/ChapterDetailPage').then((m) => ({
    default: m.ChapterDetailPage,
  }))
);
const AIStudioPage = lazy(() =>
  import('@/features/ai-studio/pages/AIStudioPage').then((m) => ({ default: m.AIStudioPage }))
);
const ChatPage = lazy(() =>
  import('@/features/ai-studio/pages/ChatPage').then((m) => ({ default: m.ChatPage }))
);
const AssessmentsPage = lazy(() =>
  import('@/features/assessments/pages/AssessmentsPage').then((m) => ({
    default: m.AssessmentsPage,
  }))
);
const AssessmentDetailPage = lazy(() =>
  import('@/features/assessments/pages/AssessmentDetailPage').then((m) => ({
    default: m.AssessmentDetailPage,
  }))
);
const AssessmentPlayerPage = lazy(() =>
  import('@/features/assessments/pages/AssessmentPlayerPage').then((m) => ({
    default: m.AssessmentPlayerPage,
  }))
);
const AssessmentResultsPage = lazy(() =>
  import('@/features/assessments/pages/AssessmentResultsPage').then((m) => ({
    default: m.AssessmentResultsPage,
  }))
);
const ProgressPage = lazy(() =>
  import('@/features/progress/pages/ProgressPage').then((m) => ({ default: m.ProgressPage }))
);
const LibraryPage = lazy(() =>
  import('@/features/library/pages/LibraryPage').then((m) => ({ default: m.LibraryPage }))
);
const ResourcePage = lazy(() =>
  import('@/features/library/pages/ResourcePage').then((m) => ({ default: m.ResourcePage }))
);
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
const TeacherDashboard = lazy(() =>
  import('@/features/teach/pages/TeacherDashboard').then((m) => ({ default: m.TeacherDashboard }))
);
const TeachSubjectLibrary = lazy(() =>
  import('@/features/teach/pages/TeachSubjectLibrary').then((m) => ({
    default: m.TeachSubjectLibrary,
  }))
);
const TeachSubjectDetail = lazy(() =>
  import('@/features/teach/pages/TeachSubjectDetail').then((m) => ({
    default: m.TeachSubjectDetail,
  }))
);
const LessonForm = lazy(() =>
  import('@/features/teach/pages/LessonForm').then((m) => ({ default: m.LessonForm }))
);
const ClassList = lazy(() =>
  import('@/features/teach/pages/ClassList').then((m) => ({ default: m.ClassList }))
);
const ClassDetail = lazy(() =>
  import('@/features/teach/pages/ClassDetail').then((m) => ({ default: m.ClassDetail }))
);
const ProgressView = lazy(() =>
  import('@/features/teach/pages/ProgressView').then((m) => ({ default: m.ProgressView }))
);
const AssessmentList = lazy(() =>
  import('@/features/teach/pages/AssessmentList').then((m) => ({ default: m.AssessmentList }))
);
const AssessmentEditor = lazy(() =>
  import('@/features/teach/pages/AssessmentEditor').then((m) => ({ default: m.AssessmentEditor }))
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
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="subjects/:subjectId" element={<SubjectDetailPage />} />
        <Route path="subjects/:subjectId/chapters/:chapterId" element={<ChapterDetailPage />} />
        <Route path="ai-studio" element={<AIStudioPage />} />
        <Route path="ai-studio/chat/:sessionId" element={<ChatPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="library/:resourceId" element={<ResourcePage />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="assessments/:assessmentId" element={<AssessmentDetailPage />} />
        <Route path="assessments/:assessmentId/take" element={<AssessmentPlayerPage />} />
        <Route path="assessments/:assessmentId/results" element={<AssessmentResultsPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="teach" element={<TeacherDashboard />} />
        <Route path="teach/subjects" element={<TeachSubjectLibrary />} />
        <Route path="teach/subjects/:subjectId" element={<TeachSubjectDetail />} />
        <Route path="teach/lessons/new" element={<LessonForm />} />
        <Route path="teach/lessons/:lessonId/edit" element={<LessonForm />} />
        <Route path="teach/classes" element={<ClassList />} />
        <Route path="teach/classes/:classId" element={<ClassDetail />} />
        <Route path="teach/progress" element={<ProgressView />} />
        <Route path="teach/assessments" element={<AssessmentList />} />
        <Route path="teach/assessments/:assessmentId" element={<AssessmentEditor />} />
        <Route path="admin" element={<PlaceholderPage title="Admin Console" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        <Route path="profile" element={<PlaceholderPage title="Profile" />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
