import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";

import ChannelCard from "../features/Channels/ChannelCard";

import Modal from "../components/Modal";
import ChannelForm from "../features/Channels/ChannelForm";

import { useAppSelector } from "../lib/store";
import { getCreatedChannels } from "../features/Channels/channelsSlice";
import { selectUser } from "../features/User/userSlice";

const MAX_CHANNELS = 3; // Maximum channels per user

const Channels = () => {
  const [openForm, setOpenForm] = useState(false);
  const user = useAppSelector(selectUser);
  const channels = useAppSelector((state) =>
    getCreatedChannels(state, user?.id ?? ""),
  );

  const channelCount = channels.length;

  const canCreateChannel = channelCount < MAX_CHANNELS;

  const handleCreateChannelClick = () => {
    if (canCreateChannel) {
      setOpenForm(true);
    } else {
      // Show a toast notification instead of alert
      toast.error("You've reached the maximum limit of channels (3).");
    }
  };

  return (
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
            onClick={handleCreateChannelClick}
          >
            <FaPlus size={30} />
          </button>
          <span>Create a channel</span>
          <p>
            You've created {channelCount} out of {MAX_CHANNELS} channels.
          </p>
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
      <Modal
        show={openForm}
        handleClose={() => setOpenForm(false)}
        title="Create a Channel"
      >
        <ChannelForm onSuccess={() => setOpenForm(false)} />
      </Modal>
    </section>
  );
};

export default Channels;
