import { useCollectionData } from "react-firebase-hooks/firestore";
import ChannelList from "./ChannelList";
import {
  mapDocumentDataToChannel,
  queryChannelsByUserId,
  queryWelcomeChannels,
} from "../../lib/firestore-utils";
import { ChannelState } from "../../common.types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectUser } from "../User/userSlice";
import { onSnapshot } from "firebase/firestore";
import { selectChannels, setChannels } from "../Channels/channelsSlice";

const Sidebar = () => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const [docArray] = useCollectionData(queryWelcomeChannels());

  useEffect(() => {
    if (currentUser) {
      const query = queryChannelsByUserId(currentUser.id);
      onSnapshot(query, (snapshot) => {
        const channels = snapshot.docs.map(
          (doc) =>
            ({
              ...mapDocumentDataToChannel(doc.data()),
              messages: [],
            }) as ChannelState,
        );
        dispatch(setChannels(channels));
      });
    }
  }, [currentUser, dispatch]);

  const welcomeChannels = docArray?.map(mapDocumentDataToChannel) || [];

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
      <ChannelList
        heading="Channels"
        channels={channels.filter((channel) => !channel.showWelcome)}
      />
    </aside>
  );
};

export default Sidebar;
