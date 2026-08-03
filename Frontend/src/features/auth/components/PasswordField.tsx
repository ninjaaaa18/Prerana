import React from 'react';
import { Input, type InputProps } from '@/components/ui/input';

export type PasswordFieldProps = Omit<InputProps, 'type' | 'variantType'>;

export const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  return <Input variantType="password" {...props} />;
};
