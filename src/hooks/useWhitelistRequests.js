import { useState, useEffect, useCallback } from "react";
import * as whitelistApi from "../network/api/whitelist";

export function useWhitelistRequests({ onDecision } = {}) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    whitelistApi.fetchWhitelistRequests().then((data) => {
      if (!cancelled) {
        setRequests(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const approve = useCallback(
    async (request) => {
      await whitelistApi.approveWhitelistRequest(request.id);
      setRequests((prev) => prev.filter((r) => r.id !== request.id));
      onDecision?.({ type: "approved", request });
    },
    [onDecision]
  );

  const reject = useCallback(
    async (request, reason) => {
      await whitelistApi.rejectWhitelistRequest(request.id, reason);
      setRequests((prev) => prev.filter((r) => r.id !== request.id));
      onDecision?.({ type: "rejected", request, reason });
    },
    [onDecision]
  );

  return { requests, loading, approve, reject };
}
