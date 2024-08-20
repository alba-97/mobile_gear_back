export interface User {
  id: number;
  username?: string;
  email: string;
  password: string;
  is_admin: boolean;
  salt?: string;
  createdAt?: Date;
  updatedAt?: Date;
  hash?: (plainPassword: string, salt: string) => Promise<string>;
}
