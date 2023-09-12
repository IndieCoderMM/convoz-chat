import { useCollectionData } from "react-firebase-hooks/firestore";
import ChannelList from "./ChannelList";
import {
  mapDocumentDataToChannel,
  queryChannelsByUserId,
} from "../../lib/actions";
import { auth } from "../../lib/firebase";
import { ChannelInterface } from "../../common.types";

const Sidebar = () => {
  if (!auth.currentUser) return null;

  const [docArray] = useCollectionData(
    queryChannelsByUserId(auth.currentUser!.uid),
  );

  const channels: ChannelInterface[] =
    docArray?.map(mapDocumentDataToChannel) || [];

  const welcomeChannels = channels.filter((ch) => ch.showWelcome);
  const userChannels = channels.filter((ch) => !ch.showWelcome);

  return (
    <aside className="flex h-screen w-[250px] flex-shrink-0 flex-col bg-dark-800 text-white">
      <header className="flex flex-col items-start bg-blue-500 p-4">
        <h1>Your Channel</h1>
        <div className="rounded-full bg-gray-500/40 px-2 py-2">🌍Public</div>
      </header>
      <input
        type="text"
        className="w-full bg-dark-700 p-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dark-100"
        placeholder="Browse channels"
      />
      <ChannelList heading="Welcome 👋" channels={welcomeChannels} />
      <ChannelList heading="Channels" channels={userChannels} />
    </aside>
  );
};

export default Sidebar;
