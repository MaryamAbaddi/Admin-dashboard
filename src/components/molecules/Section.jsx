import { theme } from "../../styles/theme";

export default function Section({ title, children }) {
  return (
    <div style={{ padding: "18px 28px", borderBottom: `1px solid ${theme.border}` }}>
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: theme.muted,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          margin: "0 0 4px",
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
