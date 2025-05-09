
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define types for our context
type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  storage: {
    used: number;
    total: number;
    plan: "free" | "pro";
  };
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create mock data for demonstration
const mockAdminUser: User = {
  id: "admin-123",
  name: "Admin User",
  email: "admin@cloudcanvas.com",
  role: "admin",
  storage: {
    used: 5000,
    total: 1000000,
    plan: "pro",
  },
};

const mockRegularUser: User = {
  id: "user-456",
  name: "John Doe",
  email: "john@example.com",
  role: "user",
  storage: {
    used: 2500,
    total: 5000,
    plan: "free",
  },
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for stored user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // For demo purposes, we'll use mock data
    let loggedInUser = null;
    
    if (email === "admin@cloudcanvas.com" && password === "admin") {
      loggedInUser = mockAdminUser;
    } else {
      loggedInUser = mockRegularUser;
    }
    
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
