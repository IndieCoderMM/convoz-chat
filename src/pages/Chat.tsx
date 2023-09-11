import { Outlet } from "react-router-dom";
import Sidebar from "../features/Chat/Sidebar";

const Chat = () => {
  return (
    <section className="flex h-full">
      <Sidebar />
      <Outlet />
    </section>
  );
};

export default Chat;
