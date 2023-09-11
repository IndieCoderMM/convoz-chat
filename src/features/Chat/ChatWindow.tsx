import ChatMessage from "./ChatMessage";

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

type ChatWindowProps = {
  channel: {
    id: string;
    name: string;
    description: string;
    members: string[];
  };
};

const ChatWindow = ({ channel }: ChatWindowProps) => {
  return (
    <section className="relative flex h-full w-full flex-col">
      <header className="sticky left-0 top-0 flex w-full flex-col gap-2 border-b p-2 shadow-sm">
        <div className="bg-dark-700 flex h-10 w-10 items-center justify-center rounded-full text-2xl">
          <span>#</span>
        </div>
        <h2 className="text-3xl font-bold">Welcome to #{channel.name}</h2>
        <p>{channel.description}</p>
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
            className="bg-dark-500 w-full rounded-md px-8 py-2"
            placeholder="Type a message"
          />
          <button className="min-w-[150px] rounded-md bg-primary p-2 text-black">
            Send
          </button>
        </form>
      </section>
    </section>
  );
};

export default ChatWindow;
