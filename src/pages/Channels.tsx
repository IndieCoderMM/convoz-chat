import { FaPlus } from "react-icons/fa";

const SampleChannels = [
  {
    id: 1,
    name: "general",
    description: "This is the general channel",
  },
  {
    id: 2,
    name: "random",
    description: "This is the random channel",
  },
  {
    id: 3,
    name: "webdev",
    description: "This is the webdev channel",
  },
];

const Channels = () => {
  return (
    <section className="space-y-8 px-16 py-8">
      <h1 className="text-xl font-bold">Channels</h1>
      <p>
        Channels are where your members communicate. They&apos;re best when
        organized around a topic — #webdev, for example.
      </p>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex min-h-[200px] flex-col items-center justify-center rounded-md bg-gray-500/70 text-white md:col-span-8 lg:col-span-4">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 p-2"
          >
            <FaPlus className="h-6 w-6" />
          </button>
          <span>Create a channel</span>
        </div>
        {SampleChannels.map(({ id, name, description }) => (
          <div
            key={id}
            className="col-span-12 flex min-h-[200px] items-center justify-center rounded-md bg-gray-700/70 text-white md:col-span-8 lg:col-span-4"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 p-1"></div>
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Channels;
