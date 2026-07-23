import { theme } from "../../styles/theme";

export default function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "9px 12px",
        borderRadius: 8,
        border: `1px solid ${theme.border}`,
        fontSize: 13,
        fontFamily: "inherit",
        background: theme.surface,
        color: theme.text,
      }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
