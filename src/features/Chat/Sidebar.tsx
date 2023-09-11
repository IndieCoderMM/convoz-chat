import { useCollectionData } from "react-firebase-hooks/firestore";
import ChannelList from "./ChannelList";
import { queryUserChannels } from "../../lib/actions";
import { auth } from "../../lib/firebase";

const ChatLinks = [
  {
    id: "rules",
    name: "rules",
  },
  {
    id: "announcements",
    name: "announcements",
  },
  {
    id: "general",
    name: "general",
  },
];

const Sidebar = () => {
  const [value] = useCollectionData(queryUserChannels(auth));

  const channels = value?.map(({ id, name }) => ({
    id,
    name,
  }));

  return (
    <aside className="flex h-screen w-[250px] flex-shrink-0 flex-col bg-dark-800 text-white">
      <header className="flex flex-col items-start bg-blue-500 p-4">
        <h1>Your Channel</h1>
        <div className="rounded-full bg-gray-500/40 px-2 py-2">🌍Public</div>
      </header>
      <input type="text" className="p-4" placeholder="Browse channels" />
      <ChannelList heading="Welcome 👋" channels={ChatLinks} />
      <ChannelList heading="Channels" channels={channels || []} />
    </aside>
  );
};

export default Sidebar;
