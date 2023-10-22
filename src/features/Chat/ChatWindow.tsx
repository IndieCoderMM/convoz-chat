import { useParams } from "react-router-dom";
import { FaGithub, FaSignOutAlt } from "react-icons/fa";
import ChatForm from "./ChatForm";
import MessagesView from "./MessagesView";
import { useAppSelector } from "../../lib/hooks";
import { selectChannels } from "../Channels/channelsSlice";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  mapDocumentDataToChannel,
  queryStaticChannels,
} from "../../lib/firestore-utils";
import { ChannelInterface } from "../../common.types";

const ChatWindow = () => {
  const { channelId } = useParams();

  const channels = useAppSelector(selectChannels);
  const [docArray] = useCollectionData(queryStaticChannels());

  const welcomeChannels = docArray?.map(mapDocumentDataToChannel) || [];

  const channel: ChannelInterface | undefined = [
    ...welcomeChannels,
    ...channels,
  ]?.find((ch) => ch.id === channelId);

  if (!channel) {
    return (
      <section className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Channel not found!</h1>
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
          <div>
            <span className="font-bold">{channel.members.length}</span>
            &nbsp;members
          </div>
          <div className="flex w-full items-center justify-end">
            <button className="group relative rounded-md p-2 text-sm text-white transition hover:bg-dark-300">
              <span className="absolute left-1/2 top-full -translate-x-1/2 translate-y-2 rounded-md bg-dark-500 p-1 px-1 text-xs opacity-0 transition-all group-hover:opacity-100">
                Leave&nbsp;Channel
              </span>
              <FaSignOutAlt size={20} />
            </button>
            <div className="mx-2 w-[1px] self-stretch bg-white/50" />
            <a
              href="https://github.com/IndieCoderMM/convoz-chat"
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-md p-2 text-sm text-white transition hover:bg-dark-300"
            >
              <span className="absolute left-1/2 top-full -translate-x-1/2 translate-y-2 rounded-md bg-dark-500 p-1 px-1 text-xs opacity-0 transition-all group-hover:opacity-100">
                View&nbsp;Code
              </span>
              <FaGithub size={20} />
            </a>
          </div>
        </nav>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-dark-700 text-4xl">
          <span>#</span>
        </div>
        <h2 className="text-3xl font-bold">
          Welcome to #{channel.name.toLowerCase()}!
        </h2>
        <p>{channel?.description}</p>
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
