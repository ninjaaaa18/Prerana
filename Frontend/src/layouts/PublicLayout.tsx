import React, { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LogIn, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '@/components/layout/Logo';
import { Spinner } from '@/components/ui/spinner';
import { buttonVariants } from '@/components/ui/button';
import { BackgroundLayer } from '@/components/theme/BackgroundLayer';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Subjects', to: '/app/subjects' },
  { label: 'Mind Maps', to: '/app/ai-studio' },
  { label: 'Assessments', to: '/app/assessments' },
  { label: 'Progress', to: '/app/progress' },
  { label: 'Library', to: '/app/library' },
];

const linkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60';

export const PublicLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <BackgroundLayer />

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className={cn(buttonVariants({ variant: 'primary', size: 'default' }), 'hidden md:inline-flex')}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="public-mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800/70 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="public-mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-slate-800 bg-slate-950/95 md:hidden"
            >
              <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6 lg:px-8">
                {NAV_LINKS.map((link) => (
                  <Link key={link.to} to={link.to} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white">
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/login"
                  className={cn(buttonVariants({ variant: 'primary', size: 'default' }), 'mt-2 w-full')}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
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

      <footer className="relative border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Logo />
            <p className="text-xs text-slate-500">AI-powered learning. Made beautiful.</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <Link to="/login" className="transition-colors hover:text-white">
              Login
            </Link>
            <Link to="/design-system" className="transition-colors hover:text-white">
              Design System
            </Link>
            <Link to="/app" className="transition-colors hover:text-white">
              Dashboard
            </Link>
          </nav>

          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Prerana
          </p>
        </div>
      </footer>
    </div>
  );
};
