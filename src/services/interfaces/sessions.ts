import { UserRole } from '@lib/db/interfaces';

export interface AuthenticatedUser {
  id: number;
  username: string;
  role: UserRole;
}
