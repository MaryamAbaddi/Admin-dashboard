import { MOCK_NETWORK_DELAY_MS } from "../config/env";
import { initialWhitelistRequests } from "../../constants/mockData";

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_NETWORK_DELAY_MS));
}

export async function fetchWhitelistRequests() {
  // const res = await fetch(`${API_BASE_URL}/whitelist-requests`, { headers: authHeaders() });
  // return res.json();
  return delay(initialWhitelistRequests);
}

export async function approveWhitelistRequest(requestId) {
  // await fetch(`${API_BASE_URL}/whitelist-requests/${requestId}/approve`, { method: "POST", ... });
  return delay({ ok: true });
}

export async function rejectWhitelistRequest(requestId, reason) {
  // await fetch(`${API_BASE_URL}/whitelist-requests/${requestId}/reject`, { method: "POST", body: { reason } });
  return delay({ ok: true });
}
