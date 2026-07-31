import React, { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Home, LogIn } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-400">
            <Layout className="w-6 h-6" />
            <span>App</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          Clean Production-Ready Architecture &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};
