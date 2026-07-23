import { MOCK_NETWORK_DELAY_MS } from "../config/env";
import { initialDisputes } from "../../constants/mockData";

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_NETWORK_DELAY_MS));
}

export async function fetchDisputes() {
  // const res = await fetch(`${API_BASE_URL}/disputes`, { headers: authHeaders() });
  // return res.json();
  return delay(initialDisputes);
}

export async function resolveDispute(disputeId, message) {
  // await fetch(`${API_BASE_URL}/disputes/${disputeId}/resolve`, {
  //   method: "POST",
  //   body: JSON.stringify({ message }),
  // });
  return delay({ ok: true, resolvedDate: "July 23, 2026" });
}
