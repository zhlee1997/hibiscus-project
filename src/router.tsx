import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import AppContent from "./components/AppContent";
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import History from "./pages/History";
import Contact from "./pages/Contact";

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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRouter;
