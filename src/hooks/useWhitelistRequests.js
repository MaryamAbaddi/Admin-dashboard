import { useState, useEffect, useCallback } from "react";
import * as whitelistApi from "../network/api/whitelist";
import { useAuth } from "./useAuth";

export function useWhitelistRequests({ onDecision } = {}) {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true);
    whitelistApi.fetchWhitelistRequests(token).then((data) => {
      if (!cancelled) {
        setRequests(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const approve = useCallback(
    async (request) => {
      await whitelistApi.approveWhitelistRequest(request.id, token);
      setRequests((prev) => prev.filter((r) => r.id !== request.id));
      onDecision?.({ type: "approved", request });
    },
    [onDecision, token]
  );

  const reject = useCallback(
    async (request, reason) => {
      await whitelistApi.rejectWhitelistRequest(request.id, reason, token);
      setRequests((prev) => prev.filter((r) => r.id !== request.id));
      onDecision?.({ type: "rejected", request, reason });
    },
    [onDecision, token]
  );

  return { requests, loading, approve, reject };
}
