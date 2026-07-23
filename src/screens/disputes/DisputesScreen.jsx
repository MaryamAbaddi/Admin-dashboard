import { useState, useMemo } from "react";
import { theme } from "../../styles/theme";
import DisputeRow from "../../components/molecules/DisputeRow";
import SearchInput from "../../components/atoms/SearchInput";

export default function DisputesScreen({ disputes, onOpenDispute }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return disputes;
    return disputes.filter(
      (d) =>
        d.projectTitle.toLowerCase().includes(q) ||
        d.contractorName.toLowerCase().includes(q) ||
        d.ownerName.toLowerCase().includes(q)
    );
  }, [disputes, search]);

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>Disputes</p>
          <p style={{ fontSize: 13, color: theme.muted, margin: 0 }}>
            Search by project, contractor, or owner.
          </p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search project, contractor, owner…" />
      </div>

      {filtered.length === 0 && <p style={{ fontSize: 13, color: theme.muted }}>No disputes match.</p>}

      <div>
        {filtered.map((d, i) => (
          <DisputeRow key={d.projectId} dispute={d} isFirst={i === 0} onClick={() => onOpenDispute(d.projectId)} />
        ))}
      </div>
    </div>
  );
}
