import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';
import { BackgroundLayer } from '@/components/theme/BackgroundLayer';
import { Spinner } from '@/components/ui/spinner';
import { useMediaQuery } from '@/hooks/use-media-query';
import { MEDIA_QUERIES, SIDEBAR_WIDTH } from '@/constants/breakpoints';

export const AppShell: React.FC = () => {
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop);
  const isTabletUp = useMediaQuery(MEDIA_QUERIES.tabletUp);
  const [collapsed, setCollapsed] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const contentPaddingLeft = isTabletUp
    ? isDesktop && !collapsed
      ? SIDEBAR_WIDTH.expanded
      : SIDEBAR_WIDTH.collapsed
    : 0;

  const handleToggleSidebar = () => {
    if (isDesktop) {
      setCollapsed((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-950 text-slate-100">
      <BackgroundLayer />

      <Sidebar collapsed={isDesktop ? collapsed : true} />

      <div
        className="relative z-10 flex min-h-screen flex-col transition-[padding-left] duration-200 ease-in-out"
        style={{ paddingLeft: contentPaddingLeft }}
      >
        <Topbar onToggleSidebar={handleToggleSidebar} />

        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 md:pb-8 lg:px-8 lg:pt-8">
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
      </div>

      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <MobileNav onOpenMore={() => setDrawerOpen(true)} />
    </div>
  );
};
