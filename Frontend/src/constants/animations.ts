import { Variants, Transition, TargetAndTransition } from 'framer-motion';

export const transitionPresets = {
  smooth: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  spring: { type: 'spring', stiffness: 400, damping: 25 },
  bounce: { type: 'spring', stiffness: 500, damping: 15 },
  slow: { duration: 0.4, ease: 'easeInOut' },
} satisfies Record<string, Transition>;

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionPresets.smooth },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: transitionPresets.spring },
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -15 },
  visible: { opacity: 1, y: 0, transition: transitionPresets.spring },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: transitionPresets.spring },
};

export const hoverScale = {
  scale: 1.02,
  transition: transitionPresets.spring,
};

export const pressScale = {
  scale: 0.97,
};

export const cardLiftVariants: Variants = {
  rest: { y: 0, boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.4)' },
  hover: { y: -4, boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.5), 0 0 15px -2px rgba(99, 102, 241, 0.25)' },
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};

// Universe ambient motion — slow, calm, GPU-friendly (transform/opacity only).

export const floatYAnimation: TargetAndTransition = {
  y: [0, -14, 0],
  transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
};

export const driftAnimation: TargetAndTransition = {
  x: [0, 26, 0],
  y: [0, -18, 0],
  transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
};

export const twinkleAnimation: TargetAndTransition = {
  opacity: [0.35, 1, 0.35],
  scale: [0.9, 1.05, 0.9],
  transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
};

export const gentleSpinAnimation: TargetAndTransition = {
  rotate: 360,
  transition: { duration: 80, repeat: Infinity, ease: 'linear' },
};

export const backgroundFadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.4, ease: 'easeOut' } },
};

export const createFloatAnimation = (
  distance = 12,
  duration = 6,
  delay = 0
): TargetAndTransition => ({
  y: [0, -distance, 0],
  transition: { duration, repeat: Infinity, ease: 'easeInOut', delay },
});
