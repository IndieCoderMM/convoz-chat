import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { HiBell } from "react-icons/hi";

import { ChannelInterface } from "../../common.types";
import { channelsRef } from "../../lib/firebase";
import { useAppSelector } from "../../lib/store";
import {
  getJoinedChannels,
  getStaticChannels,
} from "../Channels/channelsSlice";
import { selectUser } from "../User/userSlice";
import ChannelList from "./ChannelList";

const Sidebar = () => {
  const currentUser = useAppSelector(selectUser);

  const staticChannels = useAppSelector(getStaticChannels);
  const joinedChannels = useAppSelector((state) =>
    getJoinedChannels(state, currentUser?.id || ""),
  );

  useEffect(() => {
    if (!currentUser || !staticChannels) return;

    const channelsToJoin = staticChannels.filter(
      (channel) => !channel.members.includes(currentUser.id),
    );

    const joinAllChannels = async (channels: ChannelInterface[]) => {
      const batch = channels.reduce((acc, channel) => {
        const ref = doc(channelsRef, channel.id);
        const updatedMembers = [...channel.members, currentUser.id];
        acc.push(updateDoc(ref, { members: updatedMembers }));
        return acc;
      }, [] as Promise<void>[]);
      await Promise.all(batch);
    };

    if (channelsToJoin.length > 0) joinAllChannels(channelsToJoin);
  }, [staticChannels, currentUser]);

  return (
    <aside className="flex h-screen w-[250px] flex-shrink-0 flex-col bg-dark-800 text-white">
      <header className="flex flex-col bg-blue-500">
        <div className="flex w-full items-center justify-between bg-gradient-to-b from-blue-800 to-blue-500 px-4 pb-8 pt-4">
          <h1 className="text-lg font-medium">{currentUser?.name}</h1>
          <button
            type="button"
            className="text-white"
            onClick={() => {
              toast("No notifications yet!");
            }}
          >
            <HiBell size={24} />
            <span className="sr-only">Notifications</span>
          </button>
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
      <ChannelList heading="Welcome 👋" channels={staticChannels} />
      <ChannelList heading="My Channels" channels={joinedChannels} />
    </aside>
  );
};

export default Sidebar;
