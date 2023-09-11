import SignIn from "./pages/SignIn";

import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { auth } from "./lib/firebase";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Channels from "./pages/Channels";
import Header from "./components/Header";
import Profile from "./pages/Profile";

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

  return (
    <BrowserRouter>
      <div className="bg-dark-900 flex text-white">
        <Sidebar />
        <main className="bg-dark-600 max-h-full w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<div>Settings</div>} />
            <Route path="/*" element={<div>Not found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
