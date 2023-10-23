import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import ChatWindow from './features/Chat/ChatWindow';
import { selectAuthStatus, setUser } from './features/User/userSlice';
import useAuthUser from './hooks/useAuthUser';
import { AuthStatus } from './lib/constants';
import { useAppDispatch, useAppSelector } from './lib/store';
import { Channels, Chat, Explore, LandingPage, Profile, Settings } from './pages';
import RootLayout from './RootLayout';

const GENERAL_CHANNEL_ID = import.meta.env.VITE_GENERAL_CHANNEL_ID || "general";

const App = () => {
  const { user, data } = useAuthUser();
  const authStatus = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !data) return;
    if (authStatus === AuthStatus.SignedIn) return;

    dispatch(setUser(data));
    navigate("/", { replace: true });
  }, [user, data, dispatch, navigate, authStatus]);

  return (
    <>
      <Routes>
        {/* Private Routes ------------------------------------------- */}
        <Route
          path="/"
          element={<RootLayout />}
          errorElement={<div>Not found</div>}
        >
          <Route index element={<Explore />} />
          <Route path="chat" element={<Chat />}>
            <Route
              index
              element={
                <Navigate to={`channels/${GENERAL_CHANNEL_ID}`} replace />
              }
            />
            <Route path="channels/:channelId" element={<ChatWindow />} />
          </Route>
          <Route path="channels" element={<Channels />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Public Routes -------------------------------------------- */}
        <Route path="*" element={<div>Not found</div>} />,
        <Route
          path="/landing"
          element={<LandingPage />}
          errorElement={<div>Not found</div>}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
