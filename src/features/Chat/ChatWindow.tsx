import { useParams } from "react-router-dom";
import ChatForm from "./ChatForm";
import MessagesView from "./MessagesView";
import { useAppSelector } from "../../lib/hooks";
import { selectChannels } from "../Channels/channelsSlice";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  mapDocumentDataToChannel,
  queryWelcomeChannels,
} from "../../lib/utils";
import { ChannelInterface } from "../../common.types";

const ChatWindow = () => {
  const { channelId } = useParams();

  const channels = useAppSelector(selectChannels);
  const [docArray] = useCollectionData(queryWelcomeChannels());

  const welcomeChannels = docArray?.map(mapDocumentDataToChannel) || [];

  const channel: ChannelInterface | undefined = [
    ...welcomeChannels,
    ...channels,
  ]?.find((ch) => ch.id === channelId);

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
          Welcome to #{channel.name.toLowerCase()}
        </h2>
        <p>{channel?.description}</p>
      </header>
      <main className="flex flex-1 flex-col gap-2 p-4">
        <MessagesView channelId={channel.id} />
      </main>
      <section className="absolute bottom-0 left-0 w-full p-2">
        <ChatForm channelId={channelId!} />
      </section>
    </section>
  );
};

export default ChatWindow;
