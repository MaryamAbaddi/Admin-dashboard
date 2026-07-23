import { theme } from "../../styles/theme";

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "9px 12px",
        borderRadius: 8,
        border: `1px solid ${theme.border}`,
        fontSize: 13,
        fontFamily: "inherit",
        width: 260,
        boxSizing: "border-box",
      }}
    />
  );
}
