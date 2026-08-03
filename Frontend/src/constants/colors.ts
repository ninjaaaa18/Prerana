export const COLORS = {
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    DEFAULT: '#6366f1',
  },
  accents: {
    emerald: '#10b981',
    amber: '#f59e0b',
    coral: '#ff6b6b',
    sky: '#38bdf8',
    violet: '#8b5cf6',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#38bdf8',
  },
  neutral: {
    background: '#0b0f19',
    card: '#111827',
    border: '#1f2937',
    foreground: '#f8fafc',
    muted: '#94a3b8',
  },
};

export const GALAXY = {
  glow: {
    indigo: { r: 99, g: 102, b: 241 },
    violet: { r: 139, g: 92, b: 246 },
    sky: { r: 56, g: 189, b: 248 },
    pink: { r: 236, g: 72, b: 153 },
  },
  gradients: {
    deepSpace:
      'radial-gradient(120% 120% at 20% 10%, #151a3a 0%, #0b0f19 55%, #070a12 100%)',
    nebulaPurple:
      'radial-gradient(circle at 70% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 60%)',
    nebulaIndigo:
      'radial-gradient(circle at 15% 80%, rgba(99, 102, 241, 0.16) 0%, transparent 60%)',
    nebulaSky:
      'radial-gradient(circle at 85% 70%, rgba(56, 189, 248, 0.1) 0%, transparent 55%)',
    nebulaPink:
      'radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 55%)',
  },
  glass: {
    subtle: 'rgba(255, 255, 255, 0.04)',
    panel: 'rgba(17, 24, 39, 0.55)',
    dark: 'rgba(11, 15, 25, 0.6)',
    border: 'rgba(148, 163, 184, 0.14)',
  },
  overlay: {
    dim: 'rgba(11, 15, 25, 0.6)',
    deep: 'rgba(11, 15, 25, 0.85)',
  },
} as const;
