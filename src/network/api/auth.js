import { apiClient } from "./client";

// LoginScreen's field is labeled "Email" but the internal param name stays
// `username` to avoid touching AuthContext's call signature.
export async function login({ username, password }) {
  const data = await apiClient.post("/auth/login", {
    body: { email: username, password },
  });

  // The backend's /auth/login is shared by every account type (regular
  // users, the bank, the admin) — nothing server-side rejects a non-admin
  // login here, so the admin panel has to check the role itself.
  if (data.user.role !== "admin") {
    throw new Error("This account doesn't have admin access.");
  }

  return { token: data.token, user: data.user };
}

export async function logout() {
  // JWT auth is stateless — nothing to invalidate server-side, this just
  // exists so AuthContext has something to await.
  return true;
}
