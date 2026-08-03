import React from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface UserAvatarProps {
  name?: string;
  email?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name = 'Guest',
  email,
  src,
  size = 'sm',
  className,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn('relative', className)}
    >
      <Avatar
        src={src}
        name={name}
        alt={email ? `${name} (${email})` : name}
        size={size}
        status="online"
      />
    </motion.div>
  );
};
