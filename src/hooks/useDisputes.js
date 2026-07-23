import { useState, useEffect, useCallback } from "react";
import * as disputesApi from "../network/api/disputes";
import { useAuth } from "./useAuth";

export function useDisputes({ onResolve } = {}) {
  const { token } = useAuth();
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  // The list only has summaries — full detail (dispute reason, submitted
  // work) is fetched on demand per project and cached here so re-opening
  // the same row doesn't refetch.
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true);
    disputesApi.fetchDisputes(token).then((data) => {
      if (!cancelled) {
        setDisputes(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const loadDetail = useCallback(
    async (projectId) => {
      const data = await disputesApi.fetchDispute(projectId, token);
      setDetails((prev) => ({ ...prev, [projectId]: data }));
      return data;
    },
    [token]
  );

  const resolve = useCallback(
    async (dispute, message) => {
      await disputesApi.resolveDispute(dispute.projectId, message, token);
      const resolvedDate = new Date().toISOString().slice(0, 10);

      setDisputes((prev) =>
        prev.map((d) => (d.projectId === dispute.projectId ? { ...d, status: "Resolved" } : d))
      );
      setDetails((prev) => {
        const existing = prev[dispute.projectId];
        if (!existing) return prev;
        return {
          ...prev,
          [dispute.projectId]: {
            ...existing,
            status: "Resolved",
            resolutionMessage: message,
            resolvedDate,
          },
        };
      });

      onResolve?.({ dispute, message });
    },
    [onResolve, token]
  );

  return { disputes, loading, details, loadDetail, resolve };
}
