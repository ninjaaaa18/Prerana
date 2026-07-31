import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconName = keyof typeof LucideIcons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
  spin?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  className,
  spin = false,
  ...props
}) => {
  const IconComponent = (LucideIcons[name] || LucideIcons.HelpCircle) as React.FC<LucideIcons.LucideProps>;

  return (
    <IconComponent
      size={size}
      className={cn(spin && 'animate-spin', className)}
      {...props}
    />
  );
};
