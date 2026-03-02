export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    createdAt: Date;
  };
  token: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    createdAt: Date;
  };
  token: string;
}
