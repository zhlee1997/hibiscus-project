import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/portal");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts or inputs change
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, password, error, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      await login(email, password, remember);
      // Navigation will happen automatically via useEffect when isAuthenticated becomes true
    } catch (error) {
      // Error is handled by the context
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-2xl shadow-2xl border border-pink-100">
        <div className="flex flex-col items-center space-y-2">
          <span className="bg-yellow-200 text-yellow-800 text-sm font-semibold px-5 py-2 rounded-full mb-2 shadow-sm">
            Member Login
          </span>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
            Welcome Back!
          </h2>
        </div>
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-pink-400 focus:border-pink-400 transition sm:text-sm"
                  placeholder="batuhankra312@gmail.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-pink-400 focus:border-pink-400 transition sm:text-sm"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-pink-500 rounded mr-2"
                checked={remember}
                onChange={() => {
                  // setRemember(!remember);
                  window.alert("Function coming soon");
                }}
              />
              Remember me
            </label>
            <Link
              to="#"
              onClick={() => window.alert("Function coming soon")}
              className="text-sm text-pink-500 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition tracking-wider"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
