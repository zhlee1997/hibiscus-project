import { LoginRequest, LoginResponse } from "../types/auth";

class AuthService {
  // private baseURL = "http://localhost:3000/api";
  private baseURL = "http://ec2-44-211-220-155.compute-1.amazonaws.com/api";

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  }

  async logout(): Promise<void> {
    // If you have a logout endpoint, call it here
    // await fetch(`${this.baseURL}/user/logout`, { method: 'POST' });
  }

  // Generic authenticated request helper
  async authenticatedRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const token = this.getStoredToken();

    if (!token) {
      throw new Error("No authentication token available");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    return fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });
  }

  // Token storage methods
  storeToken(token: string, remember: boolean = false): void {
    if (remember) {
      localStorage.setItem("auth_token", token);
    } else {
      sessionStorage.setItem("auth_token", token);
    }
  }

  getStoredToken(): string | null {
    return (
      localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
    );
  }

  removeStoredToken(): void {
    localStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_token");
  }

  // Check if token is expired (basic check - you might want to decode JWT)
  isTokenValid(token: string): boolean {
    if (!token) return false;

    try {
      // Basic check - you might want to decode JWT and check expiration
      const parts = token.split(".");
      return parts.length === 3; // Basic JWT structure check
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();
