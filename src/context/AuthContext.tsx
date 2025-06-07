import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { AuthState, User, UserResponse } from "../types/auth";
import { authService } from "../services/authService";

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "RESTORE_SESSION"; payload: { user: User; token: string } }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "RESTORE_SESSION":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on app load
  useEffect(() => {
    const token = authService.getStoredToken();

    if (token && authService.isTokenValid(token)) {
      // In a real app, you might want to verify the token with the server
      // For now, we'll extract user info from the stored token or make an API call
      const user: User = {
        email: "user@example.com", // You might decode this from JWT or fetch from API
      };

      dispatch({
        type: "RESTORE_SESSION",
        payload: { user, token },
      });
    }
  }, []);

  const login = async (email: string, password: string, remember = false) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await authService.login({
        username: email,
        password,
      });

      if (response.success) {
        authService.storeToken(response.token, remember);

        // TODO: CALL GET USER AUTH DATA API (With token)
        const response2 = await authService.authenticatedRequest(
          "/user/authdata"
        );

        if (!response2.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData: UserResponse = await response2.json();
        console.log("userData" + userData.query.email);

        const user: User = {
          email: userData.query.email,
          username: userData.query.username,
          fullName: userData.query.first_name,
          // + " " + userData.query.last_name,
          age: 0,
          // TODO: phoneNumber: userData.query.phone_number,
          phoneNumber: "",
          // TODO: wechatId: userData.query.wechat_id,
          wechatId: "",
          // TODO: profilePicture: userData.query.profile_picture,
          profilePicture: "",
          created_at: userData.query.created_at,
        };

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token: response.token },
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error instanceof Error ? error.message : "Login failed",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      authService.removeStoredToken();
      dispatch({ type: "LOGOUT" });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
