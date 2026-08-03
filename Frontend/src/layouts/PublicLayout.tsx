import React, { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home, LogIn } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Spinner } from '@/components/ui/spinner';

export const PublicLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="flex items-center gap-4" aria-label="Public">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-white"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-indigo-500"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-24">
              <Spinner size="lg" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/30 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-500">
          Prerana — AI-Powered Learning Platform &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};
