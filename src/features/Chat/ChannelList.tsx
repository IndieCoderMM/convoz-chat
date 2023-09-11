import { Link, useLocation } from "react-router-dom";

type Props = {
  heading: string;
  channels: {
    id: string;
    name: string;
  }[];
};

const ChannelList = ({ heading, channels }: Props) => {
  const { pathname } = useLocation();
  const href = (id: string) => `/chat/channels/${id}`;
  return (
    <section className="p-4">
      <h2 className="text-xl font-medium capitalize">{heading}</h2>
      <ul className="flex flex-col py-2">
        {channels.map(({ id, name }) => (
          <li
            key={id}
            className={`cursor-pointer rounded transition-all hover:bg-gray-400/10 ${
              pathname === href(id) && "bg-gray-400/10"
            }`}
          >
            <Link to={href(id)} className="block p-2">
              #{name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChannelList;
