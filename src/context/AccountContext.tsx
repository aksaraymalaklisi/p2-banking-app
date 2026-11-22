import { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

/**
 * Interface que define os dados da conta do usuário.
 */
export interface AccountData {
  userName: string;
  agency: string;
  accountNumber: string;
  balance: number;
  creditLimit: number;
  creditUsed: number;
  investmentsTotal: number;
  isBalanceVisible: boolean;
  toggleBalanceVisibility: () => void;
  formatCurrency: (value: number) => string;
}

const AccountContext = createContext<AccountData | undefined>(undefined);

/**
 * Provedor do contexto da conta Nubank.
 * Armazena e gerencia o estado global de visibilidade do saldo e valores simulados.
 */
export function AccountProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // useState: armazena a visibilidade do saldo e dispara re-render quando alterado
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);

  // Dados simulados do cliente Nubank
  const userName = user?.name ?? "Vitor";
  const agency = "0001";
  const accountNumber = "9876543-2";
  const balance = user ? user.balanceCents / 100 : 1450.8;
  const creditLimit = 5000.0;
  const creditUsed = 780.45;
  const investmentsTotal = 3250.0;

  // Alterna entre mostrar e ocultar valores
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  // Helper para formatar moeda brasileira com suporte a ocultação (•••••)
  const formatCurrency = (value: number): string => {
    if (!isBalanceVisible) {
      return "R$ •••••";
    }
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <AccountContext.Provider
      value={{
        userName,
        agency,
        accountNumber,
        balance,
        creditLimit,
        creditUsed,
        investmentsTotal,
        isBalanceVisible,
        toggleBalanceVisibility,
        formatCurrency,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

/**
 * Hook customizado para consumir os dados da conta em qualquer tela.
 */
export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount deve ser utilizado dentro de um AccountProvider");
  }
  return context;
}
