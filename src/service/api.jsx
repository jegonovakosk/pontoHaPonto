// src/api.js
import axios from "axios";

// Cria a instância do Axios com a baseURL configurada
const api = axios.create({
  baseURL: "https://back-netlify-ponto.onrender.com/", // URL da API
});

// Interceptor de requisição para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    // Supondo que o token esteja armazenado no localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Lida com erros de requisição
    return Promise.reject(error);
  }
);

// Interceptor de resposta para tratar erros
api.interceptors.response.use(
  (response) => {
    // Qualquer código de status dentro do intervalo de 2xx cai nesta função
    return response;
  },
  (error) => {
    // Qualquer código de status fora do intervalo de 2xx cai nesta função
    if (error.response) {
      // Erros de resposta do servidor
      const { status, data } = error.response;

      // Tratar diferentes tipos de erros com base no status
      switch (status) {
        case 401: // Não autorizado
          console.error("Não autorizado. Faça login novamente.");
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          // Podemos redirecionar para a página de login ou fazer logout aqui
          // Por exemplo: window.location.href = '/login';
          break;
        case 403: // Proibido
          console.error("Você não tem permissão para acessar este recurso.");
          break;
        case 404: // Não encontrado
          console.error("Recurso não encontrado.");
          break;
        case 500: // Erro do servidor
          console.error(
            "Erro interno do servidor. Tente novamente mais tarde."
          );
          break;
        default:
          console.error(data.message || "Ocorreu um erro.");
      }
    } else if (error.request) {
      // Erros de requisição, como timeout ou falta de resposta do servidor
      console.error(
        "Nenhuma resposta recebida do servidor. Verifique sua conexão."
      );
    } else {
      // Outros erros
      console.error("Erro:", error.message);
    }

    // Rejeita a promessa com o erro para que a chamada possa lidar com ele
    return Promise.reject(error);
  }
);

export default api;
