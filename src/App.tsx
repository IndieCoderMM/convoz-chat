import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Auth from './components/Auth';
import ChatWindow from './features/Chat/ChatWindow';
import store from './lib/store';
import { Channels, Chat, Explore, LandingPage, Profile } from './pages';
import Settings from './pages/Settings';
import RootLayout from './RootLayout';

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
            <Route path="settings" element={<Settings />} />
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
