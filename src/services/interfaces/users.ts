import { UserRole } from '@lib/db/interfaces';

export interface NewUserInfo {
  username: string;
  password: string;
  role: UserRole;
}

export interface UserLoginMetadata {
  token: string;
  expirationDate: Date;
}
