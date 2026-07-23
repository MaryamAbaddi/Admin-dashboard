import { useState, useEffect, useCallback } from "react";
import * as auditApi from "../network/api/auditLog";

export function useAuditLog() {
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    auditApi.fetchAuditLog().then((data) => {
      if (!cancelled) {
        setLog(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const append = useCallback((entry) => {
    const withId = { id: `log-${Date.now()}`, timestamp: "Just now", ...entry };
    setLog((prev) => [withId, ...prev]);
    auditApi.appendAuditLog(withId);
  }, []);

  return { log, loading, append };
}
