import SignIn from "./pages/SignIn";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { auth } from "./lib/firebase";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Channels from "./pages/Channels";
import Profile from "./pages/Profile";
import RootLayout from "./RootLayout";
import ChatWindow from "./features/Chat/ChatWindow";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<div>Not found</div>}
    >
      <Route index element={<Home />} />
      <Route path="chat" element={<Chat />}>
        <Route index element={<Navigate to="channels/general" replace />} />
        <Route path="channels/:channelId" element={<ChatWindow />} />
      </Route>
      <Route path="channels" element={<Channels />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<div>Settings</div>} />
      <Route path="*" element={<div>Not found</div>} />
    </Route>,
  ),
);

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!user) {
    return <SignIn />;
  }

  return <RouterProvider router={router} />;
};

export default App;
