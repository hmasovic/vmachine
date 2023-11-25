import { UserRole } from '@lib/db/interfaces';

export interface AuthenticatedUser {
  username: string;
  role: UserRole;
}
