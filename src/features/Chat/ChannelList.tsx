import { HiHashtag, HiLockClosed } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

type Props = {
  heading: string;
  channels: {
    id: string;
    name: string;
    type: string;
  }[];
};

const ChannelList = ({ heading, channels }: Props) => {
  const { pathname } = useLocation();
  const href = (id: string) => `/chat/channels/${id}`;
  return (
    <section className="p-4">
      <h2 className="text-xl font-medium capitalize">{heading}</h2>
      <ul className="flex flex-col gap-0.5 py-2">
        {channels.map(({ id, name, type }) => (
          <li
            key={id}
            className={`cursor-pointer rounded transition-all hover:bg-gray-400/10 ${
              pathname === href(id) && "bg-gray-400/10"
            }`}
          >
            <Link to={href(id)} className="flex items-center gap-0.5 p-2">
              {type === "public" ? (
                <HiHashtag size={16} />
              ) : (
                <HiLockClosed size={16} />
              )}
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChannelList;
