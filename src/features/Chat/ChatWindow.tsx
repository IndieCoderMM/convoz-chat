import { useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { queryChannelsByUserId } from "../../lib/actions";
import { auth } from "../../lib/firebase";
import { StaticChannels } from "../../data/content";

const SampleMessages = [
  {
    id: 1,
    user: {
      name: "John Doe",
      image: "/hacker.png",
    },
    message: "Hello world!",
    timestamp: "12:00",
  },
  {
    id: 2,
    user: {
      name: "Jane Doe",
      image: "/hacker.png",
    },
    message:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit sint explicabo illo dolorum ipsum quis eveniet tenetur ipsa, eos quisquam.",
    timestamp: "12:00",
  },
];

const ChatWindow = () => {
  if (!auth.currentUser) return null;

  const { channelId } = useParams();
  const [value, loading, error] = useCollectionData(
    queryChannelsByUserId(auth.currentUser!.uid),
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const onlineChannels = value?.map((item) => item) || [];

  const allChannels = [...StaticChannels, ...onlineChannels];
  const channel = allChannels.find(({ id }) => id === channelId);

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
        {SampleMessages.map(({ id, ...props }) => (
          <ChatMessage key={id} {...props} />
        ))}
      </main>
      <section className="absolute bottom-0 left-0 w-full p-2">
        <form className="flex items-center justify-between gap-2 p-2">
          <input
            type="text"
            className="w-full rounded-md bg-dark-500 px-8 py-2"
            placeholder="Type a message"
          />
          <button className="min-w-[150px] rounded-md bg-primary p-2 font-medium text-white">
            Send
          </button>
        </form>
      </section>
    </section>
  );
};

export default ChatWindow;
