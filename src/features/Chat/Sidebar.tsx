import { useCollectionData } from "react-firebase-hooks/firestore";
import ChannelList from "./ChannelList";
import { queryUserChannels } from "../../lib/actions";
import { auth } from "../../lib/firebase";

const Sidebar = () => {
  const [value] = useCollectionData(queryUserChannels(auth));

  const channels = value?.map(({ id, name }) => ({ id, name }));

  return (
    <aside className="bg-dark-800 flex h-screen w-[300px] flex-col text-white">
      <header className="flex flex-col items-start bg-blue-500 p-4">
        <h1>Your Channel</h1>
        <div className="rounded-full bg-gray-500/40 px-2 py-2">🌍Public</div>
      </header>
      <input type="text" className="p-4" placeholder="Browse channels" />
      <ChannelList
        heading="Welcome 👋"
        channels={[
          {
            id: "1",
            name: "rules",
          },
          {
            id: "2",
            name: "announcements",
          },
          {
            id: "3",
            name: "general",
          },
        ]}
      />
      <ChannelList heading="Channels" channels={channels || []} />
    </aside>
  );
};

export default Sidebar;
