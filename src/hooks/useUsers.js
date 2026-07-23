import { useState, useEffect } from "react";
import * as usersApi from "../network/api/users";
import { useAuth } from "./useAuth";

export function useUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true);
    usersApi.fetchUsers(token).then((data) => {
      if (!cancelled) {
        setUsers(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return { users, loading };
}
