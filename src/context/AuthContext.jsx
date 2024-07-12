// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate para redirecionamento
import api from "../service/api"; // Nossa instância do Axios

// Cria o contexto
const AuthContext = createContext();

// Provedor do contexto de autenticação
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false); // Estado para autenticação
  const navigate = useNavigate(); // useNavigate para redirecionar

  // Efeito para verificar a autenticação inicial do usuário
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Aqui você pode adicionar uma lógica para validar o token
      setAuthenticated(true); // Define autenticado como true se o token for válido
    }
    setLoading(false);
  }, []);

  // Função de login
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token } = response.data;
      localStorage.setItem("authToken", access_token);
      setUser(user);
      setAuthenticated(true); // Define autenticado como true após o login
      return user;
    } catch (error) {
      console.error("Erro ao fazer login", error);
      throw error;
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setAuthenticated(false); // Define autenticado como false após o logout
    window.location.href = "/login";
  };

  // Renderiza o componente de login se não estiver autenticado
  if (loading) {
    return <p>Carregando...</p>; // ou um componente de carregamento
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};
