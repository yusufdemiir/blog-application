import { API } from './_api';

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginApiResponse<T = any> {
  success: boolean;
  message?: string;
  token: string;
}

export async function signUp(payload: SignUpPayload) {
  const { data } = await API.post<ApiResponse>('/auth/signup', payload);
  return data;
}

export async function login(payload: LoginPayload) {
  const { data } = await API.post<LoginApiResponse>('/auth/login', payload);
  return data;
}