
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to appropriate dashboard based on user role
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      // Redirect to login page if not authenticated
      navigate("/login");
    }
  }, [navigate, isAuthenticated, user]);

  return null;
};

export default Index;
