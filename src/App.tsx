import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import ChatWindow from "./features/Chat/ChatWindow";
import { setUser } from "./features/User/userSlice";
import useAuthUser from "./hooks/useAuthUser";
import { useAppDispatch } from "./lib/store";
import { Channels, Chat, Explore, LandingPage, Profile } from "./pages";
import Settings from "./pages/Settings";
import RootLayout from "./RootLayout";

const GENERAL_CHANNEL_ID = import.meta.env.VITE_GENERAL_CHANNEL_ID || "general";

const App = () => {
  const { user, data } = useAuthUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !data) return;

    dispatch(setUser(data));
    navigate("/", { replace: true });
  }, [user, data, dispatch]);

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
          <Route path="explore" element={<Explore />} />
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
