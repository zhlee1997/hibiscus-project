export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
}

export interface UserResponse {
  query: {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    member_status: string;
    stripe_customer_id: string;
    stripe_subscription_id: string;
    last_login_at: string;
    created_at: string;
    updated_at: string;
  };
  success: boolean;
}

export interface User {
  email: string;
  username: string;
  fullName: string;
  age: number;
  phoneNumber: string;
  wechatId: string;
  profilePicture?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
