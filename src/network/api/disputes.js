import { apiClient } from "./client";

export async function fetchDisputes(token) {
  return apiClient.get("/admin/disputes", { token });
}

// The list endpoint only returns summaries (project/parties/status) — the
// owner's dispute reason and submitted-work snapshot only come from the
// detail endpoint, fetched when a row is opened.
export async function fetchDispute(projectId, token) {
  return apiClient.get(`/admin/disputes/${projectId}`, { token });
}

export async function resolveDispute(projectId, message, token) {
  return apiClient.post(`/admin/disputes/${projectId}/resolve`, {
    token,
    body: { message },
  });
}
