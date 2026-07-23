import { theme } from "../../styles/theme";
import AuditLogRow from "../../components/molecules/AuditLogRow";

export default function AuditLogScreen({ log }) {
  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      <p style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>Audit log</p>
      <p style={{ fontSize: 13, color: theme.muted, margin: "0 0 24px" }}>
        Record of admin actions — read-only.
      </p>

      {log.length === 0 && <p style={{ fontSize: 13, color: theme.muted }}>No activity yet.</p>}

      <div>
        {log.map((entry, i) => (
          <AuditLogRow key={entry.id} entry={entry} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );
}
