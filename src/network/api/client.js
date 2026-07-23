import { API_BASE_URL } from "../config/env";

// Every endpoint on the backend returns { success, message, data } (see
// TrovaBackend.DTOs.Common.ApiResponse<T>). This unwraps that envelope and
// throws a plain Error with the server's message on failure, so callers
// just get back `data` or a catchable error — no envelope-checking at
// every call site.
async function request(path, { method = "GET", token, body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection and try again.");
  }

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // No JSON body (e.g. a 204, or a non-API error page) — fall through
    // and use the status code alone.
  }

  if (!res.ok || (payload && payload.success === false)) {
    const message = payload?.message || `Request failed (${res.status}).`;
    const error = new Error(message);
    error.status = res.status;
    error.data = payload?.data ?? null;
    throw error;
  }

  return payload?.data;
}

export const apiClient = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, opts) => request(path, { ...opts, method: "POST" }),
};
