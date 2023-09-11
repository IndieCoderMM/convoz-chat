import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex bg-dark-900 text-white">
      <Sidebar />
      <main className="max-h-full w-full bg-dark-600">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
