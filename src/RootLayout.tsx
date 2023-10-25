import { query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Navigate, Outlet } from 'react-router-dom';

import LoadingOverlay from './components/LoadingOverlay';
import Sidebar from './components/Sidebar';
import { setChannels } from './features/Channels/channelsSlice';
import { selectAuthStatus } from './features/User/userSlice';
import { AuthStatus } from './lib/constants';
import { channelsRef } from './lib/firebase';
import { mapDocToChannel } from './lib/firestore-utils';
import { useAppDispatch, useAppSelector } from './lib/store';

const RootLayout = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  const [channelDocs, loading] = useCollectionData(query(channelsRef));
  const [showLoading, setShowLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (authStatus !== AuthStatus.SignedIn) return;

    if (!channelDocs) return;

    const channels = channelDocs.map(mapDocToChannel);
    dispatch(setChannels(channels));
    console.log("Read channels from firestore");
  }, [authStatus, channelDocs, dispatch]);

  if (loading || authStatus === AuthStatus.Idle || showLoading) {
    return <LoadingOverlay />;
  }

  if (authStatus !== AuthStatus.SignedIn) {
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
