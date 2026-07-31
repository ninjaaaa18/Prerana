import { Variants, Transition } from 'framer-motion';

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
