import type { JSX } from "react";
import { useAuthStore } from "../../store/store";
import { Navigate } from "react-router-dom";

type PrivateElementProps = {
  element: JSX.Element;
};

const PrivateElement = ({ element }: PrivateElementProps) => {
  const { isAuthenticated } = useAuthStore((state) => state);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateElement;
