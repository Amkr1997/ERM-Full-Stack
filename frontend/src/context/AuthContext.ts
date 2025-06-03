import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
  useEffect,
} from "react";
const API_URL = import.meta.env.VITE_API_URL_LOCAL;

// User type based on your backend
interface User {
  name: string;
  email: string;
  role: "engineer" | "manager";
}

// Context value type
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider : React.FC<AuthProviderProps> ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string, role: string) => {
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Assuming response = { user: {...}, token: "jwtToken" }

      console.log(data);
      setUser(data.user);
      setToken(data.token);
      // Optional: save to localStorage for persistence
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
    } catch (error) {
      console.error("Login error:", error);
      throw error; // rethrow so UI can handle
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("authUser");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// Hook for consuming the auth context safely
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
