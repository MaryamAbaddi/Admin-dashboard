import { useState } from "react";
import { theme } from "../../styles/theme";
import Field from "../atoms/Field";
import Section from "../molecules/Section";
import Button from "../atoms/Button";

export default function WhitelistDrawer({ request, onClose, onApprove, onReject }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  function handleClose() {
    setRejecting(false);
    setReason("");
    onClose();
  }

  function handleSubmitReject() {
    if (!reason.trim()) return;
    onReject(request, reason);
    setRejecting(false);
    setReason("");
  }

  return (
    <>
      <div onClick={handleClose} style={{ position: "absolute", inset: 0, background: "rgba(20,20,22,0.35)" }} />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 420,
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
            <p style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{request.email}</p>
            <p style={{ fontSize: 12, color: theme.muted, margin: "2px 0 0" }}>
              Requested {request.requestedDate}
            </p>
          </div>
          <div onClick={handleClose} style={{ cursor: "pointer", fontSize: 18, color: theme.muted, lineHeight: 1 }}>
            ×
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <Section title="Request">
            <Field label="Requested by" value={request.requestedBy} />
            <Field label="Email to whitelist" value={request.email} />
            <Field label="Note" value={request.note || "—"} />
          </Section>
        </div>

        <div style={{ padding: "18px 28px", borderTop: `1px solid ${theme.border}` }}>
          {!rejecting ? (
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="secondary" onClick={() => setRejecting(true)}>
                Reject
              </Button>
              <Button variant="primary" onClick={() => onApprove(request)}>
                Approve
              </Button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: theme.muted, margin: "0 0 8px" }}>
                Reason for rejection
              </p>
              <textarea
                autoFocus
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Why is this request being rejected?"
                style={{
                  width: "100%",
                  minHeight: 84,
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
                    setRejecting(false);
                    setReason("");
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" disabled={!reason.trim()} onClick={handleSubmitReject}>
                  Send rejection
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
