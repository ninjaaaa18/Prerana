import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Shield,
  Layers,
  Heart,
  Palette,
  Info,
  Mail,
  User,
  RefreshCw,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, FeatureCard, StatsCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Modal } from '@/components/ui/modal';
import { Dialog } from '@/components/ui/dialog';
import { Tooltip } from '@/components/ui/tooltip';
import { Dropdown } from '@/components/ui/dropdown';
import { Tabs } from '@/components/ui/tabs';
import { Accordion } from '@/components/ui/accordion';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { useToast } from '@/components/ui/toast';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { cn } from '@/lib/utils';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';
import { TYPOGRAPHY } from '@/constants/typography';
import {
  fadeInVariants,
  slideUpVariants,
  scaleUpVariants,
  hoverScale,
  pressScale,
  cardLiftVariants,
  pageTransitionVariants,
} from '@/constants/animations';

const getContrastText = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? 'text-slate-900' : 'text-white';
};

const PageTransitionDemo: React.FC = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" onClick={() => setVisible((prev) => !prev)}>
        {visible ? 'Exit' : 'Enter'}
      </Button>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key="panel"
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300"
          >
            Transition Panel
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DesignSystemPage: React.FC = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState('react');
  const [currentPage, setCurrentPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const replayAnimations = () => setAnimKey((key) => key + 1);

  return (
    <Container size="xl" className="py-10 space-y-16">
      {/* Page Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
        className="space-y-4 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Prerana Design System v1.0</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Frontend Design System
        </h1>
        <p className="text-slate-400 text-base">
          A bright, modern, child-friendly visual language with production-ready reusable components built with React
          19, Tailwind CSS v4, and Framer Motion.
        </p>
      </motion.div>

      {/* 1. Theme Tokens & Colors */}
      <section className="space-y-6">
        <SectionHeader
          title="Color Palette Tokens"
          subtitle="Bright, harmonious colors designed for child-friendly engagement and professional UI hierarchy."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(COLORS.primary)
            .filter(([key]) => key !== 'DEFAULT')
            .map(([shade, hex]) => (
              <div
                key={shade}
                style={{ backgroundColor: hex }}
                className={cn(
                  'p-4 rounded-xl space-y-2 shadow-soft border border-white/10',
                  getContrastText(hex)
                )}
              >
                <div className="text-xs font-bold uppercase tracking-wider opacity-90">Brand {shade}</div>
                <div className="text-sm font-mono opacity-90">{hex}</div>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Object.entries(COLORS.accents).map(([name, hex]) => (
            <div
              key={name}
              style={{ backgroundColor: hex }}
              className={cn(
                'p-4 rounded-xl space-y-2 shadow-soft border border-white/10',
                getContrastText(hex)
              )}
            >
              <div className="text-xs font-bold uppercase tracking-wider opacity-90">{name} Accent</div>
              <div className="text-sm font-mono opacity-90">{hex}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(COLORS.neutral).map(([name, hex]) => (
            <div
              key={name}
              style={{ backgroundColor: hex }}
              className={cn(
                'p-4 rounded-xl space-y-1 border border-slate-700/50 min-w-36',
                getContrastText(hex)
              )}
            >
              <div className="text-xs font-bold uppercase tracking-wider opacity-90">{name}</div>
              <div className="text-xs font-mono opacity-90">{hex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography */}
      <section className="space-y-6">
        <SectionHeader
          title="Typography System"
          subtitle="Dual-font architecture: Fredoka for cheerful display headings & Poppins for clean body text."
        />
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4">
              Display Font — Fredoka
            </div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-slate-100">
              The Quick Brown Fox Jumps Over The Lazy Dog
            </p>
          </div>
          <div className="border-t border-slate-800 pt-6">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4">
              Primary Font — Poppins
            </div>
            <p className="font-primary text-base text-slate-300 leading-relaxed">
              Prerana empowers learners with engaging, interactive experiences built on modern component architecture
              and accessible design principles.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 border-t border-slate-800 pt-6">
            {Object.entries(TYPOGRAPHY.sizes).map(([name, size]) => (
              <div key={name} className="flex items-baseline justify-between gap-4">
                <span className="text-xs font-semibold text-slate-500 w-24">text-{name}</span>
                <span style={{ fontSize: size }} className="font-primary text-slate-100">
                  {size}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-slate-800 pt-6">
            {Object.entries(TYPOGRAPHY.weights).map(([name, weight]) => (
              <div key={name} className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">{name}</span>
                <span style={{ fontWeight: weight }} className="text-xl font-primary text-slate-100">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Buttons */}
      <section className="space-y-6">
        <SectionHeader
          title="Buttons"
          subtitle="Interactive motion buttons with multiple variants, sizes, icon slots, and loading states."
        />
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" leftIcon={<Zap className="w-4 h-4" />}>
              Primary Button
            </Button>
            <Button variant="secondary" leftIcon={<Layers className="w-4 h-4" />}>
              Secondary Button
            </Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive" leftIcon={<Heart className="w-4 h-4" />}>
              Destructive
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 items-center border-t border-slate-800 pt-4">
            <Button size="sm" variant="primary">
              Small
            </Button>
            <Button size="default" variant="primary">
              Default Size
            </Button>
            <Button size="lg" variant="primary">
              Large Button
            </Button>
            <Button size="icon" variant="outline" aria-label="Palette">
              <Palette className="w-4 h-4" />
            </Button>
            <Button variant="primary" isLoading>
              Loading State
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Form Inputs */}
      <section className="space-y-6">
        <SectionHeader
          title="Form Inputs & Textarea"
          subtitle="Text inputs with password visibility toggle, search icons, error messages, and textareas."
        />
        <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <Input
            label="Email Address"
            placeholder="user@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            helperText="We will never share your email."
          />
          <Input
            label="Password"
            variantType="password"
            placeholder="••••••••"
            leftIcon={<User className="w-4 h-4" />}
          />
          <Input
            label="Search Records"
            variantType="search"
            placeholder="Search topics, modules, or users..."
          />
          <Input
            label="Input with Error"
            placeholder="Invalid value..."
            error="Please provide a valid username."
          />
          <div className="md:col-span-2">
            <Textarea
              label="Bio / Notes"
              placeholder="Write a brief summary..."
              helperText="Maximum 500 characters."
            />
          </div>
        </div>
      </section>

      {/* 5. Cards */}
      <section className="space-y-6">
        <SectionHeader
          title="Cards"
          subtitle="Basic, Feature, and Stats cards with Framer Motion hover elevation."
        />
        <div className="grid md:grid-cols-3 gap-6">
          <Card isHoverable className="space-y-3">
            <Badge variant="primary">Basic Card</Badge>
            <h3 className="text-lg font-bold font-display text-slate-100">Card Header Title</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standard container for grouping related content with subtle border styling and hover elevation.
            </p>
          </Card>

          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Interactive Learning"
            description="Child-friendly design tokens and interactive feedback states."
            badgeText="Featured"
          />

          <StatsCard
            title="Active Learners"
            value="14,290"
            change="18.5%"
            isPositive
            icon={<Sparkles className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* 6. Badges, Avatars, Progress & Loaders */}
      <section className="space-y-6">
        <SectionHeader
          title="Badges, Avatars, Progress & Loaders"
          subtitle="Status badges, avatar initial fallbacks, animated progress bars, and loaders."
        />
        <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Status Badges</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" dot>
                Primary
              </Badge>
              <Badge variant="success" dot>
                Completed
              </Badge>
              <Badge variant="warning" dot>
                Pending
              </Badge>
              <Badge variant="destructive" dot>
                Failed
              </Badge>
              <Badge variant="info">Info Badge</Badge>
              <Badge variant="secondary">Secondary</Badge>
            </div>

            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider pt-2">
              Avatars & Status Indicators
            </h4>
            <div className="flex items-center gap-4">
              <Avatar name="Alex Morgan" size="sm" status="online" />
              <Avatar name="Brendan Eich" size="md" status="busy" />
              <Avatar name="Clara Oswald" size="lg" status="away" />
              <Avatar name="David Tennant" size="xl" status="offline" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Progress Indicators</h4>
            <ProgressBar value={72} showValue variant="emerald" />
            <div className="flex items-center gap-6 pt-2">
              <ProgressRing value={85} size={70} color="#10b981" />
              <ProgressRing value={45} size={70} color="#6366f1" />
              <div className="flex items-center gap-3">
                <Spinner size="lg" variant="primary" />
                <span className="text-sm text-slate-400">Loading spinner...</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Skeleton Loader Placeholder
            </h4>
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" width={48} height={48} />
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Modals, Dialogs, Dropdown & Tooltips */}
      <section className="space-y-6">
        <SectionHeader
          title="Modals, Dialogs, Dropdown & Tooltips"
          subtitle="Interactive overlay components with keyboard navigation and Framer Motion backdrops."
        />
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <Button variant="destructive" onClick={() => setIsDialogOpen(true)}>
              Open Confirmation Dialog
            </Button>

            <Tooltip content="Tooltip message above element" position="top">
              <Button variant="outline">Hover Tooltip</Button>
            </Tooltip>
          </div>

          <div className="max-w-sm pt-2">
            <Dropdown
              label="Select Framework"
              options={[
                { label: 'React 19', value: 'react', icon: <Sparkles className="w-4 h-4 text-indigo-400" /> },
                { label: 'TypeScript', value: 'ts', icon: <Shield className="w-4 h-4 text-sky-400" /> },
                { label: 'Tailwind CSS v4', value: 'tw', icon: <Palette className="w-4 h-4 text-emerald-400" /> },
              ]}
              value={selectedDropdown}
              onChange={setSelectedDropdown}
            />
          </div>
        </div>
      </section>

      {/* 8. Tabs, Accordion, Breadcrumb & Pagination */}
      <section className="space-y-6">
        <SectionHeader
          title="Tabs, Accordion, Breadcrumb & Pagination"
          subtitle="Structured content navigation and expandable card lists."
        />
        <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Tabs Component</h4>
            <Tabs
              tabs={[
                {
                  id: 'overview',
                  label: 'Overview',
                  icon: <Info className="w-4 h-4" />,
                  content: (
                    <p className="text-sm text-slate-400">Overview panel with tab indicator transition.</p>
                  ),
                },
                {
                  id: 'features',
                  label: 'Features',
                  icon: <Zap className="w-4 h-4" />,
                  content: (
                    <p className="text-sm text-slate-400">
                      Feature list demonstrating modular architecture.
                    </p>
                  ),
                },
              ]}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Accordion Component</h4>
            <Accordion
              items={[
                {
                  id: 'acc-1',
                  title: 'What is Phase 1 Design System?',
                  content:
                    'Phase 1 provides a centralized library of design tokens, fonts, and 20+ reusable UI components.',
                },
                {
                  id: 'acc-2',
                  title: 'Is it fully accessible & responsive?',
                  content:
                    'Yes, all components support keyboard navigation, ARIA attributes, and responsive breakpoints.',
                },
              ]}
            />
          </div>

          <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <Breadcrumb
              items={[
                { label: 'Dashboard', href: '#' },
                { label: 'Design System', isCurrent: true },
              ]}
            />
            <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
          </div>
        </div>
      </section>

      {/* 9. Toasts, Empty State & Error State */}
      <section className="space-y-6">
        <SectionHeader
          title="Feedback: Toasts, Empty State & Error State"
          subtitle="System feedback, notification triggers, empty state illustrations, and error banners."
        />
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  title: 'Action Successful',
                  description: 'Your changes have been saved successfully.',
                  variant: 'success',
                })
              }
            >
              Show Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  title: 'Validation Warning',
                  description: 'Please review your inputs before submitting.',
                  variant: 'warning',
                })
              }
            >
              Show Warning Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  title: 'Connection Error',
                  description: 'Unable to reach backend server.',
                  variant: 'error',
                })
              }
            >
              Show Error Toast
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <EmptyState
              title="No Modules Found"
              description="Create a new module to start building course content."
              actionText="Create Module"
              onAction={() =>
                showToast({
                  title: 'Create Module',
                  description: 'Module creation flow ships in a later phase.',
                  variant: 'info',
                })
              }
            />
            <ErrorState
              title="Failed to Load Data"
              message="The server encountered a temporary error."
              onRetry={() =>
                showToast({
                  title: 'Retrying...',
                  description: 'The request will be retried.',
                  variant: 'warning',
                })
              }
            />
          </div>
        </div>
      </section>

      {/* 10. Shadows & Border Radius */}
      <section className="space-y-6">
        <SectionHeader
          title="Shadows & Border Radius"
          subtitle="Elevation utilities for depth and corner radius tokens for friendly, rounded surfaces."
        />
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Subtle', className: 'shadow-subtle' },
              { name: 'Soft', className: 'shadow-soft' },
              { name: 'Glow', className: 'shadow-glow' },
              { name: 'Card Hover', className: 'shadow-card-hover' },
            ].map((shadow) => (
              <div
                key={shadow.name}
                className={cn(
                  'h-28 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center',
                  shadow.className
                )}
              >
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {shadow.name}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Border Radius</h4>
            <div className="flex flex-wrap items-end gap-5">
              {Object.entries(THEME.radius).map(([name, radius]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div
                    style={{ borderRadius: radius }}
                    className="w-16 h-16 bg-indigo-600/80 border border-indigo-400/40"
                  />
                  <span className="text-xs text-slate-400">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Motion & Animations */}
      <section className="space-y-6">
        <SectionHeader
          title="Motion & Animations"
          subtitle="Reusable Framer Motion presets for fade, slide, scale, hover, press, card lift, and page transitions."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={replayAnimations}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Replay
            </Button>
          }
        />
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div key={animKey} className="grid sm:grid-cols-3 gap-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="h-24 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-sm font-semibold text-indigo-300"
            >
              Fade In
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUpVariants}
              className="h-24 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-sm font-semibold text-emerald-300"
            >
              Slide Up
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleUpVariants}
              className="h-24 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sm font-semibold text-sky-300"
            >
              Scale Up
            </motion.div>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-slate-800 pt-6">
            <motion.div
              whileHover={hoverScale}
              whileTap={pressScale}
              className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm font-semibold text-slate-200 cursor-pointer select-none"
            >
              Hover & Press Me
            </motion.div>
            <motion.div
              variants={cardLiftVariants}
              initial="rest"
              whileHover="hover"
              className="px-6 py-3 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 text-sm font-semibold text-slate-200 cursor-pointer select-none"
            >
              Card Lift on Hover
            </motion.div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">Page transition:</span>
              <PageTransitionDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Modals & Dialog Controllers */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reusable Modal Component"
        description="Framer Motion backdrop with smooth scale & fade animations."
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            This modal supports custom content, keyboard ESC closure, and focus trapping.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close Modal
            </Button>
          </div>
        </div>
      </Modal>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          setIsDialogOpen(false);
          showToast({
            title: 'Item Deleted',
            description: 'The selected item was removed.',
            variant: 'error',
          });
        }}
        title="Delete Record?"
        description="Are you sure you want to delete this item? This action cannot be undone."
        variant="destructive"
        confirmText="Delete"
      />
    </Container>
  );
};
