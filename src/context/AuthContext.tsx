import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiRequest, type AuthResponse, type AuthUser, type Transaction } from "../lib/api";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  createTransaction: (
    type: "PIX" | "PAYMENT",
    description: string,
    amount: number
  ) => Promise<Transaction>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const saveSession = useCallback((session: AuthResponse) => {
    setUser(session.user);
    setToken(session.token);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const session = await apiRequest<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      saveSession(session);
    },
    [saveSession]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const session = await apiRequest<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      saveSession(session);
    },
    [saveSession]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const createTransaction = useCallback(
    async (type: "PIX" | "PAYMENT", description: string, amount: number) => {
      if (!token) {
        throw new Error("Sua sessão expirou. Entre novamente.");
      }

      const result = await apiRequest<{
        transaction: Transaction;
        balanceCents: number;
      }>("/transactions", {
        method: "POST",
        token,
        body: JSON.stringify({ type, description, amount }),
      });

      setUser((currentUser) =>
        currentUser ? { ...currentUser, balanceCents: result.balanceCents } : currentUser
      );
      return result.transaction;
    },
    [token]
  );

  const value = useMemo(
    () => ({ user, token, login, register, logout, createTransaction }),
    [user, token, login, register, logout, createTransaction]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }
  return context;
}
