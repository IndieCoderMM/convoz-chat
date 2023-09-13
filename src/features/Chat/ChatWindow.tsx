import { useParams } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  mapDocumentDataToChannel,
  queryChannelsByUserId,
} from "../../lib/actions";
import { auth } from "../../lib/firebase";
import { ChannelInterface } from "../../common.types";
import ChatForm from "./ChatForm";
import MessagesView from "./MessagesView";

const ChatWindow = () => {
  if (!auth.currentUser) return null;

  const { channelId } = useParams();
  const [docArray, loading, error] = useCollectionData(
    queryChannelsByUserId(auth.currentUser!.uid),
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const channel: ChannelInterface | undefined = docArray!
    .map(mapDocumentDataToChannel)
    .find((ch) => ch.id === channelId);

  if (!channel) {
    return <p>Channel not found</p>;
  }

  return (
    <section className="relative flex h-full w-full flex-col">
      <header className="sticky left-0 top-0 flex w-full flex-col gap-2 border-b p-2 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-700 text-2xl">
          <span>#</span>
        </div>
        <h2 className="text-3xl font-bold">
          Welcome to #{channel?.name.toLowerCase()}
        </h2>
        <p>{channel?.description}</p>
      </header>
      <main className="flex flex-1 flex-col gap-2 p-4">
        <MessagesView channelId={channel.id} />
      </main>
      <section className="absolute bottom-0 left-0 w-full p-2">
        <ChatForm channelId={channelId!} userId={auth.currentUser.uid} />
      </section>
    </section>
  );
};

export default ChatWindow;
