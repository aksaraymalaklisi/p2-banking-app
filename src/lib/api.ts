import { Platform } from "react-native";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  balanceCents: number;
}

export interface AuthResponse {
  token?: string;
  user: AuthUser;
}

export interface Transaction {
  id: string;
  type: "PIX" | "PAYMENT";
  description: string;
  amountCents: number;
  createdAt: string;
}

interface ApiErrorPayload {
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { token?: string; useCookieSession?: boolean } = {}
): Promise<T> {
  const { token, useCookieSession, ...requestOptions } = options;
  const headers = new Headers(requestOptions.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (useCookieSession) {
    headers.set("X-Session-Transport", "cookie");
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...requestOptions,
    headers,
    ...(Platform.OS === "web" ? { credentials: "include" as const } : {}),
  });
  const payload: unknown = await response.json();

  if (!response.ok) {
    const errorMessage =
      typeof payload === "object" && payload !== null && "error" in payload
        ? (payload as ApiErrorPayload).error
        : undefined;
    const message =
      typeof errorMessage === "string"
        ? errorMessage
        : "Não foi possível concluir a solicitação.";
    throw new ApiError(message, response.status);
  }

  return payload as T;
}
