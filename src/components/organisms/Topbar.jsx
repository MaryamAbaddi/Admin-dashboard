import { theme } from "../../styles/theme";
import Avatar from "../atoms/Avatar";

export default function Topbar({ title = "Trova — Admin Dashboard", userName, onLogout }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 32px",
        borderBottom: `1px solid ${theme.border}`,
        background: theme.surface,
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600 }}>{title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {userName && <span style={{ fontSize: 13, color: theme.muted }}>{userName}</span>}
        <Avatar initial="A" />
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              padding: "7px 12px",
              borderRadius: 7,
              border: `1px solid ${theme.border}`,
              background: "transparent",
              color: theme.text,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
