import axios from "axios";
import {
  ACCESS_TOKEN,
  BASE_URL,
  SIGN_IN_URL,
  SIGN_UP_URL,
  TODO_URL,
} from "./constant";
import {
  CreateTodoRequest,
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
  Todo,
  UpdateTodoRequest,
} from "./type";

const config = {
  headers: { "Content-Type": "application/json" },
  baseURL: BASE_URL,
};
const configWithToken = (accessToken: string | null) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: accessToken === null ? "" : `Bearer ${accessToken}`,
  },
  baseURL: BASE_URL,
});

export const signup = (payload: SignupRequest) =>
  axios.post<SignupResponse>(SIGN_UP_URL, payload, config);

export const signin = (payload: SigninRequest) =>
  axios.post<SigninResponse>(SIGN_IN_URL, payload, config);

export const createTodo = (payload: CreateTodoRequest) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.post<Todo>(TODO_URL, payload, configWithToken(accessToken));
};
export const getTodos = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get<Todo[]>(TODO_URL, configWithToken(accessToken));
};
export const updateTodo = (id: number, payload: UpdateTodoRequest) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.put<Todo>(
    `${TODO_URL}/${id}`,
    payload,
    configWithToken(accessToken)
  );
};
export const deleteTodo = (id: number) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.delete(`${TODO_URL}/${id}`, configWithToken(accessToken));
};
