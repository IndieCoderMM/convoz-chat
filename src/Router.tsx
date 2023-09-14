import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Channels from "./pages/Channels";
import Profile from "./pages/Profile";
import RootLayout from "./RootLayout";
import ChatWindow from "./features/Chat/ChatWindow";
import SignIn from "./pages/SignIn";
import Explore from "./pages/Explore";

const Router = createBrowserRouter(
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
      <Route path="explore" element={<Explore />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<div>Settings</div>} />
      <Route path="signin" element={<SignIn />} />
      <Route path="*" element={<div>Not found</div>} />
    </Route>,
  ),
);

export default Router;
