import { useState } from "react";
import { theme } from "../../styles/theme";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/atoms/Button";

export default function LoginScreen() {
  const { signIn, status, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await signIn(username, password);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 720,
        background: theme.bg,
        fontFamily: theme.font,
      }}
    >
      <div
        style={{
          width: 340,
          background: theme.surface,
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          padding: 32,
        }}
      >
        <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px", color: theme.text }}>
          Trova — Admin Dashboard
        </p>
        <p style={{ fontSize: 13, color: theme.muted, margin: "0 0 24px" }}>
          Sign in to manage whitelist requests and disputes.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: 16 }}
          />

          {error && <p style={{ fontSize: 12, color: theme.danger, margin: "0 0 12px" }}>{error}</p>}

          <Button variant="primary" disabled={status === "loading"}>
            {status === "loading" ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e9e9ec",
  fontSize: 13,
  fontFamily: "inherit",
  boxSizing: "border-box",
  marginBottom: 10,
};
