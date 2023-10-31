import { useEffect, useState } from "react";

import { useAppSelector } from "../../lib/store";
import { getChannelById } from "../Channels/channelsSlice";
import ChatMessage, { ChatMessageSkeleton } from "./Message";

type Props = {
  channelId: string;
};

const MessagesView = ({ channelId }: Props) => {
  const channel = useAppSelector((state) => getChannelById(state, channelId));
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!channel) {
    return (
      <div className="px-2 py-4">
        <p className="text-gray-400">Channel not found</p>
      </div>
    );
  }

  const { messages } = channel;

  if (messages.length === 0) {
    return (
      <div className="px-2 py-4">
        <p className="text-gray-400">No messages yet</p>
      </div>
    );
  }

  if (showSkeleton) {
    return (
      <div className="space-y-4 px-2 py-4">
        {messages.map((message) => (
          <ChatMessageSkeleton key={message.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 px-2 py-4">
      {messages?.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </div>
  );
};

export default MessagesView;
