export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';
export type RegistrationRole = Exclude<UserRole, 'admin'>;

export type SocialProvider = 'google';

export interface UserRoleOption {
  value: RegistrationRole;
  label: string;
  description: string;
}
