import { theme } from "../../styles/theme";
import StatusPill from "../atoms/StatusPill";

export default function DisputeRow({ dispute, isFirst, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 4px",
        borderTop: isFirst ? `1px solid ${theme.border}` : "none",
        borderBottom: `1px solid ${theme.border}`,
        cursor: "pointer",
      }}
    >
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{dispute.projectTitle}</p>
        <p style={{ fontSize: 12, color: theme.muted, margin: "2px 0 0" }}>
          {dispute.contractorName} vs {dispute.ownerName} · Raised {dispute.raisedDate}
        </p>
      </div>
      <StatusPill status={dispute.status} />
    </div>
  );
}
