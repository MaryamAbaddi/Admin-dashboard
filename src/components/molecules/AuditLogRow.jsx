import { theme } from "../../styles/theme";

export default function AuditLogRow({ entry, isFirst }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 4px",
        borderTop: isFirst ? `1px solid ${theme.border}` : "none",
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{entry.action}</p>
        <p style={{ fontSize: 12, color: theme.muted, margin: "2px 0 0" }}>{entry.detail}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ fontSize: 12, color: theme.text, margin: 0 }}>{entry.admin}</p>
        <p style={{ fontSize: 11, color: theme.muted, margin: "2px 0 0" }}>{entry.timestamp}</p>
      </div>
    </div>
  );
}
