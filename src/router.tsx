import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import pages
import AppContent from "./components/AppContent";
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import History from "./pages/History";
import Contact from "./pages/Contact";
import ReturnPolicy from "./pages/ReturnPolicy";

function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <Portal />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/" element={<AppContent />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route
            path="/terms-of-service"
            element={
              <div className="p-10">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                  Terms of Service
                </h1>
                <p>Terms of Service content goes here.</p>
              </div>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <div className="p-10">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                  Privacy Policy
                </h1>
                <p>Privacy Policy content goes here.</p>
              </div>
            }
          />

          {/* Catch-all route for unrecognized paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRouter;
