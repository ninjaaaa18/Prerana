import { useReducedMotion } from 'framer-motion';

export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
