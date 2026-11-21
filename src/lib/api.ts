const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export const api = {
  get: <T = unknown>(path: string) => request<T>(path, { method: "GET" }),
  post: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T = unknown>(path: string) => request<T>(path, { method: "DELETE" }),
};

export async function apiGet<T = unknown>(path: string) {
  return api.get<T>(path);
}

export default api;
