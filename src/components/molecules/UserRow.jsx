import { theme } from "../../styles/theme";

const APPROVAL_LABELS = {
  approved: "Approved",
  pending: "Pending",
  rejected: "Rejected",
};

const APPROVAL_COLORS = {
  approved: theme.success,
  pending: theme.warning,
  rejected: theme.danger,
};

export default function UserRow({ user, isFirst }) {
  const color = APPROVAL_COLORS[user.approvalStatus] || theme.muted;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 4px",
        borderTop: isFirst ? `1px solid ${theme.border}` : "none",
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{user.name}</p>
        <p style={{ fontSize: 12, color: theme.muted, margin: "2px 0 0" }}>
          {user.email}
          {user.company ? ` · ${user.company}` : ""}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontSize: 12, color: theme.muted }}>Joined {user.joinedDate}</span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color,
            background: "#f4f4f4",
            padding: "3px 10px",
            borderRadius: 999,
          }}
        >
          {APPROVAL_LABELS[user.approvalStatus] || user.approvalStatus}
        </span>
      </div>
    </div>
  );
}
