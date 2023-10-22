import { useCollectionData } from "react-firebase-hooks/firestore";
import ChannelList from "./ChannelList";
import {
  mapDocumentDataToChannel,
  queryChannelsByUserId,
  queryStaticChannels,
} from "../../lib/firestore-utils";
import { ChannelState } from "../../common.types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectUser } from "../User/userSlice";
import { onSnapshot } from "firebase/firestore";
import { selectChannels, setChannels } from "../Channels/channelsSlice";
import { BiSearch } from "react-icons/bi";

const Sidebar = () => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const [docArray] = useCollectionData(queryStaticChannels());

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
      <header className="flex flex-col bg-blue-500">
        <div className="flex w-full items-center justify-between bg-gradient-to-b from-blue-800 to-blue-500 px-4 pb-8 pt-4">
          <h1 className="text-lg font-medium">{currentUser?.name}</h1>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
      </header>
      <div className="flex items-center justify-between bg-dark-700">
        <BiSearch size={24} className="mx-2 text-slate-300" />
        <input
          type="text"
          className="w-full bg-dark-700 py-4 focus-visible:outline-none"
          placeholder="Browse channels"
        />
      </div>
      <ChannelList heading="Welcome 👋" channels={welcomeChannels} />
      <ChannelList
        heading="Channels"
        channels={channels.filter(
          (channel) => !welcomeChannels.map((ch) => ch.id).includes(channel.id),
        )}
      />
    </aside>
  );
};

export default Sidebar;
