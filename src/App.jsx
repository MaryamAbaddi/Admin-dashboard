import { useState } from "react";
import { theme } from "./styles/theme";
import { AuthProvider } from "./store/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useWhitelistRequests } from "./hooks/useWhitelistRequests";
import { useUsers } from "./hooks/useUsers";
import { useDisputes } from "./hooks/useDisputes";
import { useAuditLog } from "./hooks/useAuditLog";

import LoginScreen from "./screens/login/LoginScreen";
import WhitelistScreen from "./screens/whitelist/WhitelistScreen";
import UsersScreen from "./screens/users/UsersScreen";
import DisputesScreen from "./screens/disputes/DisputesScreen";
import AuditLogScreen from "./screens/auditLog/AuditLogScreen";

import Sidebar from "./components/organisms/Sidebar";
import Topbar from "./components/organisms/Topbar";
import WhitelistDrawer from "./components/organisms/WhitelistDrawer";
import DisputeDrawer from "./components/organisms/DisputeDrawer";
import Toast from "./components/atoms/Toast";

function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [screen, setScreen] = useState("whitelist");
  const [openWhitelistId, setOpenWhitelistId] = useState(null);
  const [openDisputeId, setOpenDisputeId] = useState(null);
  const [toast, setToast] = useState(null);

  const { log, append } = useAuditLog();

  const { requests, approve: approveWhitelist, reject: rejectWhitelist } = useWhitelistRequests({
    onDecision: ({ type, request, reason }) => {
      if (type === "approved") {
        append({
          action: "Approved whitelist request",
          detail: request.email,
          admin: user?.name ? `Admin — ${user.name}` : "Admin",
        });
        showToast(`${request.email} approved for registration`);
      } else {
        append({
          action: "Rejected whitelist request",
          detail: `${request.email} — ${reason}`,
          admin: user?.name ? `Admin — ${user.name}` : "Admin",
        });
        showToast(`${request.email} rejected`);
      }
    },
  });

  const { users } = useUsers();

  const { disputes, resolve: resolveDispute } = useDisputes({
    onResolve: ({ dispute, message }) => {
      append({
        action: "Resolved dispute",
        detail: `${dispute.id} — ${dispute.project}`,
        admin: user?.name ? `Admin — ${user.name}` : "Admin",
      });
      showToast(`Dispute for ${dispute.project} marked resolved`);
    },
  });

  const openWhitelistRequest = requests.find((r) => r.id === openWhitelistId) || null;
  const openDispute = disputes.find((d) => d.id === openDisputeId) || null;

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(null), 2600);
  }

  async function handleApproveWhitelist(request) {
    await approveWhitelist(request);
    setOpenWhitelistId(null);
  }

  async function handleRejectWhitelist(request, reason) {
    await rejectWhitelist(request, reason);
    setOpenWhitelistId(null);
  }

  async function handleResolveDispute(dispute, message) {
    await resolveDispute(dispute, message);
    setOpenDisputeId(null);
  }

  return (
    <div
      style={{
        fontFamily: theme.font,
        display: "flex",
        width: "100%",
        minHeight: 720,
        background: theme.bg,
        color: theme.text,
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        border: `1px solid ${theme.border}`,
      }}
    >
      <Sidebar
        screen={screen}
        onChangeScreen={setScreen}
        whitelistCount={requests.length}
        disputesCount={disputes.filter((d) => d.status !== "Resolved").length}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar userName={user?.name} onLogout={signOut} />

        {screen === "whitelist" && (
          <WhitelistScreen requests={requests} onOpenRequest={setOpenWhitelistId} />
        )}
        {screen === "users" && <UsersScreen users={users} />}
        {screen === "disputes" && (
          <DisputesScreen disputes={disputes} onOpenDispute={setOpenDisputeId} />
        )}
        {screen === "auditLog" && <AuditLogScreen log={log} />}
      </div>

      {openWhitelistRequest && (
        <WhitelistDrawer
          request={openWhitelistRequest}
          onClose={() => setOpenWhitelistId(null)}
          onApprove={handleApproveWhitelist}
          onReject={handleRejectWhitelist}
        />
      )}

      {openDispute && (
        <DisputeDrawer
          dispute={openDispute}
          onClose={() => setOpenDisputeId(null)}
          onResolve={handleResolveDispute}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}

function AuthGate() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AdminDashboard /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
