import { createContext, useContext, useState, useEffect } from "react";
import { tryLogin, trySignup, fetchProfile } from "../api/auth.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // On mount, try to restore the session usng stored token
  useEffect(() => {
    async function restoreSession() {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const profile = await fetchProfile(storedToken);
        setUser(profile);
        setToken(storedToken);
      } catch (error) {
        console.warn("Session restore failed:", error.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await tryLogin(email, password);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ firstName, lastName, email, password }) => {
    setLoading(true);
    try {
      const response = await trySignup({
        firstName,
        lastName,
        email,
        password,
      });
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
