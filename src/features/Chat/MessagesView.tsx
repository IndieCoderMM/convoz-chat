import { useAppSelector } from '../../lib/store';
import { getChannelById } from '../Channels/channelsSlice';
import ChatMessage from './ChatMessage';
import ChatMessageSkeleton from './ChatMessageSkeleton';

type Props = {
  channelId: string;
};

const MessagesView = ({ channelId }: Props) => {
  const channel = useAppSelector((state) => getChannelById(state, channelId));

  if (!channel) {
    return (
      <div className="space-y-4 px-2 py-4">
        {Array.from({ length: 3 }, (_, i) => (
          <ChatMessageSkeleton key={i} />
        ))}
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

  return (
    <div className="space-y-4 px-2 py-4">
      {messages?.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </div>
  );
};

export default MessagesView;
