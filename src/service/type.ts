export interface Response<T> {
  status: number;
  statusText: string;
  data: T;
}
export interface SignupRequest {
  email: string;
  password: string;
}
export interface SignupResponse {
  access_token: string;
}
export interface SigninRequest {
  email: string;
  password: string;
}
export interface SigninResponse {
  access_token: string;
}
export interface CreateTodoRequest {
  todo: string;
}
export interface UpdateTodoRequest {
  todo: string;
  isCompleted: boolean;
}
export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
