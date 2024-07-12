// src/context/AuthContext.jsx
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthenticated(true);
      // Opcionalmente, você pode buscar os dados do usuário aqui
      // fetchUser();
    }
    setLoading(false);
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get("/auth/user");
      setUser(response.data);
      setAuthenticated(true);
    } catch (error) {
      console.error("Erro ao buscar usuário", error);
      logout();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token, user } = response.data;
      localStorage.setItem("authToken", access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      setUser(user);
      setAuthenticated(true);
      setError(null);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login", error);
      setError("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, authenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
