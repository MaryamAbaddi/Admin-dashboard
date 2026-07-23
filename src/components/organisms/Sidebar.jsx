import { theme } from "../../styles/theme";

export default function Sidebar({ screen, onChangeScreen, whitelistCount, disputesCount }) {
  const items = [
    { key: "whitelist", label: "Whitelist requests", count: whitelistCount },
    { key: "users", label: "Users", count: 0 },
    { key: "disputes", label: "Disputes", count: disputesCount },
    { key: "auditLog", label: "Audit log", count: 0 },
  ];

  return (
    <div style={{ width: 200, background: theme.sidebar, padding: "24px 16px", flexShrink: 0 }}>
      <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, margin: "0 0 28px", paddingLeft: 8 }}>
        Trova Admin
      </p>
      {items.map((item) => {
        const isActive = screen === item.key;
        return (
          <div
            key={item.key}
            onClick={() => onChangeScreen(item.key)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 10px",
              borderRadius: 7,
              marginBottom: 2,
              cursor: "pointer",
              background: isActive ? theme.accent : "transparent",
              color: isActive ? "#fff" : theme.sidebarMuted,
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
            }}
          >
            <span>{item.label}</span>
            {item.count > 0 && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: isActive ? "#fff" : theme.sidebarMuted,
                  opacity: isActive ? 0.85 : 1,
                }}
              >
                {item.count}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
