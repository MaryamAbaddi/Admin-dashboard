import { createContext, useState, useCallback } from "react";
import * as authApi from "../network/api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const signIn = useCallback(async (username, password) => {
    setStatus("loading");
    setError(null);
    try {
      const { token, user } = await authApi.login({ username, password });
      setToken(token);
      setUser(user);
      setStatus("idle");
      return true;
    } catch (err) {
      setError(err.message || "Sign in failed");
      setStatus("error");
      return false;
    }
  }, []);

  const signOut = useCallback(async () => {
    await authApi.logout();
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    status,
    error,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
