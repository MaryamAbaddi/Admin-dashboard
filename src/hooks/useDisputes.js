import { useState, useEffect, useCallback } from "react";
import * as disputesApi from "../network/api/disputes";

export function useDisputes({ onResolve } = {}) {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    disputesApi.fetchDisputes().then((data) => {
      if (!cancelled) {
        setDisputes(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const resolve = useCallback(
    async (dispute, message) => {
      const { resolvedDate } = await disputesApi.resolveDispute(dispute.id, message);
      setDisputes((prev) =>
        prev.map((d) =>
          d.id === dispute.id
            ? { ...d, status: "Resolved", resolutionMessage: message, resolvedDate }
            : d
        )
      );
      onResolve?.({ dispute, message });
    },
    [onResolve]
  );

  return { disputes, loading, resolve };
}
