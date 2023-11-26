export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
}

export class User {
  id?: number;
  username: string;
  password: string;
  deposit: number;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
