import { theme } from "../../styles/theme";

const base = {
  flex: 1,
  padding: "11px 0",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

export default function Button({ children, onClick, variant = "primary", disabled = false }) {
  const style =
    variant === "primary"
      ? {
          ...base,
          border: "none",
          background: disabled ? "#e9c1c4" : theme.accent,
          color: "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
        }
      : {
          ...base,
          border: `1px solid ${theme.border}`,
          background: "transparent",
          color: theme.text,
        };

  return (
    <button onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
}
