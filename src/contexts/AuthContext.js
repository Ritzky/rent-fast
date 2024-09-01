// src/contexts/AuthContext.js

import { createContext, useContext, useState } from "react";
import convex from "../convexClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = convex.mutation("signup");
  const login = convex.mutation("login"); // Implement a login function similarly to signup

  const handleSignup = async (email, password, firstName, lastName, phoneNumber) => {
    const response = await signup({ email, password, firstName, lastName, phoneNumber });
    setUser(response.userId);
  };

  // Implement handleLogin similarly

  return (
    <AuthContext.Provider value={{ user, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
