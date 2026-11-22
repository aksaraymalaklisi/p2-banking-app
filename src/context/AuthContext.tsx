import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import {
  ApiError,
  apiRequest,
  type AuthResponse,
  type AuthUser,
  type Transaction,
} from "../lib/api";

const SESSION_TOKEN_KEY = "banking-app-session-token";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  restoreError: string | null;
  clearRestoreError: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(true);
  const [restoreError, setRestoreError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const storedToken =
          Platform.OS === "web" ? null : await SecureStore.getItemAsync(SESSION_TOKEN_KEY);
        if (Platform.OS !== "web" && !storedToken) {
          return;
        }

        const restoredUser = await apiRequest<AuthUser>("/account", {
          token: storedToken ?? undefined,
        });
        if (active) {
          setUser(restoredUser);
          setToken(storedToken);
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          if (Platform.OS !== "web") {
            try {
              await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
            } catch (storageError) {
              console.error("Não foi possível remover a sessão expirada.", storageError);
              if (active) {
                setRestoreError("Não foi possível limpar a sessão salva neste dispositivo.");
              }
            }
          }
          if (active) {
            setUser(null);
            setToken(null);
          }
        } else {
          console.error("Não foi possível restaurar a sessão.", error);
          if (active) {
            setRestoreError(
              error instanceof Error
                ? error.message
                : "Não foi possível validar a sessão salva."
            );
          }
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void restoreSession();
    return () => {
      active = false;
    };
  }, []);

  const saveSession = useCallback(async (session: AuthResponse) => {
    if (Platform.OS !== "web") {
      if (!session.token) {
        throw new Error("A API não retornou o token da sessão.");
      }
      await SecureStore.setItemAsync(SESSION_TOKEN_KEY, session.token);
    }
    setUser(session.user);
    setToken(Platform.OS === "web" ? null : session.token ?? null);
    setRestoreError(null);
  }, []);

  const clearRestoreError = useCallback(() => {
    setRestoreError(null);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const session = await apiRequest<AuthResponse>("/auth/login", {
        method: "POST",
        useCookieSession: Platform.OS === "web",
        body: JSON.stringify({ email, password }),
      });
      await saveSession(session);
    },
    [saveSession]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const session = await apiRequest<AuthResponse>("/auth/register", {
        method: "POST",
        useCookieSession: Platform.OS === "web",
        body: JSON.stringify({ name, email, password }),
      });
      await saveSession(session);
    },
    [saveSession]
  );

  const logout = useCallback(async () => {
    if (Platform.OS === "web") {
      await apiRequest<{ status: string }>("/auth/logout", { method: "POST" });
    } else {
      await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
    }
    setUser(null);
    setToken(null);
    setRestoreError(null);
  }, []);

  const createTransaction = useCallback(
    async (type: "PIX" | "PAYMENT", description: string, amount: number) => {
      if (!token && Platform.OS !== "web") {
        throw new Error("Sua sessão expirou. Entre novamente.");
      }

      const result = await apiRequest<{
        transaction: Transaction;
        balanceCents: number;
      }>("/transactions", {
        method: "POST",
        token: token ?? undefined,
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
    () => ({
      user,
      token,
      isLoading,
      restoreError,
      clearRestoreError,
      login,
      register,
      logout,
      createTransaction,
    }),
    [
      user,
      token,
      isLoading,
      restoreError,
      clearRestoreError,
      login,
      register,
      logout,
      createTransaction,
    ]
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
