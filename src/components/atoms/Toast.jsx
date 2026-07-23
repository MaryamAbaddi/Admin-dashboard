import { theme } from "../../styles/theme";

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: theme.text,
        color: "#fff",
        fontSize: 13,
        padding: "10px 18px",
        borderRadius: 8,
      }}
    >
      {message}
    </div>
  );
}
