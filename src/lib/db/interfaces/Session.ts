export class Session {
  id?: number;
  userId: number;
  isActive: boolean;
  expireTimestamp: Date;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
}
