import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user,loading  } = useAuth();
  
  if (user === undefined) return null;
  if (loading) return null;
  if (!user) return <Navigate to="/authentication" replace />;

  return children;
}
