import { useState } from "react";
import type { Channel, User } from "../../schema";
import Navbar from "./Navbar";
import { FaEdit, FaPlus } from "react-icons/fa";
import { avatars } from "../../lib/constants";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Modal from "../../components/Modal";
import ChannelForm from "../Channels/ChannelForm";

dayjs.extend(LocalizedFormat);

const ChatHeader = ({
  channel,
  editable,
  creator,
}: {
  channel: Channel;
  editable: boolean;
  creator?: User;
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <header className="sticky left-0 top-0 flex w-full flex-col gap-2 border-b border-gray-100/50 pb-4 shadow-sm">
      <Navbar channel={channel} />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-dark-700 text-4xl">
        <span>#</span>
      </div>
      <h2 className="text-3xl font-bold">
        Welcome to #{channel.name.toLowerCase()} channel!
      </h2>
      <p>{channel?.description}</p>
      {/* Channel Actions ------------------------------------------------------------------------------- */}
      {editable ? (
        <div className="flex items-center justify-start gap-2">
          <button
            type="button"
            className="flex items-center rounded-md px-3 py-2 text-secondary transition hover:bg-dark-500"
          >
            <FaPlus size={16} />
            <span className="ml-1">Add Members</span>
          </button>

          <button
            onClick={() => setOpenModal(true)}
            type="button"
            className="flex items-center rounded-md px-3 py-2 text-secondary transition hover:bg-dark-500"
          >
            <FaEdit size={16} />
            <span className="ml-1">Edit Channel</span>
          </button>
        </div>
      ) : null}
      <div className="ml-4 flex items-center justify-start gap-2">
        <div className="flex items-center justify-center rounded-full bg-dark-700 text-4xl">
          <img
            src={avatars[creator?.avatarId ?? 0]}
            alt=""
            className="h-8 w-8"
          />
        </div>
        <h3 className="font-medium">{creator?.name}</h3>
        <span className="rounded-full bg-dark-800 px-2 py-1 text-xs">
          🟢 Admin
        </span>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-dark-600 px-2 py-2">
        <span className="text-sm text-gray-400">
          {dayjs(channel.createdAt).format("LLLL")}
        </span>
      </div>

      {/* Edit Channel Modal --------------------------------------------------------------------------------- */}
      <Modal
        show={openModal}
        handleClose={() => setOpenModal(false)}
        title="Edit Channel"
      >
        <ChannelForm
          initialValues={channel}
          onSuccess={() => setOpenModal(false)}
        />
      </Modal>
    </header>
  );
};

export default ChatHeader;
