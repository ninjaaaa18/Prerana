import type { CSSProperties } from 'react';
import { GALAXY } from '@/constants/colors';
import { cn } from '@/lib/utils';

export type GlowColor = keyof typeof GALAXY.glow;
export type GlowIntensity = 'sm' | 'md' | 'lg';
export type GlassLevel = 'subtle' | 'panel' | 'bright';

const glowClasses: Record<GlowColor, Record<GlowIntensity, string>> = {
  indigo: {
    sm: 'shadow-[0_0_12px_rgba(99,102,241,0.35)]',
    md: 'shadow-[0_0_24px_rgba(99,102,241,0.55)]',
    lg: 'shadow-[0_0_48px_rgba(99,102,241,0.75)]',
  },
  violet: {
    sm: 'shadow-[0_0_12px_rgba(139,92,246,0.35)]',
    md: 'shadow-[0_0_24px_rgba(139,92,246,0.55)]',
    lg: 'shadow-[0_0_48px_rgba(139,92,246,0.75)]',
  },
  sky: {
    sm: 'shadow-[0_0_12px_rgba(56,189,248,0.3)]',
    md: 'shadow-[0_0_24px_rgba(56,189,248,0.5)]',
    lg: 'shadow-[0_0_48px_rgba(56,189,248,0.7)]',
  },
  pink: {
    sm: 'shadow-[0_0_12px_rgba(236,72,153,0.3)]',
    md: 'shadow-[0_0_24px_rgba(236,72,153,0.5)]',
    lg: 'shadow-[0_0_48px_rgba(236,72,153,0.7)]',
  },
};

const glassClasses: Record<GlassLevel, string> = {
  subtle: 'bg-white/[0.04] border border-white/10 backdrop-blur-sm',
  panel: 'bg-slate-900/50 border border-slate-700/60 backdrop-blur-md',
  bright: 'bg-white/10 border border-white/15 backdrop-blur-lg',
};

const blurClasses: Record<GlowIntensity, string> = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
};

export const glowShadow = (color: GlowColor = 'indigo', intensity: GlowIntensity = 'md'): string =>
  cn(glowClasses[color][intensity]);

export const accentGlow = (color: GlowColor = 'indigo'): string => glowShadow(color, 'md');

export const glassSurface = (level: GlassLevel = 'panel'): string => cn(glassClasses[level]);

export const blurSurface = (intensity: GlowIntensity = 'md'): string => blurClasses[intensity];

export const galaxyGradient = (name: keyof typeof GALAXY.gradients): CSSProperties['background'] =>
  GALAXY.gradients[name];
