import { MOCK_NETWORK_DELAY_MS } from "../config/env";
import { users } from "../../constants/mockData";

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_NETWORK_DELAY_MS));
}

export async function fetchUsers() {
  // const res = await fetch(`${API_BASE_URL}/users`, { headers: authHeaders() });
  // return res.json();
  return delay(users);
}
