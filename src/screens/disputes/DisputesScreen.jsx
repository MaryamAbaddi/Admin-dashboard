import { useState, useMemo } from "react";
import { theme } from "../../styles/theme";
import DisputeRow from "../../components/molecules/DisputeRow";
import SearchInput from "../../components/atoms/SearchInput";
import Select from "../../components/atoms/Select";

const STATUS_OPTIONS = ["All", "Open", "Under Review", "Resolved"];

export default function DisputesScreen({ disputes, onOpenDispute }) {
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = disputes;
    if (status !== "All") {
      list = list.filter((d) => d.status === status);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (d) =>
          d.project.toLowerCase().includes(q) ||
          d.contractor.company.toLowerCase().includes(q) ||
          d.owner.company.toLowerCase().includes(q)
      );
    }
    return list;
  }, [disputes, status, search]);

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>Disputes</p>
          <p style={{ fontSize: 13, color: theme.muted, margin: 0 }}>
            Filter by status or search project / contractor / owner.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search project, contractor, owner…" />
          <Select value={status} onChange={setStatus} options={STATUS_OPTIONS} />
        </div>
      </div>

      {filtered.length === 0 && <p style={{ fontSize: 13, color: theme.muted }}>No disputes match.</p>}

      <div>
        {filtered.map((d, i) => (
          <DisputeRow key={d.id} dispute={d} isFirst={i === 0} onClick={() => onOpenDispute(d.id)} />
        ))}
      </div>
    </div>
  );
}
