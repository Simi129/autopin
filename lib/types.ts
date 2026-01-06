export type ViewType = 'landing' | 'auth' | 'dashboard';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  full_name?: string;
}