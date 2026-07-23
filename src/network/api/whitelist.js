import { apiClient } from "./client";

export async function fetchWhitelistRequests(token) {
  return apiClient.get("/admin/users/pending", { token });
}

export async function approveWhitelistRequest(userId, token) {
  return apiClient.post(`/admin/users/${userId}/approve`, { token });
}

export async function rejectWhitelistRequest(userId, reason, token) {
  return apiClient.post(`/admin/users/${userId}/reject`, {
    token,
    body: { reason },
  });
}
