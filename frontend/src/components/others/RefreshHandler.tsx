import { useAuthStore } from "@/store/store";
import { useEffect } from "react";

const RefreshHandler = () => {
  const { isAuthenticated, userRole } = useAuthStore((state) => state);

  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      if (isAuthenticated === true && userRole === "manager") {
        window.location.href = "/manager/view";
      }
      if (isAuthenticated === true && userRole === "engineer") {
        window.location.href = "/engineer/view";
      }
    }
  }, [isAuthenticated, userRole]);

  return <></>;
};

export default RefreshHandler;
