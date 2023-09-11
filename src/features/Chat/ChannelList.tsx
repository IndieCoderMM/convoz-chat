type Props = {
  heading: string;
  channels: {
    id: string;
    name: string;
  }[];
};

const ChannelList = ({ heading, channels }: Props) => {
  return (
    <section className="p-4">
      <h2 className="text-xl font-medium capitalize">{heading}</h2>
      <ul className="flex flex-col py-2">
        {channels.map(({ id, name }) => (
          <li
            key={id}
            className="cursor-pointer rounded p-2 transition-all hover:bg-gray-400/10"
          >
            #{name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChannelList;
