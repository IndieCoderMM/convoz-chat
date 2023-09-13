import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  mapDocumentDataToMessage,
  queryMessagesByChannelId,
} from "../../lib/actions";
import { MessageInterface } from "../../common.types";
import ChatMessage from "./ChatMessage";

type Props = {
  channelId: string;
};

const MessagesView = ({ channelId }: Props) => {
  const [docArray, loading, error] =
    useCollectionData(queryMessagesByChannelId(channelId)) || [];

  if (loading) {
    return <p>Loading...</p>;
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
