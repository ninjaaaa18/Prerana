import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface AuthFooterProps {
  prompt?: string;
  ctaText: string;
  ctaTo: string;
  className?: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ prompt, ctaText, ctaTo, className }) => {
  return (
    <p className={cn('text-center text-sm text-slate-400', className)}>
      {prompt && <span>{prompt} </span>}
      <Link
        to={ctaTo}
        className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
      >
        {ctaText}
      </Link>
    </p>
  );
};
