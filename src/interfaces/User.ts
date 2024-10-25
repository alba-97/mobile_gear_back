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

export interface IUserQuery {
  username?: string;
  email?: string;
  is_admin?: boolean;
  first_name?: string;
  last_name?: string;
  birth_date?: Date;
  dni?: number;
}
