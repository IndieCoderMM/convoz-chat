import { useCollectionData } from "react-firebase-hooks/firestore";
import ChannelList from "./ChannelList";
import {
  mapDocumentDataToChannel,
  queryChannelsByUserId,
} from "../../lib/actions";
import { auth } from "../../lib/firebase";

const ChatLinks = [
  {
    id: "rules",
    name: "rules",
    type: "public",
  },
  {
    id: "announcements",
    name: "announcements",
    type: "public",
  },
  {
    id: "general",
    name: "general",
    type: "public",
  },
];

const Sidebar = () => {
  if (!auth.currentUser) return null;

  const [docArray] = useCollectionData(
    queryChannelsByUserId(auth.currentUser!.uid),
  );

  const channels = docArray?.map(mapDocumentDataToChannel);

  return (
    <aside className="flex h-screen w-[250px] flex-shrink-0 flex-col bg-dark-800 text-white">
      <header className="flex flex-col items-start bg-blue-500 p-4">
        <h1>Your Channel</h1>
        <div className="rounded-full bg-gray-500/40 px-2 py-2">🌍Public</div>
      </header>
      <input
        type="text"
        className="focus-visible:ring-dark-100 w-full bg-dark-700 p-4 focus-visible:outline-none focus-visible:ring-1"
        placeholder="Browse channels"
      />
      <ChannelList heading="Welcome 👋" channels={ChatLinks} />
      <ChannelList heading="Channels" channels={channels || []} />
    </aside>
  );
};

export default Sidebar;
