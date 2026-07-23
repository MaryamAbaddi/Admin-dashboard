import { useState, useEffect } from "react";
import { theme } from "./styles/theme";
import { AuthProvider } from "./store/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useWhitelistRequests } from "./hooks/useWhitelistRequests";
import { useUsers } from "./hooks/useUsers";
import { useDisputes } from "./hooks/useDisputes";

import LoginScreen from "./screens/login/LoginScreen";
import WhitelistScreen from "./screens/whitelist/WhitelistScreen";
import UsersScreen from "./screens/users/UsersScreen";
import DisputesScreen from "./screens/disputes/DisputesScreen";

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

  const {
    requests,
    approve: approveWhitelist,
    reject: rejectWhitelist,
  } = useWhitelistRequests({
    onDecision: ({ type, request }) => {
      if (type === "approved") {
        showToast(`${request.email} approved for registration`);
      } else {
        showToast(`${request.email} rejected`);
      }
    },
  });

  const { users } = useUsers();

  const {
    disputes,
    details,
    loadDetail,
    resolve: resolveDispute,
  } = useDisputes({
    onResolve: ({ dispute }) => {
      showToast(`Dispute for ${dispute.projectTitle} marked resolved`);
    },
  });

  const openWhitelistRequest =
    requests.find((r) => r.id === openWhitelistId) || null;
  const openDispute = openDisputeId
    ? details[openDisputeId] ||
      disputes.find((d) => d.projectId === openDisputeId) ||
      null
    : null;
  const openDisputeDetailLoaded = openDisputeId
    ? Boolean(details[openDisputeId])
    : false;

  // Fetch the full dispute (reason, submitted work, resolution) the moment
  // a row is opened — the list only carries summaries.
  useEffect(() => {
    if (openDisputeId && !details[openDisputeId]) {
      loadDetail(openDisputeId).catch(() =>
        showToast("Couldn't load that dispute's details."),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDisputeId]);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(null), 2600);
  }

  async function handleApproveWhitelist(request) {
    try {
      await approveWhitelist(request);
      setOpenWhitelistId(null);
    } catch (err) {
      showToast(err.message || "Couldn't approve this request.");
    }
  }

  async function handleRejectWhitelist(request, reason) {
    try {
      await rejectWhitelist(request, reason);
      setOpenWhitelistId(null);
    } catch (err) {
      showToast(err.message || "Couldn't reject this request.");
    }
  }

  async function handleResolveDispute(dispute, message) {
    try {
      await resolveDispute(dispute, message);
      setOpenDisputeId(null);
    } catch (err) {
      showToast(err.message || "Couldn't resolve this dispute.");
    }
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

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Topbar userName={user?.name} onLogout={signOut} />

        {screen === "whitelist" && (
          <WhitelistScreen
            requests={requests}
            onOpenRequest={setOpenWhitelistId}
          />
        )}
        {screen === "users" && <UsersScreen users={users} />}
        {screen === "disputes" && (
          <DisputesScreen
            disputes={disputes}
            onOpenDispute={setOpenDisputeId}
          />
        )}
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
          detailLoaded={openDisputeDetailLoaded}
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
