export interface UserRequest {
  id: string;
  username: string;
  email: string;
}

export interface UserQuery {
  email?: string;
}
