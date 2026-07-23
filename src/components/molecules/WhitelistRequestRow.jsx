import { theme } from "../../styles/theme";

export default function WhitelistRequestRow({ request, isFirst, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 4px",
        borderTop: isFirst ? `1px solid ${theme.border}` : "none",
        borderBottom: `1px solid ${theme.border}`,
        cursor: "pointer",
      }}
    >
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{request.email}</p>
        <p style={{ fontSize: 12, color: theme.muted, margin: "2px 0 0" }}>
          {request.requestedBy} · Requested {request.requestedDate}
        </p>
      </div>
      <span style={{ fontSize: 13, color: theme.muted }}>Review →</span>
    </div>
  );
}
