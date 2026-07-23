import { MOCK_NETWORK_DELAY_MS } from "../config/env";

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_NETWORK_DELAY_MS));
}

export async function login({ username, password }) {
  // Replace with a real call once the backend is ready:
  // const res = await fetch(`${API_BASE_URL}/admin/auth/login`, { ... });
  if (!username.trim() || !password.trim()) {
    throw new Error("Username and password are required.");
  }
  return delay({
    token: "mock-admin-token-" + Date.now(),
    user: { name: username, role: "Admin" },
  });
}

export async function logout() {
  return delay(true);
}
