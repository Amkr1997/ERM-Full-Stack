import { useAuthStore } from "@/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectView = () => {
  const { isAuthenticated, userRole } = useAuthStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (userRole === "manager") {
      navigate("/manager/view");
    } else if (userRole === "engineer") {
      navigate("/engineer/view");
    } else {
      navigate("/login");
    }
  }, [userRole, isAuthenticated, navigate]);

  return null;
};

export default RedirectView;
