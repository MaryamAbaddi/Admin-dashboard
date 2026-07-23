import { useState } from "react";
import { theme } from "../../styles/theme";
import DisputeDetailBody from "../molecules/DisputeDetailBody";
import Button from "../atoms/Button";

export default function DisputeDrawer({ dispute, onClose, onResolve }) {
  const [resolving, setResolving] = useState(false);
  const [message, setMessage] = useState("");

  function handleClose() {
    setResolving(false);
    setMessage("");
    onClose();
  }

  function handleSubmitResolve() {
    if (!message.trim()) return;
    onResolve(dispute, message);
    setResolving(false);
    setMessage("");
  }

  const isResolved = dispute.status === "Resolved";

  return (
    <>
      <div onClick={handleClose} style={{ position: "absolute", inset: 0, background: "rgba(20,20,22,0.35)" }} />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 480,
          background: theme.surface,
          boxShadow: "-8px 0 24px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 28px",
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{dispute.project}</p>
            <p style={{ fontSize: 12, color: theme.muted, margin: "2px 0 0" }}>
              Raised {dispute.raisedDate}
            </p>
          </div>
          <div onClick={handleClose} style={{ cursor: "pointer", fontSize: 18, color: theme.muted, lineHeight: 1 }}>
            ×
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <DisputeDetailBody dispute={dispute} />
        </div>

        {!isResolved && (
          <div style={{ padding: "18px 28px", borderTop: `1px solid ${theme.border}` }}>
            {!resolving ? (
              <Button variant="primary" onClick={() => setResolving(true)}>
                Resolve with a message
              </Button>
            ) : (
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: theme.muted, margin: "0 0 8px" }}>
                  Message to both parties
                </p>
                <textarea
                  autoFocus
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain the resolution decision — this is sent to both the contractor and the owner."
                  style={{
                    width: "100%",
                    minHeight: 100,
                    padding: 12,
                    borderRadius: 8,
                    border: `1px solid ${theme.border}`,
                    fontSize: 13,
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box",
                    marginBottom: 10,
                  }}
                />
                <div style={{ display: "flex", gap: 10 }}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setResolving(false);
                      setMessage("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" disabled={!message.trim()} onClick={handleSubmitResolve}>
                    Send & mark resolved
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
