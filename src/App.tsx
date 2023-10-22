import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./lib/store";
import RootLayout from "./RootLayout";
import ChatWindow from "./features/Chat/ChatWindow";

import { LandingPage, Explore, Chat, Channels, Profile } from "./pages";
import { Toaster } from "react-hot-toast";
import Auth from "./components/Auth";

const GENERAL_CHANNEL_ID = import.meta.env.VITE_GENERAL_CHANNEL_ID || "general";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
          {/* Public Routes -------------------------------------------- */}
          <Route
            path="/landing"
            element={<LandingPage />}
            errorElement={<div>Not found</div>}
          />
          <Route path="*" element={<div>Not found</div>} />,
        </Routes>
      </BrowserRouter>
      <Auth />
      <Toaster />
    </Provider>
  );
};

export default App;
