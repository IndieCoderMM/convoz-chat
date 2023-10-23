import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { ChannelInterface } from '../common.types';
import ChannelCard from '../features/Channels/ChannelCard';
import { selectChannels, setChannels } from '../features/Channels/channelsSlice';
import CreateChannel from '../features/Channels/CreateChannel';
import { selectUser } from '../features/User/userSlice';
import { mapDocumentDataToChannel, queryCreatedChannels } from '../lib/firestore-utils';
import { useAppDispatch, useAppSelector } from '../lib/store';

const Channels = () => {
  const [openForm, setOpenForm] = useState(false);
  const channels = useAppSelector(selectChannels);

  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      const query = queryCreatedChannels(currentUser.id);
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

  return (
    <>
      <section className="space-y-4 px-16 py-8">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">Channels</h1>
        <p>
          Channels are where your members communicate. They&apos;re best when
          organized around a topic — #webdev, #gamedev for example.
        </p>
        <div className="grid w-full grid-cols-12 gap-4">
          <div className="col-span-12 flex min-h-[300px] flex-col items-center justify-center gap-2 rounded-md bg-dark-500 text-xl text-white sm:col-span-6 lg:col-span-4">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-dark-700 p-2"
              onClick={() => setOpenForm(true)}
            >
              <FaPlus size={30} />
            </button>
            <span>Create a channel</span>
          </div>
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="col-span-12 flex min-h-[300px] items-center justify-center rounded-md bg-dark-800 text-white sm:col-span-6 lg:col-span-4"
            >
              <ChannelCard {...channel} />
            </div>
          ))}
        </div>
      </section>
      {openForm && <CreateChannel close={() => setOpenForm(false)} />}
    </>
  );
};

export default Channels;
