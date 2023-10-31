import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { usersRef } from "../lib/firebase";
import { getDocIfExists, mapDocToUser } from "../lib/firestore-utils";
import { useAppSelector } from "../lib/store";
import { getChannelById } from "../features/Channels/channelsSlice";
import { selectUser } from "../features/User/userSlice";

import type { User } from "../schema";
import { Sidebar, Header, MessagesContainer, ChatForm } from "../features/Chat";

const BlankChannel = () => (
  <section className="flex h-full w-full flex-col items-center justify-center">
    <h2 className="text-2xl font-bold">Welcome to Convoz Chat!</h2>
    <p className="text-gray-400">Please select a channel from the sidebar</p>
  </section>
);

const ChatPage = () => {
  const { channelId } = useParams();

  const [creator, setCreator] = useState<User | null>(null);
  const currentUser = useAppSelector(selectUser);
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

  const editable = currentUser?.id === channel?.createdBy;

  return (
    <section className="flex h-full">
      <Sidebar />
      {channel ? (
        <section className="relative flex h-full w-full flex-col px-1 py-0 sm:px-4">
          <Header
            channel={channel}
            editable={editable}
            creator={creator ?? undefined}
          />
          {/* Messages View --------------------------------------------------------------------------------------- */}
          <main className="flex flex-1 flex-col gap-2">
            <MessagesContainer channelId={channel.id} />
          </main>
          {/* Chat Form    --------------------------------------------------------------------------------------- */}
          <section className="absolute bottom-0 left-0 w-full p-2">
            <ChatForm channelId={channelId!} />
          </section>
        </section>
      ) : (
        <BlankChannel />
      )}
    </section>
  );
};

export default ChatPage;
