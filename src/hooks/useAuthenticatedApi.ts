import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

export function useAuthenticatedApi() {
  const { logout } = useAuth();

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    try {
      const response = await authService.authenticatedRequest(
        endpoint,
        options
      );

      if (response.status === 401) {
        // Token expired or invalid
        await logout();
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("No authentication token")
      ) {
        await logout();
      }
      throw error;
    }
  };

  return { apiCall };
}
