export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

export const MEDIA_QUERIES = {
  mobileDown: `(max-width: ${BREAKPOINTS.mobile - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tabletUp: `(min-width: ${BREAKPOINTS.mobile}px)`,
  desktop: `(min-width: ${BREAKPOINTS.tablet}px)`,
} as const;

export const SIDEBAR_WIDTH = {
  expanded: 256,
  collapsed: 64,
} as const;
