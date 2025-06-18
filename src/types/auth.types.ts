export type AuthResponse = {
  token: string;
};

export type AuthService = {
  email: string;
  password: string;
};

export type RegisterService = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type logoutResponse = {
  message: string;
};