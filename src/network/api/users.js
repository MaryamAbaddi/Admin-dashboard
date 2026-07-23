import { apiClient } from "./client";

export async function fetchUsers(token) {
  return apiClient.get("/admin/users", { token });
}
