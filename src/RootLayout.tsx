import Sidebar from "./components/Sidebar";
import { Navigate, Outlet } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";
import LoadingOverlay from "./components/LoadingOverlay";

const RootLayout = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return (
    <div className="flex bg-dark-900 text-white">
      <Sidebar />
      <main className="max-h-full w-full bg-dark-600">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
