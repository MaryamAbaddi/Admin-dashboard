import { theme } from "../../styles/theme";

export default function Field({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "7px 0" }}>
      <span style={{ fontSize: 13, color: theme.muted, textAlign: "left" }}>{label}</span>
      <span style={{ fontSize: 13, color: theme.text, textAlign: "right", maxWidth: "62%" }}>
        {value}
      </span>
    </div>
  );
}
