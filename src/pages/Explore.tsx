import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { HeaderImg } from '../assets/img';
import { ChannelInterface } from '../common.types';
import ChannelCard from '../features/Channels/ChannelCard';
import { mapDocumentDataToChannel, queryPublicChannels } from '../lib/firestore-utils';

const Explore = () => {
  const [channels, setChannels] = useState<ChannelInterface[]>([]);

  useEffect(() => {
    const query = queryPublicChannels();
    onSnapshot(query, (snapshot) => {
      const channels = snapshot.docs.map((doc) => {
        return mapDocumentDataToChannel(doc.data());
      });
      setChannels(channels);
    });
  }, []);

  return (
    <section className="p-2">
      <header className="relative min-h-[40vh]">
        <img src={HeaderImg} alt="header" className="h-auto w-full" />
        <div className="bottom-0 left-0 right-0 top-0 col-span-1 row-span-1 mx-auto flex w-full flex-col items-center justify-center gap-4 bg-dark-700 px-2 py-8 text-center md:absolute md:bg-transparent ">
          <h1 className="text-xl font-bold capitalize lg:text-3xl">
            Find your community on Convoz
          </h1>
          <p className="mx-auto w-full lg:w-[80%]">
            From the biggest ideas to the smallest moments, Convoz makes it easy
            to discover and discuss the best of the web.
          </p>
          <div className="flex w-full max-w-xl items-center justify-center rounded-md bg-white text-dark-800">
            <input
              type="text"
              placeholder="Explore Channels"
              className="w-full rounded-md bg-transparent px-4 py-3 focus-visible:outline-none"
            />
            <button
              type="button"
              className="flex items-center justify-center p-2"
              aria-label="search"
            >
              <FaSearch size={24} />
            </button>
          </div>
        </div>
      </header>
      <main className="py-4 lg:py-10">
        <h2 className="mb-8 text-lg font-semibold lg:text-2xl">
          Featured Channels
        </h2>
        <div className="grid grid-cols-12 gap-2 md:gap-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="col-span-12 min-h-[300px] md:col-span-6 xl:col-span-3"
            >
              <ChannelCard {...channel} />
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Explore;
