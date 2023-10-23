import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import { HiBell } from 'react-icons/hi';

import { ChannelInterface } from '../../common.types';
import { channelsRef } from '../../lib/firebase';
import {
    mapDocumentDataToChannel, queryJoinedChannels, queryStaticChannels
} from '../../lib/firestore-utils';
import { useAppDispatch, useAppSelector } from '../../lib/store';
import { selectChannels, setChannels } from '../Channels/channelsSlice';
import { selectUser } from '../User/userSlice';
import ChannelList from './ChannelList';

const Sidebar = () => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const [staticChannelsDocs] = useCollectionData(queryStaticChannels());

  useEffect(() => {
    if (!staticChannelsDocs || !currentUser) return;

    const channelsToJoin = staticChannelsDocs
      .map(mapDocumentDataToChannel)
      .filter((doc) => {
        const channel = mapDocumentDataToChannel(doc);
        return !channel.members.includes(currentUser.id);
      });

    const joinAllChannels = async (channels: ChannelInterface[]) => {
      const batch = channels.reduce((acc, channel) => {
        const ref = doc(channelsRef, channel.id);
        const updatedMembers = [...channel.members, currentUser.id];
        acc.push(updateDoc(ref, { members: updatedMembers }));
        return acc;
      }, [] as Promise<void>[]);
      await Promise.all(batch);
    };

    joinAllChannels(channelsToJoin);
  }, [staticChannelsDocs, currentUser]);

  useEffect(() => {
    if (currentUser) {
      const query = queryJoinedChannels(currentUser.id);
      onSnapshot(query, (snapshot) => {
        const channels = snapshot.docs.map(
          (doc) =>
            ({
              ...mapDocumentDataToChannel(doc.data()),
              messages: [],
            }) as ChannelInterface,
        );
        dispatch(setChannels(channels));
      });
    }
  }, [currentUser, dispatch]);

  const welcomeChannels =
    staticChannelsDocs?.map(mapDocumentDataToChannel) || [];

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
      <ChannelList heading="Welcome 👋" channels={welcomeChannels} />
      <ChannelList
        heading="My Channels"
        channels={channels.filter(
          (channel) => !welcomeChannels.map((ch) => ch.id).includes(channel.id),
        )}
      />
    </aside>
  );
};

export default Sidebar;
