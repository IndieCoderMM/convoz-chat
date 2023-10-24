import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";
import { FaGithub, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { useParams } from "react-router-dom";

import Tooltip from "../../components/Tooltip";
import { avatars } from "../../lib/constants";
import { usersRef } from "../../lib/firebase";
import { getDocIfExists, mapDocToUser } from "../../lib/firestore-utils";
import { useAppSelector } from "../../lib/store";
import { getChannelById } from "../Channels/channelsSlice";
import ChatForm from "./ChatForm";
import MessagesView from "./MessagesView";

import type { User } from "../../schema";

dayjs.extend(LocalizedFormat);

const ChatWindow = () => {
  const { channelId } = useParams();
  const [creator, setCreator] = useState<User | null>(null);

  const channel = useAppSelector((state) =>
    getChannelById(state, channelId ?? ""),
  );

  useEffect(() => {
    if (!channel) return;
    getDocIfExists(usersRef, channel.createdBy)
      .then(({ data }) => {
        if (data) {
          setCreator(mapDocToUser(data));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [channel]);

  if (!channel) {
    return (
      <section className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Welcome to Convoz Chat!</h2>
        <p className="text-gray-400">
          Please select a channel from the sidebar
        </p>
      </section>
    );
  }

  return (
    <section className="relative flex h-full w-full flex-col px-1 py-0 sm:px-4">
      <header className="sticky left-0 top-0 flex w-full flex-col gap-2 border-b border-gray-100/50 pb-4 shadow-sm">
        <nav className="flex items-center justify-start border-b border-dark-800 p-2">
          <div className="flex flex-shrink-0">
            <span className="mr-1 font-bold text-dark-100">#</span>
            <p>{channel.name.toLowerCase()}</p>
          </div>

          <div className="mx-4 w-[1px] self-stretch bg-white/50" />
          <div className="flex items-center justify-center gap-1">
            <FaUsers size={20} />
            <span className="font-bold">{channel.members.length}</span>
            <span className="text-xs text-gray-400">
              {channel.members.length === 1 ? "member" : "members"}
            </span>
          </div>
          <div className="flex w-full items-center justify-end">
            <button className="group relative rounded-md p-2 text-sm text-white transition hover:bg-dark-300">
              <Tooltip
                text="Leave Group"
                position="bottom"
                variant="dark"
                size="sm"
              />
              <FaSignOutAlt size={20} />
            </button>
            <div className="mx-2 w-[1px] self-stretch bg-white/50" />
            <a
              href="https://github.com/IndieCoderMM/convoz-chat"
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-md p-2 text-sm text-white transition hover:bg-dark-300"
            >
              <Tooltip
                text="View Source"
                position="bottom"
                variant="dark"
                size="sm"
              />
              <FaGithub size={20} />
            </a>
          </div>
        </nav>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-dark-700 text-4xl">
          <span>#</span>
        </div>
        <h2 className="text-3xl font-bold">
          Welcome to #{channel.name.toLowerCase()} channel!
        </h2>
        <p>{channel?.description}</p>
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
      </header>
      <main className="flex flex-1 flex-col gap-2">
        <MessagesView channelId={channel.id} />
      </main>
      <section className="absolute bottom-0 left-0 w-full p-2">
        <ChatForm channelId={channelId!} />
      </section>
    </section>
  );
};

export default ChatWindow;
