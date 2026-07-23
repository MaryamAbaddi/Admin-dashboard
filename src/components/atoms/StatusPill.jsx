import { theme } from "../../styles/theme";

const STATUS_COLORS = {
  Open: theme.danger,
  "Under Review": theme.warning,
  Resolved: theme.success,
  Pending: theme.warning,
};

export default function StatusPill({ status }) {
  const color = STATUS_COLORS[status] || theme.muted;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color, fontWeight: 600 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {status}
    </span>
  );
}
