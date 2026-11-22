export interface AuthUser {
  id: string;
  name: string;
  email: string;
  balanceCents: number;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface Transaction {
  id: string;
  type: "PIX" | "PAYMENT";
  description: string;
  amountCents: number;
  createdAt: string;
}

interface ApiError {
  error?: string;
}

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
  });
  const payload: unknown = await response.json();

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof (payload as ApiError).error === "string"
        ? (payload as ApiError).error
        : "Não foi possível concluir a solicitação.";
    throw new Error(message);
  }

  return payload as T;
}
