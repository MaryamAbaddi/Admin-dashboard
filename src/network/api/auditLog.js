import { MOCK_NETWORK_DELAY_MS } from "../config/env";
import { initialAuditLog } from "../../constants/mockData";

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_NETWORK_DELAY_MS));
}

export async function fetchAuditLog() {
  // const res = await fetch(`${API_BASE_URL}/audit-log`, { headers: authHeaders() });
  // return res.json();
  return delay(initialAuditLog);
}

export async function appendAuditLog(entry) {
  // await fetch(`${API_BASE_URL}/audit-log`, { method: "POST", body: JSON.stringify(entry) });
  return delay({ ok: true });
}
