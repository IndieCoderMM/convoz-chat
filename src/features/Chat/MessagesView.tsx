import { useCollectionData } from 'react-firebase-hooks/firestore';

import { MessageInterface } from '../../common.types';
import { mapDocumentDataToMessage, queryMessagesByChannelId } from '../../lib/firestore-utils';
import ChatMessage from './ChatMessage';
import ChatMessageSkeleton from './ChatMessageSkeleton';

type Props = {
  channelId: string;
};

const MessagesView = ({ channelId }: Props) => {
  const [docArray, loading, error] =
    useCollectionData(queryMessagesByChannelId(channelId)) || [];

  if (loading) {
    return (
      <div className="space-y-4 px-2 py-4">
        {Array.from({ length: 3 }, (_, i) => (
          <ChatMessageSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const messages: MessageInterface[] =
    docArray!.map(mapDocumentDataToMessage) || [];

  return (
    <div className="space-y-4 px-2 py-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </div>
  );
};

export default MessagesView;
