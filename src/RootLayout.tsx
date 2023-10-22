import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

import LoadingOverlay from './components/LoadingOverlay';
import Sidebar from './components/Sidebar';
import { auth } from './lib/firebase';

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
      <main className="ml-16 min-h-screen w-full bg-dark-600">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
