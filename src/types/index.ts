export interface AuthState {
  authenticated: boolean;
  user_info: any;
  login: (data: { authenticated: boolean, user_info: any }) => void;
  logout: () => void;
}