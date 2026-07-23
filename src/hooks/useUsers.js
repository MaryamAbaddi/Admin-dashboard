import { useState, useEffect } from "react";
import * as usersApi from "../network/api/users";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    usersApi.fetchUsers().then((data) => {
      if (!cancelled) {
        setUsers(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { users, loading };
}
