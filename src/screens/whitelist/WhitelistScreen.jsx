import { theme } from "../../styles/theme";
import WhitelistRequestRow from "../../components/molecules/WhitelistRequestRow";

export default function WhitelistScreen({ requests, onOpenRequest }) {
  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      <p style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>Whitelist requests</p>
      <p style={{ fontSize: 13, color: theme.muted, margin: "0 0 24px" }}>
        Emails requesting access to register into the application.
      </p>

      {requests.length === 0 && (
        <p style={{ fontSize: 13, color: theme.muted }}>No pending whitelist requests.</p>
      )}

      <div>
        {requests.map((r, i) => (
          <WhitelistRequestRow
            key={r.id}
            request={r}
            isFirst={i === 0}
            onClick={() => onOpenRequest(r.id)}
          />
        ))}
      </div>
    </div>
  );
}
