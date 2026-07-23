import { theme } from "../../styles/theme";

export default function Avatar({ initial = "A" }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "#f7e5e7",
        color: theme.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 700,
      }}
    >
      {initial}
    </div>
  );
}
