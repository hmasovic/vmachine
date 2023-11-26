import { UserRole } from '@lib/db/interfaces';

export interface CreateUserRequestDto {
  username: string;
  password: string;
  role: UserRole;
}

export interface CreateUserResponseDto {
  username: string;
  role: string;
}

export interface LoginUserRequestDto {
  username: string;
  password: string;
}

export interface LoginUserResponseDto {
  token: string;
  expirationDate: Date;
}

export interface GetUserResponseDto {
  id: number;
  username: string;
  role: UserRole;
}

export interface UpdateUserRequestDto {
  username: string;
}

export interface UpdateUserResponseDto {
  id: number;
  username: string;
}
