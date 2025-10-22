import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/auth" />;
  return children;
}

export default ProtectedRoute;
