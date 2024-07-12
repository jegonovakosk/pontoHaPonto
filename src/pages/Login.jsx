// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { Box, Heading, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError("Credenciais inválidas. Por favor, tente novamente.");
      console.error("Erro ao fazer login", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      p={4}
    >
      <Box
        p={8}
        maxWidth="400px"
        width="100%"
        borderRadius="md"
        boxShadow="md" // Aplicando sombra para o card
        bg="gray.700" // Cor de fundo do card
      >
        <Heading mb={6} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            mb={4}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mb={4}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit" colorScheme="teal" width="100%">
            Entrar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
