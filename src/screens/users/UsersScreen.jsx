import { useState, useMemo } from "react";
import { theme } from "../../styles/theme";
import UserRow from "../../components/molecules/UserRow";
import SearchInput from "../../components/atoms/SearchInput";

export default function UsersScreen({ users }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.company.toLowerCase().includes(q)
    );
  }, [users, search]);

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>Users</p>
          <p style={{ fontSize: 13, color: theme.muted, margin: 0 }}>
            Everyone currently registered in the system.
          </p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search name, email, company…" />
      </div>

      {filtered.length === 0 && <p style={{ fontSize: 13, color: theme.muted }}>No users match.</p>}

      <div>
        {filtered.map((u, i) => (
          <UserRow key={u.id} user={u} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );
}
