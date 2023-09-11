import ChatWindow from "../features/Chat/ChatWindow";
import Sidebar from "../features/Chat/Sidebar";

const currentChannel = {
  id: "1",
  name: "general",
  description: "general chat",
  members: ["1", "2"],
};

const Chat = () => {
  return (
    <section className="flex h-full">
      <Sidebar />
      <ChatWindow channel={currentChannel} />
    </section>
  );
};

export default Chat;
