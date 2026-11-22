
import { authClient } from "@/lib/auth-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const { data } = await authClient.token();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(data?.token
        ? { Authorization: `Bearer ${data.token}` }
        : {}),
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message || `Request failed with status ${response.status}`
    );
  }

  return (await response.json()) as T;
}

export const action = {
  post: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),

  put: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),

  patch: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),

  delete: <T = unknown>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};

export async function post<T = unknown>(path: string, body?: unknown) {
  return action.post<T>(path, body);
}

export default action;
