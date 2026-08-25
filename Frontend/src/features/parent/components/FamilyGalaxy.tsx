import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { cn } from '@/lib/utils';
import { getChildPerformance } from '../data';
import type { Child } from '../types';

export interface FamilyGalaxyProps {
  children: Child[];
  className?: string;
}

const childOrbitMap = [
  { id: 'child-aadhya', position: { left: '50%', top: '16%' }, size: 138, ring: true },
  { id: 'child-reyansh', position: { left: '19%', top: '58%' }, size: 126, ring: false },
  { id: 'child-kavya', position: { left: '81%', top: '58%' }, size: 118, ring: false },
];

const statusLabel: Record<string, string> = {
  ahead: 'Ahead',
  'on-track': 'On track',
  'at-risk': 'Needs support',
};

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length === 1) return name.slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

export const FamilyGalaxy: React.FC<FamilyGalaxyProps> = ({ children, className }) => {
  return (
    <Reveal y={16}>
      <section
        aria-label="Family learning galaxy"
        className={cn(
          'relative overflow-hidden rounded-[32px] border border-violet-500/15 bg-slate-950/60 px-4 py-6 shadow-[0_25px_80px_rgba(15,23,42,0.7)] backdrop-blur-md sm:px-6 lg:px-8 lg:py-8',
          className
        )}
      >
        <GalaxyGlow color="violet" x="18%" y="-12%" size={420} opacity={0.14} />
        <GalaxyGlow color="sky" x="82%" y="85%" size={340} opacity={0.09} />
        <GalaxyGlow color="pink" x="64%" y="22%" size={260} opacity={0.08} />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-lg space-y-4 md:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-violet-200">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Learning Galaxy
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                Your Family
                <span className="mt-1 block bg-gradient-to-r from-violet-300 via-violet-200 to-sky-200 bg-clip-text text-transparent">
                  Mission Control
                </span>
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
                Every child is moving through their own learning orbit. Keep the whole family aligned.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="lg">
                {children.length} active learners
              </Badge>
              <Badge variant="info" size="lg">
                Family growth
              </Badge>
            </div>
          </div>

          <div className="relative h-[340px] w-full max-w-[620px] sm:h-[420px]">
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/25 bg-[radial-gradient(circle,_rgba(168,85,247,0.38),_rgba(15,23,42,0.82)_62%,_rgba(15,23,42,0.2)_100%)] shadow-[0_0_110px_rgba(168,85,247,0.38)] sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px]">
              <div className="absolute inset-[18%] rounded-full border border-violet-300/20 bg-slate-950/75 shadow-[inset_0_0_52px_rgba(168,85,247,0.15)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-200/80">
                  Family
                </p>
                <p className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {children.length}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  orbiting learners
                </p>
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 h-[315px] w-[315px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/15 sm:h-[380px] sm:w-[380px] lg:h-[430px] lg:w-[430px]" />
            <div className="absolute left-1/2 top-1/2 h-[245px] w-[245px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/10 sm:h-[300px] sm:w-[300px] lg:h-[350px] lg:w-[350px]" />

            {children.map((child, index) => {
              const performance = getChildPerformance(child.id);
              const orbit = childOrbitMap[index] ?? childOrbitMap[0];
              const status = performance ? statusLabel[performance.status] : 'On track';
              const planetSize = orbit.size;

              return (
                <Link
                  key={child.id}
                  to={`/app/parent/children/${child.id}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none motion-safe:transition-all motion-reduce:transition-none"
                  style={{
                    left: orbit.position.left,
                    top: orbit.position.top,
                    width: `${planetSize + 26}px`,
                  }}
                  aria-label={`Open ${child.name} learning profile`}
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div
                      className={cn(
                        'relative flex items-center justify-center overflow-visible rounded-full border border-white/15 bg-slate-950/30 shadow-[0_0_35px_rgba(15,23,42,0.7)] motion-safe:transition-all motion-reduce:transition-none group-hover:scale-[1.03] group-focus-visible:scale-[1.03] group-focus-visible:ring-2 group-focus-visible:ring-violet-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-slate-950',
                        'group-hover:shadow-[0_0_48px_rgba(168,85,247,0.42)]'
                      )}
                      style={{
                        width: `${planetSize}px`,
                        height: `${planetSize}px`,
                        background: `radial-gradient(circle at 29% 24%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.18) 11%, transparent 20%), radial-gradient(circle at 36% 34%, ${child.color} 0%, ${child.color}cc 42%, rgba(15,23,42,0.96) 78%), ${child.color}`,
                        boxShadow: `inset -20px -24px 28px rgba(2,6,23,0.74), inset 12px 10px 18px rgba(255,255,255,0.16), 0 0 0 1px ${child.color}55, 0 0 32px ${child.color}35`,
                      }}
                    >
                      {orbit.ring && (
                        <>
                          <div
                            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
                            style={{
                              width: `${planetSize * 1.92}px`,
                              height: `${planetSize * 0.68}px`,
                              transform: 'translate(-50%, -50%) rotate(-18deg)',
                              clipPath: 'polygon(0 0, 100% 0, 100% 51%, 0 51%)',
                              border: '2px solid rgba(226,232,240,0.42)',
                              boxShadow: '0 0 20px rgba(196,181,253,0.2)',
                            }}
                            aria-hidden="true"
                          >
                            <div className="absolute inset-[12%] rounded-full border border-violet-100/25" />
                            <div className="absolute inset-[25%] rounded-full border border-white/15" />
                          </div>
                          <div
                            className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
                            style={{
                              width: `${planetSize * 1.92}px`,
                              height: `${planetSize * 0.68}px`,
                              transform: 'translate(-50%, -50%) rotate(-18deg)',
                              clipPath: 'polygon(0 49%, 100% 49%, 100% 100%, 0 100%)',
                              border: '2px solid rgba(248,250,252,0.62)',
                              boxShadow: '0 0 18px rgba(196,181,253,0.26), inset 0 0 8px rgba(255,255,255,0.18)',
                            }}
                            aria-hidden="true"
                          >
                            <div className="absolute inset-[12%] rounded-full border border-violet-100/30" />
                            <div className="absolute inset-[25%] rounded-full border border-white/18" />
                          </div>
                        </>
                      )}

                      <div
                        className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-full opacity-80 mix-blend-screen"
                        style={{
                          background: `radial-gradient(ellipse at 62% 20%, rgba(255,255,255,0.22) 0%, transparent 22%), radial-gradient(ellipse at 22% 58%, rgba(255,255,255,0.16) 0%, transparent 19%), radial-gradient(ellipse at 68% 72%, rgba(2,6,23,0.32) 0%, transparent 24%)`,
                        }}
                        aria-hidden="true"
                      />

                      <div
                        className="pointer-events-none absolute inset-[-10%] z-10 rounded-full opacity-55"
                        style={{
                          background: `repeating-linear-gradient(162deg, transparent 0 13%, rgba(255,255,255,0.12) 14% 18%, transparent 19% 27%, rgba(2,6,23,0.16) 28% 33%, transparent 34% 46%)`,
                          transform: 'rotate(-12deg) scale(1.12)',
                        }}
                        aria-hidden="true"
                      />

                      <div
                        className="pointer-events-none absolute inset-[-4%] z-10 rounded-full opacity-70"
                        style={{
                          background: `radial-gradient(ellipse at 72% 42%, transparent 0 28%, rgba(2,6,23,0.26) 52%, rgba(2,6,23,0.7) 78%), radial-gradient(circle at 24% 20%, rgba(255,255,255,0.32), transparent 25%)`,
                        }}
                        aria-hidden="true"
                      />

                      <div
                        className="pointer-events-none absolute inset-0 z-10 rounded-full border border-white/20"
                        style={{
                          boxShadow: `inset 7px 5px 9px rgba(255,255,255,0.25), inset -10px -12px 14px rgba(2,6,23,0.68), 0 0 14px ${child.color}45`,
                        }}
                        aria-hidden="true"
                      />

                      <div
                        className="pointer-events-none absolute left-[17%] top-[15%] z-10 h-[18%] w-[22%] rotate-[-24deg] rounded-full bg-white/45 blur-[2px]"
                        aria-hidden="true"
                      />

                      <div className="relative z-10 flex h-full w-full items-center justify-center text-[clamp(0.7rem,1vw+0.45rem,1rem)] font-black tracking-[0.2em] text-slate-100/65 opacity-70 drop-shadow-[0_1px_3px_rgba(2,6,23,0.8)]">
                        {getInitials(child.name)}
                      </div>
                    </div>

                    <div className="space-y-1 text-center">
                      <p className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
                        {child.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                        {child.grade}
                      </p>
                      <Badge variant={performance?.status === 'at-risk' ? 'warning' : performance?.status === 'ahead' ? 'primary' : 'info'} size="sm">
                        {status}
                      </Badge>
                    </div>
                  </div>
                </Link>
              );
            })}

            <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full border border-violet-500/20 bg-slate-950/70 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-violet-200">
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              Next mission
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
