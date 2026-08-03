export type UserRole = 'student' | 'teacher' | 'parent';

export type SocialProvider = 'google';

export interface UserRoleOption {
  value: UserRole;
  label: string;
  description: string;
}
