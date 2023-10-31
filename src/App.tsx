import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useNavigate } from "react-router-dom";

import {
  clearUser,
  selectAuthStatus,
  setUser,
} from "./features/User/userSlice";
import useAuthUser from "./hooks/useAuthUser";
import { AuthStatus } from "./lib/constants";
import { useAppDispatch, useAppSelector } from "./lib/store";
import {
  Channels,
  ChatPage,
  Explore,
  LandingPage,
  Profile,
  Settings,
} from "./pages";
import RootLayout from "./RootLayout";

const App = () => {
  const { user, data, loading } = useAuthUser();
  const authStatus = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && authStatus === AuthStatus.SignedIn) return;
    if (user && data && authStatus !== AuthStatus.SignedIn) {
      // * once user is authenticated and data fetched, set the user in the store
      dispatch(setUser(data));
      navigate("/", { replace: true });
    } else if (!user && !loading) {
      // * clear user from the store if logout
      dispatch(clearUser());
      navigate("/landing", { replace: true });
    }
  }, [user, data, loading, dispatch, authStatus, navigate]);

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
          <Route path="chat/channels/:channelId" element={<ChatPage />} />
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
