import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateChannel from "../features/Channels/CreateChannel";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  mapDocumentDataToChannel,
  queryChannelsByUserId,
} from "../lib/actions";
import { auth } from "../lib/firebase";
import ChannelCard from "../features/Channels/ChannelCard";
import { ChannelInterface } from "../common.types";

const Channels = () => {
  if (!auth.currentUser) return null;

  const [openForm, setOpenForm] = useState(false);
  const [docArray, loading, error] = useCollectionData(
    queryChannelsByUserId(auth.currentUser!.uid),
  );

  const channels: ChannelInterface[] =
    docArray?.map(mapDocumentDataToChannel) || [];

  return (
    <section className="space-y-8 px-16 py-8">
      <h1 className="text-xl font-bold">Channels</h1>
      <p>
        Channels are where your members communicate. They&apos;re best when
        organized around a topic — #webdev, for example.
      </p>
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="col-span-12 flex min-h-[300px] flex-col items-center justify-center gap-2 rounded-md bg-dark-500 text-xl text-white sm:col-span-6 md:col-span-4">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-dark-700 p-2"
            onClick={() => setOpenForm(true)}
          >
            <FaPlus size={30} />
          </button>
          <span>Create a channel</span>
        </div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {channels.map((channel) => (
          <ChannelCard key={channel.id} {...channel} />
        ))}
      </div>
      {openForm && <CreateChannel close={() => setOpenForm(false)} />}
    </section>
  );
};

export default Channels;
